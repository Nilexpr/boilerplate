"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        var _this = this;
        this.state = "pending";
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        this.resolve = function (value) {
            if (_this.state !== PENDING)
                return;
            if (value === _this) {
                return _this.reject(new TypeError("Cannot resolve promise with itself"));
            }
            if ((typeof value === "object" && value !== null) ||
                typeof value === "function"
            // true
            ) {
                // let called = false;
                try {
                    var then = value.then; // 只取一次
                    if (typeof then === "function") {
                        try {
                            then.call(value, function (y) {
                                // if (called) return;
                                // called = true;
                                _this.resolve(y);
                            }, function (r) {
                                // if (called) return;
                                // called = true;
                                _this.reject(r);
                            });
                        }
                        catch (e) {
                            return _this.reject(e); // 异步前抛错 → 拒绝
                            // 已经调用过 resolve/reject → 忽略异常
                        }
                        return; // 关键：无论是否抛错，都不要走兜底分支
                    }
                }
                catch (e) {
                    return _this.reject(e);
                }
            }
            queueMicrotask(function () {
                if (_this.state !== PENDING)
                    return;
                _this.value = value;
                _this.state = FULFILLED;
                _this.resolveCallbacks.forEach(function (cb) { return cb(); });
            });
        };
        this.reject = function (reason) {
            queueMicrotask(function () {
                if (_this.state !== PENDING) {
                    return;
                }
                _this.reason = reason;
                _this.state = REJECTED;
                _this.rejectCallbacks.forEach(function (callback) { return callback(); });
            });
        };
        this.then = function (onfulfilled, onrejected) {
            return new MyPromise(function (resolve, reject) {
                var fulfilledTask = function () {
                    queueMicrotask(function () {
                        try {
                            var x = typeof onfulfilled === "function"
                                ? onfulfilled(_this.value)
                                : _this.value;
                            resolve(x);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                var rejectedTask = function () {
                    queueMicrotask(function () {
                        try {
                            if (typeof onrejected === "function") {
                                var x = onrejected(_this.reason);
                                resolve(x);
                            }
                            else {
                                reject(_this.reason);
                            }
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                };
                if (_this.state === "pending") {
                    _this.resolveCallbacks.push(fulfilledTask);
                    _this.rejectCallbacks.push(rejectedTask);
                }
                else if (_this.state === "fulfilled") {
                    fulfilledTask();
                }
                else {
                    rejectedTask();
                }
            });
        };
        this.catch = function (onrejected) {
            return _this.then(undefined, onrejected);
        };
        this.finally = function (onfinally) {
            return _this.then(function (value) {
                var r = onfinally === null || onfinally === void 0 ? void 0 : onfinally();
                return new MyPromise(function (resolve, reject) {
                    new MyPromise(function (res) { return res(r); }).then(function () { return resolve(value); }, function (e) { return reject(e); });
                });
            }, function (reason) {
                var r = onfinally === null || onfinally === void 0 ? void 0 : onfinally();
                return new MyPromise(function (resolve, reject) {
                    new MyPromise(function (res) { return res(r); }).then(function () { return reject(reason); }, function (e) { return reject(e); });
                });
            });
        };
        try {
            executor(this.resolve, this.reject);
        }
        catch (error) {
            if (this.state === "pending") {
                this.reject(error);
            }
        }
    }
    MyPromise.All = function (promises) {
        return new MyPromise(function (resolve, reject) {
            var results = [];
            var resolvedCount = 0;
            promises.forEach(function (promise, index) {
                promise.then(function (value) {
                    results[index] = value;
                    resolvedCount++;
                    if (resolvedCount === promises.length) {
                        resolve(results);
                    }
                }, function (reason) {
                    reject(reason);
                });
            });
        });
    };
    return MyPromise;
}());
exports.default = MyPromise;
