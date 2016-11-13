import { guestTemplatesStorage } from "./libs/TemplatesStorage.js";
import { LocalStorage } from "./libs/LocalStorage.js";

(function(window) {
  'use strict';

  // Write npm run watch-js to start coding

  console.log(guestTemplatesStorage.render('test', {username: 1}));
  let storage = new LocalStorage("e");
  console.log(storage);

})(window);
