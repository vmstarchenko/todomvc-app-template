import {Model} from './../libs/FKM/Model.js';

class M extends Model {
  static get _fields() {
    return {
      n: Number,
      s: String
    };
  }
}

Model.register(M, "M"); // don't forget register model after setting all your settings

export {
  M
};

