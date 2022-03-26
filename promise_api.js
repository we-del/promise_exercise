var p1 = new Promise(function (resolve, reject) {
    resolve(1);
    reject(1);
});
var p2 = new Promise(function (resolve, reject) {
    resolve(2);
    reject(2);
});
var p3 = new Promise(function (resolve, reject) {
    reject(3);
});
p3.then(function (value) { console.log(value); }).then(function (value) { }).catch(function (reason) { return console.log(reason); });
//  then()调用完毕后会返回一个当前状态相同的promise对象到该行，其值如果没有被该方法处理则会原样返回
//  如果被处理则其值依赖于该then的返回值，如果没指定默认为undefined
// let tmp = p2.then(value=>console.log(value),reason => console.log(reason));
// tmp.then(value => console.log("fulfill"+value),reason => {console.log("rejected"+reason);}); // 调用成功回调结果为undefined
// p2.then(value=>console.log(value),reason => console.log(reason));
// let all =Promise.all([p1,p2,p3]);
// console.log(all.then(value=> console.log(value)));
//
//
// new Promise((resolve, reject) => {
//   resolve(1)
// }).then(
//     value => {
//       console.log('onResolve', value)
//      // return Promise.resolve(4)  // 当返回Promise.resolve执行value函数值为4
//      // 当返回Promise.reject时执行reason函数，当返回throw 3时执行reason函数，当返回单数字时执行value函数
//     },
//     reason => console.log('onReject', reason)
// ).then(
//     value => console.log('onResolve', value),
//     reason => console.log('onRejct', reason)
// ).then(
//     value => console.log('onResolve', value),
//     reason => console.log('onRejct', reason)
// )
//# sourceMappingURL=promise_api.js.map