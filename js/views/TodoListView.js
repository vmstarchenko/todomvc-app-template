import {View} from 'FKM';
import {TodoView} from 'views';
import {todoListTemplates} from 'templates/todoListTemplates';
import {TodoListModel} from 'models';

class TodoListView extends View {
  constructor(rootElement) {
    super(rootElement);

    this.id = rootElement.id;
    // this.model = TodoListModel.getById(this.id, false);

    this.dElements = {
      buttonAll: '[href="#/"]',
      buttonActive: '[href="#/active"]',
      buttonCompleted: '[href="#/completed"]',
      buttonClear: '.clear-completed',
      todosWrapper: '.main',
      inputField: '.new-todo',
      buttonToggleAll: '.toggle-all'
    };

    // TODO: "elementname" as string
    this.dEvents = [
      {event: 'keypress', element: 'inputField', handler: this.createNewTodo}
    ];

    this.template = todoListTemplates.get('todoList');
  }

  // create html and insert into dom
  render() {
    let html = this._render();
    this.rootElement.innerHTML = html;
    return this;
  }

  // create html
  _render() {
    let context = {id: this.id, subviews: {todos: []}};
    return this.template(context);
  }

  createNewTodo(event) {
    if (event.key !== 'Enter') return;

    let value = this.ui.inputField.value.trim();
    if (!value) return;

    console.log('add new todo:', value);
    TodoView.create({title: value});
  }
}

export {TodoListView};
