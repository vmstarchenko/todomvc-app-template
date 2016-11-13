import { createTodoListTemplates } from 'templates/TodoListTemplates';

class TodoList {
  constructor() {
    this._Templates = createTodoListTemplates();
  }
}

export {
  TodoList
};
