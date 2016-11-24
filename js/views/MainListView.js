import {View} from 'FKM';
import {TodoListModel} from 'models';
import {TodoListView} from 'views';

class MainListView extends View {
  constructor(rootElement) {
    super(rootElement);

    this.subviews.todoLists = {};

    this.dElements = {
      buttonAdd: '.add',
      listWrapper: '.list-wrapper'
    };

    this.dEvents = [
      {event: 'click', element: 'buttonAdd', handler: this.createNewTodoList},
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

    let todoListView = new TodoListView(todoListRootElement, todoListObject.id);
    todoListView.on('destroy', this.removeTodoList.bind(this, todoListObject.id));

    this.subviews.todoLists[todoListObject.id] = todoListView;
    this.ui.listWrapper.appendChild(todoListRootElement);
  }

  createSubviews() {
    let todoListObjects = TodoListModel.getAll(), todoListView;

    for (let i = 0, size = todoListObjects.length; i < size; ++i) {
      this.addTodoList(todoListObjects[i]);
    }
  }

  popTodoList() {
    if (!this.ui.listWrapper.lastChild) return;
    // let id = this.ui.listWrapper.lastChild.id;  // TODO: rm from storage
    
  }

  removeTodoList(id) { delete this.subviews.todoLists[id]; }
}

export {MainListView};
