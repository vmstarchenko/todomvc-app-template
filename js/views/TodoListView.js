import {View} from 'FKM';
import {TodoView} from 'views';
import {todoListTemplates} from 'templates';
import {TodoListModel} from 'models';

class TodoListView extends View {
  constructor(rootElement, id) {
    super(rootElement);

    this.todoListModel = TodoListModel.getById(id);

    this.template = todoListTemplates.get('todoList');
    this.subviews.todos = {};

    this.dRootAttributes = {
      id: this.todoListModel.wrappedId,
      class: 'todoapp todolist'
    };

    this.dElements = {
      buttonAll: '[href="#/"]',
      buttonActive: '[href="#/active"]',
      buttonCompleted: '[href="#/completed"]',
      buttonClear: '.clear-completed',
      todoList: '.todo-list',
      inputField: '.new-todo',
      buttonToggleAll: '.toggle-all',
      todoCounter: '.todo-count strong'
    };

    // TODO: "elementname" as string
    this.dEvents = [
      {event: 'keypress', element: 'inputField', handler: this.createNewTodo},
      {event: 'change', element: 'buttonToggleAll', handler: this.toggleAll},
      {
        event: 'change',
        element: 'buttonToggleAll',
        handler: this.updateShow.bind(this, undefined)
      },
      {event: 'click', element: 'buttonClear', handler: this.clearCompleted},
      {
        event: 'click',
        element: 'buttonAll',
        handler: this.updateShow.bind(this, 'All')
      },
      {
        event: 'click',
        element: 'buttonActive',
        handler: this.updateShow.bind(this, 'Active')
      },
      {
        event: 'click',
        element: 'buttonCompleted',
        handler: this.updateShow.bind(this, 'Completed')
      },
    ];

    this.render().init();
    this.checkCompleted();
    this.createSubviews();

    this.updateShow(this.todoListModel.show);
  }

  // create html and insert into dom
  render() {
    let html = this._render();
    this.rootElement.innerHTML = html;
    return this;
  }

  // create html
  _render() {
    let todos = [];
    let show = this.todoListModel.show;

    if (show !== 'All') {
      let allTodos = this.todoListModel.todos, views = this.subviews.todos,
          showCompleted = (show === 'Completed') ? true : false;

      for (let id in views) {
        if (!(allTodos[id].completed ^ showCompleted)) todos.push(views[id]);
      }
    }

    let context = {id: this.id, subviews: {todos: todos}, show: show};
    return this.template(context);
  }

  createNewTodo(event) {
    if (event.key !== 'Enter') return;

    let value = this.ui.inputField.value.trim();
    if (!value) return;

    let todoObject = this.todoListModel.addTodo(value);
    this.todoListModel.commit();

    this.addTodo(todoObject);
  }

  addTodo(todoObject) {
    let todoRootElement = document.createElement('li');

    let todoView =
        new TodoView(todoRootElement, this.todoListModel, todoObject.id);

    this.subviews.todos[todoView.id] = todoView;

    todoView.on('destroy', this.removeTodo.bind(this, todoObject.id))
        .on('destroy', this.checkCompleted.bind(this))
        .on('destroy', this.countUncompleted.bind(this))
        .on('change', this.checkCompleted.bind(this))
        .on('change', this.updateTodoShow.bind(this, todoObject.id, undefined))
        .on('change', this.countUncompleted.bind(this))
        .emit('change');

    let show = this.todoListModel.show;

    this.ui.todoList.appendChild(todoRootElement);
  }

  removeTodo(id) { delete this.subviews.todos[id]; }

  toggleAll() {
    let checked = this.ui.buttonToggleAll.checked, todos = this.subviews.todos;

    for (let todo in todos) {
      todos[todo].setCompleteStatus(checked);
      todos[todo].toggleCompleted(false);
    }
    this.todoListModel.commit();
  }

  checkCompleted() {
    let todos = this.todoListModel.todos, allCompleted = true;
    let todosIsEmpty = true;
    for (let id in todos) {
      todosIsEmpty = false;
      if (todos[id].completed) continue;
      allCompleted = false;
      break;
    }
    if (todosIsEmpty) allCompleted = false;

    this.ui.buttonToggleAll.checked = allCompleted;
  }

  countUncompleted() {
    let todos = this.todoListModel.todos, counter = 0;
    for (let id in todos) {
      if (!(todos[id].completed)) ++counter;
    }

    this.ui.todoCounter.innerHTML = counter;
  }

  clearCompleted() {
    let todos = this.todoListModel.todos, views = this.subviews.todos;
    for (let id in todos) {
      if (todos[id].completed) views[id].destroy();
    }
  }

  updateShow(value) {
    if (value !== undefined) {
      this.todoListModel.show = value;
      this.todoListModel.commit();
    } else {
      value = this.todoListModel.show;
    }

    // select button
    this.ui.buttonAll.classList.remove('selected');
    this.ui.buttonActive.classList.remove('selected');
    this.ui.buttonCompleted.classList.remove('selected');
    let target = {
      All: this.ui.buttonAll,
      Active: this.ui.buttonActive,
      Completed: this.ui.buttonCompleted,
    }[value];

    target.classList.add('selected');

    let views = this.subviews.todos;
    for (let id in views) {
      this.updateTodoShow(id, value);
    }
  }

  updateTodoShow(id, value) {
    if (value === undefined) value = this.todoListModel.show;

    if (value === 'All' ||
        !(this.todoListModel.todos[id].completed ^ value === 'Completed'))
      this.subviews.todos[id].show();
    else
      this.subviews.todos[id].hide();
  }

  createSubviews() {
    let todos = this.todoListModel.todos;
    for (let todoId in todos) {
      this.addTodo(todos[todoId]);
    }
    return this;
  }
}

export {TodoListView};
