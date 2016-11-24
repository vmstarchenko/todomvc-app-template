import {View} from 'FKM';
import {TodoListModel} from 'models';
import {TodoListView} from 'views';

class MainListView extends View {
  constructor(rootElement) {
    super(rootElement);

    this.subviews.todoLists = [];

    this.dElements = {
      buttonAdd: '.add',
      buttonRemove: '.remove',
      listWrapper: '.list-wrapper'
    };

    this.dEvents = [
      {event: 'click', element: 'buttonAdd', handler: this.createNewTodoList},
      {event: 'click', element: 'buttonRemove', handler: this.popTodoList}
    ];

    this.init();
    this.createSubviews();
  }

  createNewTodoList(event) {
    let todoListObject = new TodoListModel({});
    todoListObject.commit();

    this.addTodoList(todoListObject);
  }

  addTodoList(todoListObject) {
    let todoListRootElement = document.createElement('section');

    let todoListView =
          new TodoListView(todoListRootElement, todoListObject.id);

    this.subviews.todoLists.push(todoListView);
    this.ui.listWrapper.appendChild(todoListRootElement);
  }

  createSubviews() {
    let todoListObjects = TodoListModel.getAll(), todoListView;

    for (let i = 0, size = todoListObjects.length; i < size; ++i) {
      this.addTodoList(todoListObjects[i]);
    }
  }

  popTodoList() {
    if (this.ui.listWrapper.lastChild) {
      this.ui.listWrapper.lastChild.remove(); // TODO: rm from storage
    }
  }
}

export {MainListView};
