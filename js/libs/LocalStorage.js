class LocalStorage extends Object {
  constructor(name) {
    super(JSON.parse(window.localStorage.getItem(name)));

    Object.defineProperty(this, 'commit', {
      configurable: true,
      enumerable: false,
      writable: false,
      value: () => {
        window.localStorage[name] = JSON.stringify(this);
      }
    });
  }
}

export {
  LocalStorage
};
