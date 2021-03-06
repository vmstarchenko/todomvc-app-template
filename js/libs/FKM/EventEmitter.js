let listeners = Symbol('Listeners');
let taskQueue = Symbol('Task queue');
let isEmmiting = Symbol('Task queue');

function EventEmitter() {
  this[listeners] = {};
  this[taskQueue] = [];
  this[isEmmiting] = [];
}

EventEmitter.prototype = {};

/**
 * Alias for emitter.on(eventName, listener).
 */
EventEmitter.prototype.addListener = function(eventName, listener) {
  return this.on(eventName, listener);
};

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
EventEmitter.prototype.on = function(eventName, listener) {
  if (!this[listeners][eventName]) {
    this[listeners][eventName] = [];
  }
  this[listeners][eventName].push(listener);
  return this;
};

/**
 *   Removes all listeners, or those of the specified eventName.
 *   Note that it is bad practice to remove listeners added elsewhere in
 * the code, particularly when the EventEmitter instance was created by
 * some other component or module (e.g. sockets or file streams).
 *
 * @param{String|Symbol} eventName - The name of the event.
 *
 * @returns{EventEmitter} reference to the EventEmitter, so that
 *   calls can be chained.
 */
EventEmitter.prototype.removeAllListeners = function(eventName) {
  if (this[isEmmiting]) {
    this[taskQueue].push(this.remoteAllListeners.bind(this, eventName));
    return this;
  }

  if (this[listeners][eventName]) this[listeners][eventName] = [];
  return this;
};

/**
 *   Removes the specified listener from the listener array for the event
 * named eventName.
 *   removeListener will remove, at most, one instance of a listener from the
 * listener array. If any single listener has been added multiple times to
 * the listener array for the specified eventName, then removeListener
 * must be called multiple times to remove each instance.
 *   Note that once an event has been emitted, all listeners attached to it at
 * the time of emitting will be called in order. This implies that any
 * removeListener() or removeAllListeners() calls after emitting and before
 * the last listener finishes execution will not remove them from emit() in
 * progress. Subsequent events will behave as expected.
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
 */
EventEmitter.prototype.removeListener = function(eventName, listener) {
  if (this[isEmmiting]) {
    this[taskQueue].push(this.remoteListener.bind(this, eventName, listener));
    return this;
  }

  if (this[listeners][eventName]) {
    let _listeners = this[listeners][eventName];
    let index = _listeners.indexOf(listener);
    if (index > -1) _listeners.splice(index, 1);
  }
  return this;
};

/**
 *   Synchronously calls each of the listeners registered for the event
 * named eventName, in the order they were registered, passing the supplied
 * arguments to each.
 *
 * @param{String|Symbol} eventName - The name of the event.
 * @param{*} args - arguments that passed to listeners
 *
 * @returns Returns true if the event had listeners, false otherwise.
 */
EventEmitter.prototype.emit = function(eventName, ...args) {
  this.isEmmiting = true;
  if (this[listeners][eventName]) {
    this[listeners][eventName].forEach(func => func(eventName, ...args));
    this.isEmmiting = false;
    return true;
  }

  this.isEmmiting = false;
  return false;
};

// Aux. Call all functions from taskQueue
EventEmitter.prototype._resolveTaskQueue = function() {
  let func;
  while (this[taskQueue]) {
    func = this[taskQueue][0];
    this[taskQueue].shift();
    func();
  }
};


/**
 * Wrap model into emitter.
 *
 * @param{Function} model
 */
function wrapModelByEmitter(model) {
  let modelConstructor = model.constructor, emitter = new EventEmitter(), props;

  props = [].concat(
      Object.getOwnPropertyNames(EventEmitter.prototype),
      Object.getOwnPropertySymbols(EventEmitter.prototype));
  for (let i = 0, size = props.length; i < size; ++i) {
    model[props[i]] = EventEmitter.prototype[props[i]];
  }

  props = [].concat(
      Object.getOwnPropertyNames(emitter),
      Object.getOwnPropertySymbols(emitter));
  for (let i = 0, size = props.length; i < size; ++i) {
    model[props[i]] = emitter[props[i]];
  }

  model.constructor = modelConstructor;
}


// TODO: other methods
// Class: EventEmitter

//     Event: 'newListener'
//     Event: 'removeListener'
//     EventEmitter.listenerCount(emitter, eventName)
//     EventEmitter.defaultMaxListeners
// +    emitter.addListener(eventName, listener)
// +    emitter.emit(eventName[, ...args])
//     emitter.eventNames()
//     emitter.getMaxListeners()
//     emitter.listenerCount(eventName)
//     emitter.listeners(eventName)
// +    emitter.on(eventName, listener)
//     emitter.once(eventName, listener)
//     emitter.prependListener(eventName, listener)
//     emitter.prependOnceListener(eventName, listener)
// +    emitter.removeAllListeners([eventName])
// +    emitter.removeListener(eventName, listener)
//     emitter.setMaxListeners(n)

export {EventEmitter, wrapModelByEmitter};
