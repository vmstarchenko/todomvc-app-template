import {EventEmitter} from './EventEmitter.js';
/**
 * cache class
 */
class ModelCache extends Object {
  constructor() { super(); }
}

let cacheS = Symbol('Cache');
let fieldsS = Symbol('Fields');
let lastUsedId = Symbol('Last used id for generating unique ids');
let id = Symbol('Object identifier');

class Model extends EventEmitter {
  static get _fields() {
    throw Error('Abstract property: redefine property in children models');
  }

  get _storage() { return window.localStorage; }

  constructor(fields) {
    super();
    this.setAll(fields);
    Object.defineProperty(this, id, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: this.constructor.generateId()
    });
  }

  /**
   * @param{String} verboseName - printable name for model
   */
  static register(model, verboseName) {
    let errorMsg = "ValueError: can't register model";

    model.prototype[fieldsS] = {};
    model.constructor[lastUsedId] = -1;
    model.generateId();

    // TODO: check that model is instance of Model
    if (typeof verboseName !== 'string')
      throw new Error(
          errorMsg +
          `, verboseName not valid (got ${typeof verboseName} expected string)`);

    for (let field in model._fields) {
      if (typeof model._fields[field] !==
          'function')  // check if value is function
        throw new Error(
            `ValueError: can't register model "${verboseName}". ` +
            `Field "${field}" is not a constructor`);

      // TODO: check if redefine attributes
      console.log(field);
      Object.defineProperty(model.prototype, field, {
        get: function() { return this[fieldsS][field]; },
        set: function(value) {
          // TODO:
          this[fieldsS][field] = value;
          return value;
        },
        enumerable: true,
        configurable: true
      });
    }
  }

  setAll(fields) {
    let _fields = this.constructor._fields;

    for (let field in fields) {
      this[fieldsS][field] = _fields[field](fields[field]);  // cast values
    }
  }

  commit() {
    // TODO: check cacheS
    // TODO: save in storage
  }

  static generateId() {
    let cls = this.constructor;
    let idPattern = `#${cls.name}#`;
    let storage = this.prototype._storage;
    let id_ = cls[lastUsedId];
    for (; storage.hasOwnProperty(idPattern + id_); ++id_) {
    }
    cls[lastUsedId] = id_ + 1;
    return id_;
  }
}

Model[cacheS] = new ModelCache();

export {Model};
