import {View} from 'FKM';
import {TodoView} from 'views';
import {todoListTemplates} from 'templates';
import {TodoListModel} from 'models';

class TodoListView extends View {
  constructor(rootElement) {
    super(rootElement);

    this.todoListModel = TodoListModel.getById(this.id, false);
    this.template = todoListTemplates.get('todoList');
    this.subviews.todos = [];

    this.dRootAttributes = {id: this.id, classes: 'todoapp todolist'};

    this.dElements = {
      buttonAll: '[href="#/"]',
      buttonActive: '[href="#/active"]',
      buttonCompleted: '[href="#/completed"]',
      buttonClear: '.clear-completed',
      todoList: '.todo-list',
      inputField: '.new-todo',
      buttonToggleAll: '.toggle-all'
    };

    // TODO: "elementname" as string
    this.dEvents = [
      {event: 'keypress', element: 'inputField', handler: this.createNewTodo}
    ];

    this.render().init();

    // handle subviews
    let todos = this.todoListModel.todos;
    for (let todoId in todos) {
      this.addTodo(todos[todoId]);
    }
  }

  // create html and insert into dom
  render() {
    let html = this._render();
    this.rootElement.innerHTML = html;
    return this;
  }

  // create html
  _render() {
    let context = {id: this.id, subviews: {todos: this.subviews.todos}};
    return this.template(context);
  }

  createNewTodo(event) {
    if (event.key !== 'Enter') return;

    let value = this.ui.inputField.value.trim();
    if (!value) return;

    let todoObject = this.todoListModel.addTodo(value);
    this.todoListModel.commit();
    // console.log(JSON.parse(localStorage['#TodoList#0']));
    // console.log(this.todoListModel);

    this.addTodo(todoObject);
  }

  addTodo(todoObject) {
    let todoRootElement = document.createElement('li');
    console.log(todoObject.id);
    let todoView = new TodoView(todoRootElement, this.todoListModel, todoObject.id);
    this.subviews.todos.push(todoView);

    // todoView.render().findElements().bindEvents();
    this.ui.todoList.appendChild(todoRootElement);
  }
}

export {TodoListView};
