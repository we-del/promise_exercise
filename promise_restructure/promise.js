"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPromise = void 0;
var CustomPromise = /** @class */ (function () {
    function CustomPromise(fn) {
        this.curState = "pending";
        this.value = null;
        this.reason = null;
        var _this = this;
        /*
        *  因为js特有 箭头函数this会指向外层的包裹对象，
        * 因此如果在创建实例对象时，使用箭头函数则需要保存一下this指向(因为其this会指向外层)
        * 在完成创建实例对象后，则不需要保存this,因为方法调用的this指向的是调用者
        * */
        // resolve状态
        function resolve(value) {
            if (_this.curState == "pending") {
                _this.curState = "fulfill";
                _this.value = value;
            }
        }
        // reject状态
        function reject(reason) {
            if (_this.curState == "pending") {
                _this.curState = "rejected";
                _this.reason = reason;
            }
        }
        fn(resolve, reject);
    }
    // 写两个静态的方法
    // 返回一个resolve的回调
    CustomPromise.resolve = function (value) {
        return new CustomPromise(function (resolve, reject) {
            resolve(value);
        });
    };
    // 返回一个reject的回调
    CustomPromise.reject = function (value) {
        return new CustomPromise(function (resolve, reject) {
            reject(value);
        });
    };
    /**
     *  @description 此函数用来保证多个promise保证同一状态
     *      ，如果全为fulfill则返回全部promise对象，有一个rejected状态的promise则返回该promise对象
     *
     * @param arr 用来存储传入的所有数据
     * */
    CustomPromise.all = function (arr) {
        var success = new Array(arr.length);
        var _loop_1 = function (ele) {
            if (ele.curState == "rejected") { // 遍历到一个rejected状态的promise立刻返回
                return { value: new CustomPromise(function (resolve, reject) {
                        reject(ele.reason);
                    }) };
            }
            success.push(ele.value);
        };
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var ele = arr_1[_i];
            var state_1 = _loop_1(ele);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return new CustomPromise(function (resolve, reject) {
            resolve(success);
        });
    };
    /*
    *  then 和 catch方法都需要对当前的状态进行判断，才能调用对于的函数
    *
    * */
    CustomPromise.prototype.then = function (fn1, fn2) {
        if (fn1 === void 0) { fn1 = null; }
        if (fn2 === void 0) { fn2 = null; }
        /**
         *  当一次then完毕后 需要对返回值做判断，如果为 null 说明可以传递一个相同状态的为null的promise对象
         *  如果又返回值需要对其类型做判断，如果是异常则需要调用Reject,。。。
         *
         * */
        if (this.curState == "fulfill" && fn1 != null) {
            // 没有返回值 则抛出一个相同状态但值为null的Promise对象
            var successValue = null;
            try {
                successValue = fn1(this.value); // 没写返回值默认返回null
            }
            catch (e) {
                // 出现的错误 要么是 Error类型的 有么就是直接throw 的
                // Error类型需要使用 e.message 拿到错误信息
                // throw 抛出的错误则可以直接打印
                if (e instanceof Error) {
                    return CustomPromise.reject(e.message);
                }
                else {
                    return CustomPromise.reject(e);
                }
            }
            if (successValue == null) { // 如果没有返回值
                return CustomPromise.resolve(undefined);
            }
            else if (successValue instanceof CustomPromise) { // 如果抛出的是一个Promise
                return successValue;
            }
            else {
                return CustomPromise.resolve(successValue);
            }
        }
        else if (this.curState == "rejected" && fn2 != null) {
            // 如果当前是rejected状态则执行第二个函数
            var failValue = null;
            try {
                failValue = fn2(this.value); // 没写返回值默认返回null
            }
            catch (e) {
                if (e instanceof Error) {
                    return CustomPromise.reject(e.message);
                }
                else {
                    return CustomPromise.reject(e);
                }
            }
            if (failValue == null) { // 如果没有返回值
                return CustomPromise.reject(undefined);
            }
            else if (failValue instanceof CustomPromise) {
                return failValue;
            }
            else {
                return CustomPromise.reject(failValue);
            }
        }
        // 如果这个值没有被处理则照常返回 (把当前this抛出即可)
        if (this instanceof CustomPromise) {
            return this;
        }
    };
    CustomPromise.prototype.catch = function (fn1) {
        if (fn1 === void 0) { fn1 = null; }
        if (this.curState == "rejected" && fn1 != null) {
            var returnValue = null;
            try {
                returnValue = fn1(this.reason);
            }
            catch (e) {
                if (e instanceof Error) {
                    return CustomPromise.reject(e.message);
                }
                else {
                    return CustomPromise.reject(e);
                }
            }
            if (returnValue == null) { // 如果没有返回值
                return CustomPromise.reject(undefined);
            }
            else if (returnValue instanceof CustomPromise) {
                return returnValue;
            }
            else {
                return CustomPromise.reject(returnValue);
            }
        }
        if (this instanceof CustomPromise) {
            return this;
        }
    };
    return CustomPromise;
}());
exports.CustomPromise = CustomPromise;
var p1 = new CustomPromise(function (resolve, reject) {
    reject(1);
});
var p2 = new CustomPromise(function (resolve, reject) {
    resolve(1);
});
var p3 = new CustomPromise(function (resolve, reject) {
    resolve(1);
});
p1.then(function (value) { return console.log(value); });
var all = CustomPromise.all([p1, p2, p3]);
console.log(all);
//# sourceMappingURL=promise.js.map