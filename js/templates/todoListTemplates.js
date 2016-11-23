import {TemplatesStorage} from 'FKM';

function _todoListTemplate(c) {
  let html = `<section class="todoapp todolist" id="${c.id}">
      <header class="header">
        <input class="new-todo" placeholder="What needs to be done?" autofocus>
      </header>
      <section class="main">
        <input class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">`;
  let todos = c.subviews.todos;
  for (let i = 0, size = todos.length; i < size; ++i) {
    html += todos[i]._render(c);
  }
  html += `</ul>
      </section>
      <footer class="footer">
        <span class="todo-count"><strong>0</strong> item left</span>
        <ul class="filters">
          <li>
            <a class="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>`;
  return html;
}

function _todoTemplate(context) {
  return 'dummy template';
}

let todoListTemplates = new TemplatesStorage({
  todoList: _todoListTemplate
});

export {todoListTemplates};
