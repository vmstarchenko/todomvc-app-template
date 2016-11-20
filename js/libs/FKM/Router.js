// TODO: work with full location

import {Url} from './Url';
import {Controller} from './Controller';

let configS = Symbol('Config');
/**
 *   Raise error if urlConfig has not valid format.
 *   Config format:
 * [{
 *    url: Url|Object,    // Unique value. Required argument
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
 * @param{Url[]} config - url config valid objects
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
  if (!(url instanceof Object) ||  // check if config is valid
      !(preloader instanceof Function) || !(controller instanceof Controller)) {
    throw new Error('not valid router config');
  }
  if (!(url instanceof Url)) {
    url = new Url(url);
  }

  this[configS].push({url: url, preloader: preloader, controller: controller});

  return this;
};


/**
 *   Add all urls from config list to router config
 */
Router.prototype.addUrls = function(config) {
  for (let i = 0, size = config.length; i < size; ++i) {
    this.addUrl(config[i]);
  }
};


Router.prototype.onpopstate = function(event) {
  console.log('start pop state');
  this.navigate({
    pathname: window.location.pathname,
    hash: window.location.hash,
    search: window.location.search
  });
};


// object with url location attributes as keys
Router.prototype.navigate = function(url) {
  let config = this[configS];

  for (let i = 0, size = config.length; i < size; ++i) {
    if (config[i].url.equal(url)) {
      let code = config[i].preloader(url);
      if (code === true) config[i].controller.activate(url);
      return;
    }
  }

};

function defaultPreloader() {
  return true;
}

export {Router};
