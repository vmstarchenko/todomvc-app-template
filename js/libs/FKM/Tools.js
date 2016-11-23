let tools = {
  /**
   * Safety get field of object or undefined if doesn't exists
   */
  get: function(object, ...fields) { console.log(fields); },

  /*
   * Safety check if object has field
   */
  has: function(object, ...fields) { console.log(fields); }
};
export {tools};
