//import {CustomPromise} from "./custom_promise";
let {CustomPromise} = require("./custom_promise");
console.log(CustomPromise);
let p = new CustomPromise((resolve,reject)=>{
    let i = 1;
    resolve("2");
    reject("1");
});
let ep =p.then(value=> console.log(value)).then(
    value=>{
        console.log(value);
        return new CustomPromise((resolve,reject)=>{
            throw 1;
        });
    }
);
console.log(ep);
