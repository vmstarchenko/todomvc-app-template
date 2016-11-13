export default class EventEmitter {
  constructor() {
    this.listeners = {};
    this._taskQueue = [];
    this._isEmmiting = false;
  }

  /**
   * Alias for emitter.on(eventName, listener).
   */
  addListener(eventName, listener) {
    return this.on(eventName, listener);
  }

  /**
   *   Adds the listener function to the end of the listeners array for the
   * event named eventName. No checks are made to see if the listener has
   * already been added. Multiple calls passing the same combination of
   * eventName and listener will result in the listener being added, and 
   * called, multiple times.
   *
   * @param{String|Symbol} eventName - The name of the event.
   * @param{Function} listener - The callback function
   *
   * @returns{EventEmitter} Returns a reference to the EventEmitter, so that
   *   calls can be chained.
   *
   * @example
   *   server.on('connection', (stream) => {
   *     console.log('someone connected!');
   *   });
   */
  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
    return this;
  }

  /**
   * Removes the specified listener from the listener array for the event
   * named eventName.
   *
   * @param{String|Symbol} eventName - The name of the event.
   * @param{Function} listener - The callback function
   *
   * @returns{EventEmitter} Returns a reference to the EventEmitter, so that
   *   calls can be chained.
   *
   * @example
   *   var callback = (stream) => {
   *     console.log('someone connected!');
   *   };
   *   server.on('connection', callback);  // someone connected
   *   server.removeListener('connection', callback);
   *   server.on('connection', callback);  //
   *
   * removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified eventName, then removeListener must be called multiple times to remove each instance.
   *
   *   Note that once an event has been emitted, all listeners attached to it at
   * the time of emitting will be called in order. This implies that any
   * removeListener() or removeAllListeners() calls after emitting and before
   * the last listener finishes execution will not remove them from emit() in
   * progress. Subsequent events will behave as expected.
   */
  removeListener(eventName, listener) {
    if (this._isEmmiting) {
      this._taskQueue.push(this.remoteListener.bind(this, eventName, listener));
      return this;
    }
    if (this.listeners[eventName]) {
      let listeners = this.listeners[eventName];

      for (let i=0, size=listeners.length; i < size; ++i) {
        if (listeners[i] === listener) {
          listeners.pop(i);
          break;
        }
      }

      if (!this.listeners[eventName])
        this.listeners[eventName] = undefined;
    }
    return this;
  }

  emit(eventName, ...args) {
    this.isEmmiting = true;
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(func => func(eventName, ...args));
      this.isEmmiting = false;
      return true;
    }

    this.isEmmiting = false;
    return false;
  }

  _resolveTaskQueue() {
    let func;
    while (this._taskQueue) {
      func = this._taskQueue[0];
      this._taskQueue.shift();
      func();
    }
  }
}

// TODO: other methods
// Class: EventEmitter

//     Event: 'newListener'
//     Event: 'removeListener'
//     EventEmitter.listenerCount(emitter, eventName)
//     EventEmitter.defaultMaxListeners
// +    emitter.addListener(eventName, listener)
//     emitter.emit(eventName[, ...args])
//     emitter.eventNames()
//     emitter.getMaxListeners()
//     emitter.listenerCount(eventName)
//     emitter.listeners(eventName)
// +    emitter.on(eventName, listener)
//     emitter.once(eventName, listener)
//     emitter.prependListener(eventName, listener)
//     emitter.prependOnceListener(eventName, listener)
//     emitter.removeAllListeners([eventName])
//     emitter.removeListener(eventName, listener)
//     emitter.setMaxListeners(n)

