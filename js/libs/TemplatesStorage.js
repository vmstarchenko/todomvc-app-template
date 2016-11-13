/*************** TemplatesStorage ***************/

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
    this.defaultContext = defaultContext;
    this.storage = templates;
  }

  render(templateName, context) {
    context = Object.assign({}, this.defaultContext, context);
    return this.storage[templateName](context);
  }

  /**
   * template - function-renderer. takes context
   */
  addTemplate(templateName, template) {
    this.storage[templateName] = template;
  }
}

/*************** Templates ***************
 *
 * Tip: always set default value for context
 *
 *****************************************/

function template_Test(c={username: undefined}) {
  let html = `\
<div>
  hello. it's a simple test. context: ${c}, ${c.username}
</div>\
`;
  return html;
}

/*************** Storages ***************/
let guestTemplatesStorage = new TemplatesStorage({
  username: 'xxx'
}, {
  test: template_Test});

export {
  guestTemplatesStorage
};
