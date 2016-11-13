import { LocalStorage } from "libs/LocalStorage";
import { EventEmitter } from "libs/EventEmitter";
import { TodoList } from "views/TodoList";

(function(window) {
  'use strict';

  console.log('check path resolver');
  let todoListView = new TodoList();
  console.log(todoListView);

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

})(window);
