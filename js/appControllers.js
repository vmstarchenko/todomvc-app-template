import {TodoListModel} from 'TodoListModel';
import {TodoListView} from 'TodoListView';
import {Controller} from 'FKM';


class TodoController extends Controller {
  constructor() {
    super();

    this.todoListViews = [];
    let todoListElements = window.document.querySelectorAll('.todolist');
    for (let i = 0, size = todoListElements.length; i < size; ++i) {
      this.todoListViews.push(new TodoListView(todoListElements[i]));
    }

  }
}


export {TodoController};
