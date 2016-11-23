/*************** TemplatesStorage ***************/

/**
 *   Store templates.
 *
 * @class TemplatesStorage
 *
 * @example
 *   let guestTemplates = new TemplatesStorage(
 *     {username: 'testuser'},
 *     {test: c => {return: `<div>Hi ${c.username}. Are you ${c.age}?</div>`}}
 *   );
 *   guestTemplates.render('test', {age: 19});
 *   // <div>Hi testuser. Are you 19?</div>
 */
class TemplatesStorage {
  /**
   * @constructs
   *
   * @param{Object}[defaultContext={}] - variables that would be added to
   * context
   *   of rendered templates.
   * @param{Object}[templates={}] - keys: templateName, value: Function renderer
   */
  constructor(templates = {}, defaultContext = {}) {
    // debugger;
    this.defaultContext = defaultContext;
    this.storage = templates;
  }

  /**
   *   Render template. Raise Error If template doesn't exists in this storage.
   * Variables from argument context redefine variables from default storage
   * context.
   *
   * @param{String} templateName
   * @param{Object} context
   */
  render(templateName, context) {
    let template = this.storage[templateName];
    if (!template)
      throw new Error(
          `Template "${templateName}" doesn't exists in this storage.`);
    context = Object.assign({}, this.defaultContext, context);
    return template(context);
  }

  get(templateName) {
    let template = this.storage[templateName];
    if (!template)
      throw new Error(
        `Template "${templateName}" doesn't exists in this storage.`);
    return template;
  }

  /**
   *   Add template to storage
   *
   * @param{String} templateName - name of template
   * @param{Function} template - function renderer. Takes context argument
   */
  addTemplate(templateName, template) { this.storage[templateName] = template; }

  /**
   *   Remove template to storage.
   *
   * @param{String} templateName - name of template
   */
  removeTemplate(templateName) { delete this.storage[templateName]; }
}

/*************** Templates ***************
 *
 * Tip: always set default value for context
 *
 *****************************************/
// let guestTemplates = new TemplatesStorage( // Test
//   {username: 'testuser'},
//   {test: c => {return `<div>Hi ${c.username}. Are you ${c.age}?</div>`;}}
// );

export {
  TemplatesStorage
  // guestTemplates
};
