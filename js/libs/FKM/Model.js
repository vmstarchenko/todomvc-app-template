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

function Model(fields, id) {
  // TODO: add check if call without new
  this[fieldsS] = {};
  this.setAll(fields);

  let model = this.constructor;
  for (let field in model._fields) {
    if (fields.hasOwnProperty(field)) continue;
    this[field] = model._fields[field]();  // default constructor for fields
  }

  Object.defineProperty(this, 'id', {
    configurable: false,
    enumerable: true,
    writable: false,
    value: id !== undefined ? Number(id) : this.constructor.generateId()
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

  model.constructor[lastUsedIdS] = 0;
  model.generateId();
  model[verboseNameS] = verboseName;

  Object.defineProperty(model.prototype, 'wrappedId', {
    get: function() { return `#${this.constructor[verboseNameS]}#${this.id}`; },
    configurable: false,
    enumerable: true,
  });

  wrapModelByEmitter(model);

  for (let field in model._fields) {
    if (typeof model._fields[field] !==
        'function')  // check if value is function
      throw new Error(
          `ValueError: can't register model "${verboseName}". ` +
          `Field "${field}" is not a constructor`);

    // TODO: create getter, setter

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

Model.prototype.delete = function(){
  delete this._storage[this.wrappedId];
};

/**
 *   Set all attributes. Call change event one time.
 *
 * @param{Object} fields - dictionary of fields in format {key: value}
 */
Model.prototype.setAll = function(fields) {
  let _fields = this.constructor._fields, fieldValue;
  // TODO: call change event
  for (let field in fields) {
    fieldValue = _fields[field];
    if (fieldValue !== undefined)
      this[fieldsS][field] = fieldValue(fields[field]);  // cast values
  }
};


/**
 *   Save changes to storage.
 *
 * @returns{Model} return object so calls could be chained
 */
Model.prototype.commit = function() {
  // TODO: check cache
  let storageId = `#${this.constructor[verboseNameS]}#${this.id}`;
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
 * @param{Number|String} id
 * @param{Boolean} wrap - if true wrap id to storage identifier
 *   format (#verboseName#id)
 *
 * @returns{Number|undefined}
 */
Model.getById = function(id, wrap = true) {
  // TODO: search in cache
  let wrappedId = id.toString();
  let storage = this.prototype._storage;

  if (wrap) {
    wrappedId = `#${this[verboseNameS]}#${id}`;
  } else {
    let prefixLength = this[verboseNameS].length + 2;
    if (wrappedId.length <= prefixLength) return undefined;
    id = parseInt(wrappedId.slice(prefixLength));
  }

  id = Number(id);

  let json = storage[wrappedId];
  if (json === undefined) return undefined;

  let obj = JSON.parse(json);
  if (obj === undefined || isNaN(id)) return undefined;

  return new this(obj, id);
};


/**
 *   Get object from storage or undefined if object with this id doesn't exists.
 *
 * @returns{Number|undefined}
 */
Model.getAll = function() {
  // TODO: search in cache
  let modelNamePrefix = `#${this[verboseNameS]}#`;
  let prefixLength = modelNamePrefix.length;
  let objects = [];
  let storage = this.prototype._storage;
  let wrappedId;

  for (let i = 0, size = storage.length; i < size; ++i) {
    wrappedId = storage.key(i);
    if (!wrappedId.startsWith(modelNamePrefix)) continue;

    let obj = JSON.parse(storage[wrappedId]);
    if (obj === undefined) continue;

    objects.push(new this(obj, parseInt(wrappedId.slice(prefixLength))));
  }

  return objects;
};

Model.prototype.toString = function() {
  return JSON.stringify(JSON.stringify(this[fieldsS]));
};

export {Model, fieldsS};
