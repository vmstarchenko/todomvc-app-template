import {View} from 'FKM';
import {todoTemplates} from 'templates/todoTemplates';

class TodoView extends View {
  constructor(rootElement) {
    super();

    this.findElements(rootElement, {
    });

    this.bindEvents([{
    }]);

  }

  static create(object) {
    todoTemplates.render('create', object);
  }
}

export {TodoView};
