class TemplatesStorage {
  /**
   * Save templates here.
   *
   * @example
   * storate = TemplatesStorage(defaultContext)
   * storage.render(templateName, context)
   */

  constructor(defaultContext={}, templates={}) {
    // debugger;
    this.context = defaultContext;
    this.storage = templates;
  }

  render(templateName, context) {
    return this.storage[templateName](context);
  }
}

export {
  TemplatesStorage
};
