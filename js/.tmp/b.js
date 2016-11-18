import { a } from './a';

console.log('create b class');
class b {
  static get fields() {
    return {
      other: a
    };
  }

  constructor() {
    console.log(b.fields);
  }
}

export {
  b
};

