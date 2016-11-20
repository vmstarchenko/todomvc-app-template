import {View} from 'FKM';
import {TodoView} from 'TodoView';

class TodoListView extends View {
  constructor(rootElement) {
    super();

    this.findElements(rootElement, {
      buttonAll: '[href="#/"]',
      buttonActive: '[href="#/active"]',
      buttonCompleted: '[href="#/completed"]',
      buttonClear: '.clear-completed',
      todosWrapper: '.main',
      inputField: '.new-todo',
      buttonToggleAll: '.toggle-all'
    });

    this.bindEvents([{
      event: 'keypress',
      element: this.ui.inputField,
      handler: this.createNewTodo
    }]);

    console.log(this.ui);
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
