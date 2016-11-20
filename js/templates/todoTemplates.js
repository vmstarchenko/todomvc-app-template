import { TemplatesStorage } from 'FKM';

function createTodo(context) {
  return 'from templates';
}

let todoTemplates = new TemplatesStorage({
  create: createTodo
});


export {
  todoTemplates
};
