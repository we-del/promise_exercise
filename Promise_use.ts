class Action{

    public constructor() {
    }

    public getData():Promise<any>{
        return new Promise((resolve,reject)=>{
            resolve("1");
            reject("2");
        });
    }
}
setTimeout(()=>{console.log("定时器");})
new Action().getData().then((data)=>{console.log(data)}).catch((err)=>{console.log(err);});
console.log("我是之后的代码");
function f() {
    console.log("我是函数调用");
}
f();
console.log("how handler messy code");
