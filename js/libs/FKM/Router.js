// TODO: work with full location


let configS = Symbol('Config');
/**
 *   Raise error if urlConfig has not valid format.
 *   Config format:
 * [{
 *    url: Regexp|String,    // Unique value. Required argument
 *    preloader: Function,   // Check if need to load and render main
 *                           //   template for page
 *    controller: Function // Bind views and models. Required argument.
 * }, ...]
 *
 * Listen global historyAPI events:
 *   "popstate" - call Router.onpopstate
 *
 * If preloader return true call controller function
 *
 * @param{Object[]} config - url config valid objects
 * @param{Router[]} source - parent routers define base config
 */
function Router(config = [], sources = []) {
  // TODO: add check if call constructor with new
  // TODO: add urls from sources
  if (sources) {
    sources.forEach(function(element) {  // check if sources are Routers
      if (!(element instanceof Router))
        throw new Error('ValueError: source is not Router instance');
    });
  }

  this[configS] = [];
  if (config instanceof Array) {
    this.addUrls(config);
  } else {
    throw new Error('ValueError: config is not an Array');
  }

  // bind event listeners
  window.addEventListener('popstate', this.onpopstate.bind(this));
}


/**
 *   Add one url to router config
 */
Router.prototype.addUrl = function(
  {url, preloader = defaultPreloader, controller}) {
  if (url === undefined ||  // check if config is valid
      !(preloader instanceof Function) || !(controller instanceof Function)) {
    throw new Error('not valid router config');
  }
  this[configS].push(
    {url: RegExp(url), preloader: preloader, controller: controller});
  return this;
};


/**
 *   Add all urls from config list to router config
 */
Router.prototype.addUrls = function(config) {
  config.forEach(function(element) {  // check if config is valid
    if (element.preloader === undefined) element.preloader = defaultPreloader;
    if (element.url === undefined || !(element.preloader instanceof Function) ||
        !(element.controller instanceof Function)) {
      throw new Error('ValueError: not valid router config');
    }
  });
  for (let i = 0, size = config.length; i < size; ++i) {
  }

  for (let i = 0, size = config.length; i < size; ++i) {
    config[i].url = RegExp(config[i].url);
    this[configS].push(config[i]);
  }
};


Router.prototype.onpopstate = function(event) {
  let location = window.location;
  let pathname = location.pathname,
      search = location.search,  // TODO: work with search
      hash = location.hash;      // TODO: work with hash
  let config = this[configS];
  for (let i = 0, size = config.length; i < size; ++i) {
    if (pathname.search(config[i].url) !== -1) {
      let code = config[i].preloader(pathname, search, hash);
      if (code === true) config[i].controller(pathname, search, hash);
      return;
    }
  }
};


function defaultPreloader() {
  return true;
}

export {Router};
