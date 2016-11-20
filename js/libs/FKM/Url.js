let searchS = Symbol('search');

/**
 * Url location attributes:
 *   hash:                   "#test"
 *   host (host and port):   "www.google.com:80"
 *   href (full url):        "http://www.google.com:80/search?q=javascript#test"
 *   hostname:               "www.google.com"
 *   pathname:               "/search"
 *   port:                   "80"
 *   protocol (protocol):    "http:"
 *   search (key arguments): "?q=javascript"
 *
 */
class Url {
  /**
   * @param{String} protocol
   * @param{String} hostname
   * @param{String} port
   * @param{RegExp|String} pathname
   * @param{String|Object} search
   * @param{String} hash
   */
  constructor(
      {protocol = "http:", hostname = "example.com", port = "", pathname = "/",
       search = "", hash = ""}) {
    this.protocol = protocol;
    this.hostname = hostname;
    this.port = port;
    this.pathname = new RegExp(pathname);  // TODO: pathname is required
    this.searchObject = parseSearch(search);
    this.hash = hash;
  }

  get href() {
    return `${this.protocol}//${this.host}${this.pathname}${this.searchObject}${this.hash}`;
  }
  get host() {
    return this.port ? this.hostname + ':' + this.port : this.hostname;
  }

  get search() {
    let args = [];
    for (let key of this[searchS]) {
      args.push(key + '=' + this[searchS][key]);
    }
    return '?' + args.join('&');
  }
  /**
   *   Check if object is equal with this url.
   * Check attributes passed in object.
   *
   * @param{Object} object - keys are valid url location attributes.
   */
  equal(object) {
    object = Object.assign({}, object);

    let pathname = object.pathname;  // TODO: pathname is required here? Yes
    if (pathname) {
      let match = pathname.match(this.pathname);
      if (match === null || match[0].length !== pathname.length)
        return false;  // TODO: do smth with matched groups?
      delete object.pathname;
    }

    if (object.search !== undefined) {  // search
      let search = parseSearch(object.search);
      for (let key in search) {
        if (search[key] !== this.searchObject[key]) return false;
      }
      delete object.search;
    }

    for (let key in object) {  // other
      if (object[key] !== this[key]) return false;
    }

    return true;
  }
}

/**
 * @returns{Object}
 */
function parseSearch(search) {
  let parsed = search;
  if (search instanceof String) {
    if (search && search[0] == "?") search = search.slice(1);
    parsed = {};
    search = search.split('&');
    let attr;
    for (let i = 0, size = search.length; i < size; ++i) {
      attr = search[i].split('=');
      if (attr.length !== 2)
        throw new Error('ValueError: not valid url attribute');
      parsed[attr[0]] = attr[1];
    }
  }
  return parsed;
}

export {Url};
