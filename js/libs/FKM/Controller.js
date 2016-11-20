
function Controller() {}

Controller.prototype.activate = function(url) {
  console.log('activate controller; dummy');
};


Controller.prototype.deactivate = function(url) {
  console.log('deactivate controller; dummy');
};


export {Controller};
