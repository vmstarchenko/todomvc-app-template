import {TemplatesStorage} from 'FKM';

function _todoListTemplate(c) {
  let html = `<header class="header">
        <input class="new-todo" placeholder="What needs to be done?" autofocus>
        <button class="destroy-todolist">X</button>
      </header>
      <section class="main">
        <input class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">`;
  let todos = c.subviews.todos;
  for (let i in todos) {
    html += todos[i]._render(c);
  }
  html += `</ul>
      </section>
      <footer class="footer">
        <span class="todo-count"><strong>0</strong> item left</span>
        <ul class="filters">
          <li>
            <a ${c.show === 'All' ? 'class="selected"': ''} href="#/">All</a>
          </li>
          <li>
            <a ${c.show === 'Active' ? 'class="selected"': ''} href="#/active">Active</a>
          </li>
          <li>
            <a ${c.show === 'Completed' ? 'class="selected"': ''} href="#/completed">Completed</a>
          </li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>`;
  return html;
}


function _mainListTemplate(c) {
  let html = `<div class="list-wrapper">`;
  let lists = c.subviews.lists;
  for (let i in lists) {
    html += lists[i]._render(c);
  }
  html += `</div>
      <center><button class="add">+</button></center>`;
  return html;
}

function _todoTemplate(c) {
  let html = `<div class="view">
    <input class="toggle" type="checkbox" ${c.completed ? "checked" : ""}>
    <label>${c.title}</label>
    <button class="destroy"></button>
   </div>
   <input class="edit" value="${c.title}">`;
  return html;
}

let todoListTemplates = new TemplatesStorage({
  todoList: _todoListTemplate,
  todo: _todoTemplate,
  mainList: _mainListTemplate
});

export {todoListTemplates};
