import {EventEmitter} from './EventEmitter.js';

let cacheS = Symbol('Cache'),
    lastUsedIdS = Symbol('Last used id for generating unique ids'),
    fieldsS = Symbol('Fields'),
    verboseNameS = Symbol('Model verbose class name'),
    idS = Symbol('Object identifier');

/**
 * cache class
 */
class ModelCache extends Object {
  constructor() { super(); }
}

function Model(fields) {
  // TODO: add check if call without new
  this.setAll(fields);
  Object.defineProperty(this, idS, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: this.constructor.generateId()
  });
}

Model.prototype = Object.create(EventEmitter.prototype);

Model._fields = function _fields() {  // TODO: to getter
  throw Error('Abstract property: redefine property in children models');
};

Object.defineProperty(
    Model.prototype, '_storage',
    {
      get: function _storage() {  // TODO: to getter, to static
        return window.localStorage;
      }
    });

/**
 * @param{String} verboseName - printable name for model
 */
Model.register = function(model, verboseName) {
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
    Object.defineProperty(model.prototype, field, {
      get: function() { return this[fieldsS][field]; },
      set: function(value) {
        // TODO: generate set event
        this[fieldsS][field] = value;
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
};


Model.prototype.setAll = function(fields) {
  let _fields = this.constructor._fields;

  for (let field in fields) {
    this[fieldsS][field] = _fields[field](fields[field]);  // cast values
  }
};

Model.prototype.commit = function() {
  // TODO: check cache
  let cls = this.constructor;
  let storageId = `#${cls.name}#${this[idS]}`;
  let obj = Object.assign({}, this[fieldsS]);

  this._storage[storageId] = JSON.stringify(obj);

  return this;
};

Model.generateId = function() {
  let cls = this.constructor;
  let idPattern = `#${this[verboseNameS]}#`;
  let storage = this.prototype._storage;
  let id = cls[lastUsedIdS];

  for (; storage.hasOwnProperty(idPattern + id); ++id) {
  }
  cls[lastUsedIdS] = id;

  return id;
};

Model.getById = function(id) {
  // TODO: search in cache
  let storageId = `#${this[verboseNameS]}#${id}`;
  let storage = this.prototype._storage;

  console.log(storageId, storage);
  let obj = JSON.parse(storage[storageId]);
  if (obj === undefined) return undefined;

  return new this(obj);
};

Model.prototype.toString = function() {
  return JSON.stringify(JSON.stringify(this[fieldsS]));
};

Model[cacheS] = new ModelCache();

export {Model};
