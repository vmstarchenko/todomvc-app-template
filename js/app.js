import {EventEmitter} from "libs/FKM/EventEmitter";
import {Router} from "FKM";
import {TodoListModel} from 'TodoListModel';

import {Model} from "FKM";
import {M} from './.tmp/a.js';
import {router, pathnamePrefix} from 'appRouter';

(function(window) {
  'use strict';

  router.navigate({pathname: pathnamePrefix + '/index.html'});

  // let a = function() { console.log(1); };
  // let b = function() { console.log(2); };
  // window.addEventListener('popstate', a);
  // window.document.querySelector('a[href="#/completed"]').onclick = b;

  // let a = new M({n: 5, s: 3});
  // // console.log('fields', typeof a);
  // // console.log(a);
  // let b = M.getById(0);
  // // console.log(b.emit, M.emit);

  // let r1 = new Router([{
  //   url:
  //   '/home/vladimir/xProgramming/hse-js/todomvc-app-template/index.html',
  //   controller: function() { console.log('route'); }
  // }]);

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
