function View(rootElement) {
  this.rootElement = rootElement;
}

View.prototype.ui = {}; // list of elements for working
View.prototype.dElements = {};
View.prototype.dEvents = {};


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
  console.log(111);
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
    console.log(element);
    if (!(typeof event === 'string' || event instanceof String) ||
        !(element instanceof Element) || !(handler instanceof Function)) {
      throw new Error(
          `ValueError: cant bind event, not valid config (got ${config[i]})`);
    }

    element.addEventListener(event, handler.bind(context));
  }
};

export {View};
