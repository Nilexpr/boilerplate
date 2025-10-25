"use strict";

// Minimal Promises/A+ compatible implementation focused on the then/resolve mechanics
// Uses macrotask scheduling (setTimeout) to ensure async handler execution

function scheduleAsync(fn) {
  setTimeout(fn, 0);
}

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function isObjectOrFunction(value) {
  return (
    (typeof value === "object" && value !== null) || typeof value === "function"
  );
}

function MyPromise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("MyPromise resolver is not a function");
  }

  var self = this;
  self._state = PENDING;
  self._value = undefined;
  self._handlers = []; // queue of { onFulfilled, onRejected, resolve, reject }

  var called = false; // ensure resolve/reject called at most once

  function fulfill(value) {
    if (self._state !== PENDING) {
      return;
    }
    self._state = FULFILLED;
    self._value = value;
    flushHandlers();
  }

  function reject(reason) {
    if (self._state !== PENDING) {
      return;
    }
    self._state = REJECTED;
    self._value = reason;
    flushHandlers();
  }

  function resolve(value) {
    if (called) {
      return;
    }
    called = true;
    // Promise Resolution Procedure
    resolvePromise(self, value, fulfill, reject);
  }

  function rejectOnce(reason) {
    if (called) {
      return;
    }
    called = true;
    reject(reason);
  }

  function flushHandlers() {
    scheduleAsync(function () {
      if (self._handlers.length === 0) {
        return;
      }
      var queue = self._handlers;
      self._handlers = [];
      for (var i = 0; i < queue.length; i++) {
        handle(queue[i]);
      }
    });
  }

  function handle(handler) {
    if (self._state === PENDING) {
      self._handlers.push(handler);
      return;
    }

    scheduleAsync(function () {
      var cb =
        self._state === FULFILLED ? handler.onFulfilled : handler.onRejected;
      if (typeof cb !== "function") {
        if (self._state === FULFILLED) {
          handler.resolve(self._value);
        } else {
          handler.reject(self._value);
        }
        return;
      }

      try {
        var result = cb(self._value);
        handler.resolve(result);
      } catch (err) {
        handler.reject(err);
      }
    });
  }

  try {
    executor(resolve, rejectOnce);
  } catch (err) {
    rejectOnce(err);
  }

  // then method defined on the instance via prototype
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError("Cannot resolve promise with itself"));
  }

  if (x instanceof MyPromise) {
    // adopt its state
    return x.then(
      function (v) {
        resolve(v);
      },
      function (r) {
        reject(r);
      }
    );
  }

  if (isObjectOrFunction(x)) {
    var then;
    try {
      then = x.then; // may throw
    } catch (e) {
      return reject(e);
    }

    if (typeof then === "function") {
      var called = false;
      try {
        then.call(
          x,
          function (y) {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function (r) {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          }
        );
      } catch (e2) {
        if (!called) {
          reject(e2);
        }
      }
      return;
    }
  }

  // non-thenable
  resolve(x);
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var self = this;
  return new MyPromise(function (resolve, reject) {
    var handler = {
      onFulfilled: onFulfilled,
      onRejected: onRejected,
      resolve: resolve,
      reject: reject,
    };

    if (self._state === PENDING) {
      self._handlers.push(handler);
    } else {
      // ensure async execution
      setTimeout(function () {
        var cb = self._state === FULFILLED ? onFulfilled : onRejected;
        if (typeof cb !== "function") {
          if (self._state === FULFILLED) {
            resolve(self._value);
          } else {
            reject(self._value);
          }
          return;
        }
        try {
          var result = cb(self._value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }, 0);
    }
  });
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

module.exports = MyPromise;
