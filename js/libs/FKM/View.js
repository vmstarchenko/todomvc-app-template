function View() {
  this.ui = {};  // list of elements for working
}

/**
 * Config format:
 * [{
 *   name: selector
 * }, ...]
 *
 * @param{Element} rootElement
 * @param{Object[]} config
 */
View.prototype.findElements = function(rootElement, config) {
  for (let field in config) {
    this.ui[field] = rootElement.querySelector(config[field]);
  }
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
View.prototype.bindEvents = function(config) {
  let event, element, handler, context;
  for (let i = 0, size = config.length; i < size; ++i) {
    ({event, element, handler, context=this} = config[i]);
    if (!(typeof event === 'string' || event instanceof String) ||
        !(element instanceof Element) || !(handler instanceof Function)) {
      throw new Error(
          `ValueError: cant bind event, not valid config (got ${config[i]})`);
    }
    element.addEventListener(event, handler.bind(context));
  }
};

export {View};
