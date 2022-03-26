// 简单 Promise重新写
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
        if (this.curState == "pending") { // 当前promise没有状态
            return null;
        }
        else if (this.curState == "fulfill" && fn1 != null) {
            // 没有返回值 则抛出一个相同状态但值为null的Promise对象
            var successValue = null;
            try {
                successValue = fn1(this.value); // 没写返回值默认返回null
            }
            catch (e) {
                successValue = fn1(this.value);
                console.log(successValue);
                console.log(e);
            }
            if (successValue == null) { // 如果没有返回值
                return CustomPromise.resolve(undefined);
            }
            else if (successValue instanceof Error) {
                return CustomPromise.reject(successValue.message);
            }
            else {
                return CustomPromise.resolve(successValue);
            }
        }
        else if (this.curState == "rejected" && fn2 != null) {
            // 如果当前是rejected状态则执行第二个函数
            var failValue = fn2(this.value); // 没写返回值默认返回null
            if (failValue == null) { // 如果没有返回值
                return CustomPromise.reject(undefined);
            }
            else if (failValue instanceof Error) {
                return CustomPromise.reject(failValue.message);
            }
            else {
                return CustomPromise.reject(failValue);
            }
        }
        // 如果这个值没有被处理则照常返回 (把当前this抛出即可)
        return this;
    };
    CustomPromise.prototype.catch = function (fn1) {
        if (fn1 === void 0) { fn1 = null; }
        if (this.curState == "rejected" && fn1 != null) {
            var returnValue = fn1(this.reason);
            if (returnValue == null) { // 如果没有返回值
                return CustomPromise.reject(undefined);
            }
            else if (returnValue instanceof Error) {
                return CustomPromise.reject(returnValue.message);
            }
            else {
                return CustomPromise.reject(returnValue);
            }
        }
        return this;
    };
    return CustomPromise;
}());
var cus = new CustomPromise(function (resolve, reject) {
    resolve(1);
    reject(2);
})
    .then(function (value) {
    console.log(value);
    throw new Error("this is error");
})
    .then(function (value) {
    console.log(value);
    throw 2;
})
    .catch(function (reason) { return console.log("failed" + reason); });
//# sourceMappingURL=custom_promise.js.map