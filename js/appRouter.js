import {Router, Url, Controller} from 'FKM';

let pathnamePrefix = '/home/vladimir/xProgramming/hse-js/todomvc-app-template';

class todoController extends Controller {
  constructor() {
    super();
    console.log('navigated');
  }
}

let router = new Router([
  {
    url: new Url({pathname: pathnamePrefix + '/index.html'}),
    controller: new todoController()
  },
  {
    url: new Url({pathname: pathnamePrefix + '/index.html', hash: '#/active'}),
    controller: new todoController()
  }
]);

export {router, pathnamePrefix};
