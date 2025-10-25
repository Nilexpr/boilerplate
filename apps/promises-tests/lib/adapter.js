"use strict";

var MyPromise = require("./myPromise3.js").default;

exports.deferred = function () {
  var resolveFn;
  var rejectFn;
  var promise = new MyPromise(function (resolve, reject) {
    resolveFn = resolve;
    rejectFn = reject;
  });
  return {
    promise: promise,
    resolve: function (value) {
      resolveFn(value);
    },
    reject: function (reason) {
      rejectFn(reason);
    },
  };
};

exports.resolved = function (value) {
  return new MyPromise(function (resolve) {
    resolve(value);
  });
};

exports.rejected = function (reason) {
  return new MyPromise(function (_resolve, reject) {
    reject(reason);
  });
};
