import { guestTemplatesStorage } from "./libs/TemplatesStorage.js";

(function(window) {
  'use strict';

  // Write npm run watch-js to start coding

  console.log(guestTemplatesStorage.render('test', {a: 1}));

})(window);
