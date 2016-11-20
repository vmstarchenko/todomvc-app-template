import {View} from 'FKM';

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

    console.log(this.ui);
  }
}

export {TodoListView};
