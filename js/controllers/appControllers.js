import {TodoListModel} from 'models';
import {TodoListView} from 'views';
import {Controller} from 'FKM';


class TodoController extends Controller {
  activate() {
    this.todoListViews = [];
    let todoListElements = window.document.querySelectorAll('.todolist'),
        todoListView;

    for (let i = 0, size = todoListElements.length; i < size; ++i) {
      todoListView = new TodoListView(todoListElements[i]);
      this.todoListViews.push(todoListView);
      todoListView.render().findElements().bindEvents();
    }
  }
}


export {TodoController};
