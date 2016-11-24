import {TodoListView} from 'views';
import {MainListView} from 'views';
import {Controller} from 'FKM';


class TodoController extends Controller {
  activate() {
    let mainListElement = window.document.querySelector('.mainlist');
    this.mainListView = new MainListView(mainListElement);
  }
}


export {TodoController};
