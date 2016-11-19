import {EventEmitter, wrapModelByEmitter} from './EventEmitter.js';

let cacheS = Symbol('Cache'),
    lastUsedIdS = Symbol('Last used id for generating unique ids'),
    fieldsS = Symbol('Fields'),
    verboseNameS = Symbol('Model verbose class name');

/**
 *   cache class
 */
class ModelCache extends Object {
  constructor() { super(); }
}

function Model(fields) {
  // TODO: add check if call without new
  this.setAll(fields);
  Object.defineProperty(this, 'id', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: this.constructor.generateId()
  });
}

// inheritance
// Model.prototype = Object.create(EventEmitter.prototype);
// Object.assign(Model, Object.create(EventEmitter.prototype));
// console.dir(Model); //, Object.create(EventEmitter.prototype));

Model[cacheS] = new ModelCache();

Model._fields = function _fields() {  // TODO: to getter
  throw Error('Abstract property: redefine property in children models');
};

Object.defineProperty(
  Model.prototype, '_storage',
  {get: function _storage() { return window.localStorage; }});

/**
 *   Register model - prepare model for using. Create getters/setter for
 * attrubutes. Wrap model class to emitter.
 *
 * @param{String} verboseName - printable name for model. It would be used as
 *   model name in storage
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

  wrapModelByEmitter(model);

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


/**
 *   Set all attributes. Call change event one time.
 *
 * @param{Object} fields - dictionary of fields in format {key: value}
 */
Model.prototype.setAll = function(fields) {
  let _fields = this.constructor._fields;

  // TODO: call change event
  for (let field in fields) {
    this[fieldsS][field] = _fields[field](fields[field]);  // cast values
  }
};


/**
 *   Save changes to storage.
 *
 * @returns{Model} return object so calls could be chained
 */
Model.prototype.commit = function() {
  // TODO: check cache
  let cls = this.constructor;
  let storageId = `#${cls.name}#${this.id}`;
  let obj = Object.assign({}, this[fieldsS]);

  this._storage[storageId] = JSON.stringify(obj);

  return this;
};


/**
 *   Generate unique for this model identifier.
 *
 * @returns{Number}
 */
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


/**
 *   Get object from storage or undefined if object with this id doesn't exists.
 *
 * @returns{Number|undefined}
 */
Model.getById = function(id) {
  // TODO: search in cache
  let storageId = `#${this[verboseNameS]}#${id}`;
  let storage = this.prototype._storage;

  let obj = JSON.parse(storage[storageId]);
  if (obj === undefined) return undefined;

  return new this(obj);
};

Model.prototype.toString = function() {
  return JSON.stringify(JSON.stringify(this[fieldsS]));
};

export {Model};
