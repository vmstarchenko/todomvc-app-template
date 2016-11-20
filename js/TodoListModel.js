import {Model, fieldsS} from 'FKM';

class TodoListModel extends Model {
  constructor(fields) {
    super();
    this[fieldsS].array = [];
  }
  static get _fields() {
    return {
      show: String, // 'All|Active|Completed'
    };
  }

  push(value) {
    this[fieldsS].array.push(value);
    TodoListModel.emit('model:changed', {field: 'array', value: value});
  }
}

Model.register(TodoListModel, "TodoListModel");

export {TodoListModel};
