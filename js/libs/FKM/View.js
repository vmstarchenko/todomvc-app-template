import {EventEmitter} from './EventEmitter';

function View(rootElement, id) {
  (View.__proto__ || Object.getPrototypeOf(View)).call(this);
  this.rootElement = rootElement;
  if (id !== undefined)
    this.id = id;
  else if (rootElement.id !== '')
    this.id = rootElement.id;

  this.ui = {};  // list of elements for working
  this.subviews = {};
}


// inheritance
View.prototype = Object.create(EventEmitter.prototype);
if (Object.setPrototypeOf)
  Object.setPrototypeOf(View, EventEmitter);
else
  View.__proto__ = EventEmitter;

View.constructor = View;


// default attributes
View.prototype.dRootAttributes = {};
View.prototype.dElements = {};
View.prototype.dEvents = {};


View.prototype.init = function() {
  return this.setRootAttributes().findElements().bindEvents();
};

// set attributes for root element
View.prototype.setRootAttributes = function() {
  if (this.dRootAttributes.id)  // set id
    this.rootElement.id = this.dRootAttributes.id;

  if (this.dRootAttributes.class) {  // set class
    let class_ = this.dRootAttributes.class.split(' ');
    for (let i = 0, size = class_.length; i < size; ++i) {
      if (class_[i]) this.rootElement.classList.add(class_[i]);
    }
  }

  // TODO: set other
  return this;
};

/**
 * Config format:
 * [{
 *   name: selector
 * }, ...]
 *
 * @param{Element} rootElement
 * @param{Object[]} config
 */
View.prototype.findElements = function() {
  let config = this.dElements, rootElement = this.rootElement;
  for (let field in config) {
    this.ui[field] = rootElement.querySelector(config[field]);
  }
  return this;
};

/**
 * Config format:
 * [{
 *   event: String,             // Required
 *   element: Element,          // Required
 *   handler: Function(event)   // Required
 *   context: Object
 * }, ...]*
 *
 * @param{Object[]} config
 */
View.prototype.bindEvents = function() {
  let config = this.dEvents;

  let event, element, handler, context;
  for (let i = 0, size = config.length; i < size; ++i) {
    ({event, element, handler, context = this} = config[i]);
    element = this.ui[element];

    if (!(typeof event === 'string' || event instanceof String) ||
        !(element instanceof Element) || !(handler instanceof Function)) {
      throw new Error(
          `ValueError: cant bind event, not valid config (got ${config[i]})`);
    }

    element.addEventListener(event, handler.bind(context));
  }
};

View.prototype.render = function() {
  let html = this._render();
  this.rootElement.innerHTML = html;
  return this;
};


export {View};
