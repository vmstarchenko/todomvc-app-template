import { TemplatesStorage } from "./libs/TemplatesStorage.js";

(function(window) {
  'use strict';

  // Write npm run watch-js to start coding
  let storage = new TemplatesStorage();
  console.log(storage);
  console.log(NODE_ENV == 'development');

})(window);
