var Action = /** @class */ (function () {
    function Action() {
    }
    Action.prototype.getData = function () {
        return new Promise(function (resolve, reject) {
            resolve("1");
            reject("2");
        });
    };
    return Action;
}());
setTimeout(function () { console.log("定时器"); });
new Action().getData().then(function (data) { console.log(data); }).catch(function (err) { console.log(err); });
console.log("我是之后的代码");
function f() {
    console.log("我是函数调用");
}
f();
console.log("how handler messy code");
//# sourceMappingURL=Promise_use.js.map