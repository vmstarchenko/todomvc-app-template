import {Model, fieldsS} from 'FKM';

class TodoListModel extends Model {
  constructor(fields, id) {
    super(fields, id);
    this[fieldsS].todos = [];
  }
  static get _fields() {
    return {
      show: String, // 'All|Active|Completed'
    };
  }

  push(value) {
    this[fieldsS].todos.push(value);
    TodoListModel.emit('model:changed', {field: 'todos', value: value});
  }
}

Model.register(TodoListModel, "TodoList");

export {TodoListModel};
