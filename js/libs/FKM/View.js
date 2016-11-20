function View() {
  this.ui = {};  // list of elements for working
}

/**
 * Config format:
 * [{
 *   name: selector
 * }]
 *
 * @param{Element} rootElement
 * @param{Object[]} config
 */
View.prototype.findElements = function(rootElement, config) {
  for (let field in config) {
    this.ui[field] = rootElement.querySelector(config[field]);
  }
};

export {View};
