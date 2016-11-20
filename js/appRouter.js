import {Router, Url, Controller} from 'FKM';

let pathnamePrefix = '/home/vladimir/xProgramming/hse-js/todomvc-app-template';

class todoController extends Controller {
  constructor() {
    super();
  }
}

let index = new Url({pathname: pathnamePrefix + '/index.html'});
let indexActive = Url.extend(index, {hash: '#/active'});
let indexCompleted = Url.extend(index, {hash: '#/completed'});

let router = new Router([
  {
    url: index,
    controller: new todoController()
  },
  {
    url: indexActive,
    controller: new todoController()
  },
  {
    url: indexCompleted,
    controller: new todoController()
  }
]);

export {router, pathnamePrefix};
