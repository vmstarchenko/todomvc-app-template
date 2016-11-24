import {View} from 'FKM';
import {todoListTemplates} from 'templates';

class TodoView extends View {
  constructor(rootElement, model, id) {
    super(rootElement);
    this.id = id;

    this.todoListModel = model;
    this.todo = this.todoListModel.todos[this.id];
    this.template = todoListTemplates.get('todo');

    this.dRootAttributes = {
      id: id,
      class: (this.todo.completed) ? 'completed' : ''
    };

    this.dElements = {
      buttonToggle: '.toggle',
      buttonRemove: '.destroy',
      changeTitleField: '.edit',
      label: 'label',
      view: '.view',
    };

    // TODO: "elementname" as string
    this.dEvents = [
      {event: 'change', element: 'buttonToggle', handler: this.toggleCompleted},
      {
        event: 'click',  //
        element: 'label',
        handler: this.showChangeTitleField
      },
      {
        event: 'blur',
        element: 'changeTitleField',
        handler: this.saveTitleChanges
      },
      {
        event: 'keypress',
        element: 'changeTitleField',
        handler: this.saveTitleChanges
      }
    ];

    this.render().init();
  }

  _render() {
    let context = Object.assign({}, this.todo);

    return this.template(context);
  }

  showChangeTitleField(event) {
    this.ui.view.style.display = 'none';
    this.ui.changeTitleField.style.display = 'block';
    this.ui.changeTitleField.focus();
  }

  saveTitleChanges(event) {
    if (event.type === 'keypress' && event.key !== 'Enter') return;

    let value = this.ui.changeTitleField.value;
    this.todo.title = value;
    this.todoListModel.commit();

    this.ui.changeTitleField.style.display = 'none';
    this.ui.view.style.display = 'block';
    this.render().init();
  }

  toggleCompleted(event) {
    console.log(this.ui.buttonToggle);
    let checked = this.ui.buttonToggle.checked;

    this.todo.completed = checked;
    this.todoListModel.commit();
    this.dRootAttributes.class = (checked) ? ' completed' : '';

    if (checked)
      this.rootElement.classList.add('completed');
    else
      this.rootElement.classList.remove('completed');
  }
}

export {TodoView};
