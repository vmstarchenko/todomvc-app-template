import {EventEmitter} from './EventEmitter.js';
/**
 * cache class
 */
class ModelCache extends Object {
  constructor() { super(); }
}

let cacheS = Symbol('Cache'),
    lastUsedIdS = Symbol('Last used id for generating unique ids'),
    fieldsS = Symbol('Fields'),
    verboseNameS = Symbol('Model verbose class name'),
    idS = Symbol('Object identifier');

class Model extends EventEmitter {
  static get _fields() {
    throw Error('Abstract property: redefine property in children models');
  }

  get _storage() { return window.localStorage; }

  constructor(fields) {
    super();
    this.setAll(fields);
    Object.defineProperty(this, idS, {
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

    // TODO: check that model is instance of Model
    if (typeof verboseName !== 'string')
      throw new Error(
          errorMsg +
          `, verboseName not valid (got ${typeof verboseName} expected string)`);


    model.prototype[fieldsS] = {};
    model.constructor[lastUsedIdS] = 0;
    model.generateId();
    model[verboseNameS] = verboseName;

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
    // TODO: check cache
    let cls = this.constructor;
    let storageId = `#${cls.name}#${this[idS]}`;
    let obj = Object.assign({}, this[fieldsS]);

    this._storage[storageId] = JSON.stringify(obj);

    return this;
  }

  static generateId() {
    let cls = this.constructor;
    let idPattern = `#${this[verboseNameS]}#`;
    let storage = this.prototype._storage;
    let id = cls[lastUsedIdS];

    for (; storage.hasOwnProperty(idPattern + id); ++id) {
    }
    cls[lastUsedIdS] = id;

    return id;
  }

  static getById(id) {
    // TODO: search in cache
    let storageId = `#${this[verboseNameS]}#${id}`;
    let storage = this.prototype._storage;

    let obj = JSON.parse(storage[storageId]);
    if (obj === undefined) return undefined;

    return new this(obj);
  }
}

Model[cacheS] = new ModelCache();

export {Model};
