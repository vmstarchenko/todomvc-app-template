import {View} from 'FKM';
import {TodoView} from 'views';
import {todoListTemplates} from 'templates';
import {TodoListModel} from 'models';

class TodoListView extends View {
  constructor(rootElement) {
    super(rootElement);

    this.todoListModel = TodoListModel.getById(this.id, false);
    this.template = todoListTemplates.get('todoList');
    this.subviews.todos = {};

    this.dRootAttributes = {id: this.id, classes: 'todoapp todolist'};

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
      {event: 'click', element: 'buttonClear', handler: this.clearCompleted},
      {
        event: 'click',
        element: 'buttonAll',
        handler: this.updateShowValue.bind(this, 'All')
      },
      {
        event: 'click',
        element: 'buttonActive',
        handler: this.updateShowValue.bind(this, 'Active')
      },
      {
        event: 'click',
        element: 'buttonCompleted',
        handler: this.updateShowValue.bind(this, 'Completed')
      },
    ];

    this.render().init();
    this.checkCompleted();
    this.createSubviews();

    this.updateShowValue(this.todoListModel.show);
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
    todoView.on('destroy', this.removeTodo.bind(this, todoObject.id))
        .on('destroy', this.checkCompleted.bind(this))
        .on('destroy', this.countUncompleted.bind(this))
        .on('change', this.checkCompleted.bind(this))
        .on('change', this.countUncompleted.bind(this))
        .emit('change');

    this.subviews.todos[todoView.id] = todoView;

    let show = this.todoListModel.show;
    if (show === 'All' || !(todoObject.completed ^ show === 'Completed'))
      todoView.show();
    else
      todoView.hide();

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

  updateShowValue(value) {
    this.todoListModel.show = value;
    this.todoListModel.commit();

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

    let views = this.subviews.todos, todos = this.todoListModel.todos;
    for (let id in views) {
      if (value === 'All' || !(todos[id].completed ^ value === 'Completed'))
        views[id].show();
      else
        views[id].hide();
    }
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
