import {View} from 'FKM';
import {todoListTemplates} from 'templates';

class TodoView extends View {
  constructor(rootElement, model, id) {
    super(rootElement);
    this.id = id;

    this.todoListModel = model;
    this.template = todoListTemplates.get('todo');

    this.dRootAttributes = {id: id};

    this.dElements = {
      buttonToggle: '.toggle',
      buttonRemove: '.destroy',
      changeTitleField: '.edit',
    };

    // TODO: "elementname" as string
    this.dEvents = [];

    this.render().init();
  }

  _render() {
    let context = Object.assign({}, this.todoListModel.todos[this.id]);

    return this.template(context);
  }
}

export {TodoView};
