import { LocalStorage } from "libs/LocalStorage";
import { EventEmitter } from "libs/EventEmitter";
import { TodoList } from "views/TodoList";

import { Model } from "FKM/Model.js";
import { M } from './.tmp/a.js';
// import { b } from './.tmp/b.js';

(function(window) {
  'use strict';

  let a = new M({n: 5, s: 3});
  console.log('fields', typeof a);
  console.log(a);
  let b = M.getById(0);
  console.log(b.emit, M.emit);

  // console.log('check path resolver');
  // let todoListView = new TodoList();
  // console.log(todoListView);

  // let emitter = new EventEmitter();
  // let listener1 = () => {console.log('1');};
  // let listener2 = () => {
  //   console.log('2');
  //   emitter.removeAllListeners('event');
  // };

  // emitter.on('event', listener1);
  // emitter.on('event', listener2);
  // emitter.emit('event');
  // console.log('stop');

  // emitter.emit('event');

  // console.log(guestTemplates.render('test', {username: 1}));
  // let storage = new LocalStorage("e");
  // console.log(storage);

  // new a();
  // new b();

  console.log(';; app.js ends here');
})(window);
