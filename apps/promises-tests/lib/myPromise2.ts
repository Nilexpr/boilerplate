const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

export default class MyPromise {
  private state: "pending" | "fulfilled" | "rejected" = "pending";
  private value: any;
  private reason: any;

  private resolveCallbacks: (() => void)[] = [];
  private rejectCallbacks: (() => void)[] = [];

  constructor(
    executor: (
      resolve: (value: any) => void,
      reject: (reason: any) => void
    ) => void
  ) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      if (this.state === "pending") {
        this.reject(error);
      }
    }
  }

  resolve = (value: any) => {
    if (this.state !== PENDING) return;

    if (value === this) {
      return this.reject(new TypeError("Cannot resolve promise with itself"));
    }

    if (
      (typeof value === "object" && value !== null) ||
      typeof value === "function"
    ) {
      let called = false;
      try {
        const then = (value as any).then; // 只取一次
        if (typeof then === "function") {
          try {
            then.call(
              value,
              (y: any) => {
                if (called) return;
                called = true;
                this.resolve(y);
              },
              (r: any) => {
                if (called) return;
                called = true;
                this.reject(r);
              }
            );
          } catch (e) {
            if (!called) return this.reject(e); // 异步前抛错 → 拒绝
            // 已经调用过 resolve/reject → 忽略异常
          }
          return; // 关键：无论是否抛错，都不要走兜底分支
        }
      } catch (e) {
        if (!called) return this.reject(e);
      }
    }

    queueMicrotask(() => {
      if (this.state !== PENDING) return;
      this.value = value;
      this.state = FULFILLED;
      this.resolveCallbacks.forEach((cb) => cb());
    });
  };

  reject = (reason: any) => {
    queueMicrotask(() => {
      if (this.state !== PENDING) {
        return;
      }
      this.reason = reason;
      this.state = REJECTED;
      this.rejectCallbacks.forEach((callback) => callback());
    });
  };

  then = (
    onfulfilled?: (value: any) => any,
    onrejected?: (reason: any) => any
  ) => {
    return new MyPromise((resolve, reject) => {
      const fulfilledTask = () => {
        queueMicrotask(() => {
          try {
            const x =
              typeof onfulfilled === "function"
                ? onfulfilled(this.value)
                : this.value;

            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedTask = () => {
        queueMicrotask(() => {
          try {
            if (typeof onrejected === "function") {
              const x = onrejected(this.reason);
              resolve(x);
            } else {
              reject(this.reason);
            }
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.state === "pending") {
        this.resolveCallbacks.push(fulfilledTask);
        this.rejectCallbacks.push(rejectedTask);
      } else if (this.state === "fulfilled") {
        fulfilledTask();
      } else {
        rejectedTask();
      }
    });
  };

  catch = (onrejected?: (reason: any) => any) => {
    return this.then(undefined, onrejected);
  };

  finally = (onfinally?: (() => void) | null) => {
    return this.then(
      (value) => {
        const r = onfinally?.();
        return new MyPromise((resolve, reject) => {
          new MyPromise((res) => res(r)).then(
            () => resolve(value),
            (e) => reject(e)
          );
        });
      },
      (reason) => {
        const r = onfinally?.();
        return new MyPromise((resolve, reject) => {
          new MyPromise((res) => res(r)).then(
            () => reject(reason),
            (e) => reject(e)
          );
        });
      }
    );
  };

  static All = (promises: MyPromise[]) => {
    return new MyPromise((resolve, reject) => {
      const results: any[] = [];
      let resolvedCount = 0;
      promises.forEach((promise, index) => {
        promise.then(
          (value) => {
            results[index] = value;
            resolvedCount++;
            if (resolvedCount === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  };
}

Function.prototype.myBind = function (ctx: any, ...args: any[]) {
  return function (...args2: any[]) {
    ctx.__fn = this;
    const result = ctx.__fn(...args, ...args2);
    delete ctx.__fn;
    return result;
  };
};

const debounce = (fn: (...args: any[]) => void, delay: number) => {
  let timer: any = null;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const throttle = (fn: (...args: any[]) => void, delay: number) => {
  let timer: any = null;
  let lastTime = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastTime < delay) {
      return;
    }
    lastTime = now;
    fn(...args);
  };
};
