import {Router, Url, Controller} from 'FKM';
import {TodoController} from 'controllers/appControllers';

let pathnamePrefix = '/home/vladimir/xProgramming/hse-js/todomvc-app-template';

let index = new Url({pathname: pathnamePrefix + '/index.html'});
// let indexActive = Url.extend(index, {hash: '#/active'});
// let indexCompleted = Url.extend(index, {hash: '#/completed'});

let router = new Router([
  {
    url: index,
    controller: new TodoController()
  },
  // {
  //   url: indexActive,
  //   controller: new TodoController()
  // },
  // {
  //   url: indexCompleted,
  //   controller: new TodoController()
  // }
]);

export {router, pathnamePrefix};
