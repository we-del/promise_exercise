class MyPromise {
    // excutor执行器，就是我们new的时候传进来的函数
    constructor(excutor){
        // 实例状态
        this.status = 'pending';
        // 成功状态事件池
        this.fulfilledCallbacks = [];
        // 失败状态事件池
        this.rejectedCallbacks = [];
        // 记录执行resolve和reject时的参数
        this.value = undefined;

        let resolve = (result) => {
            // 如果不是pending那么状态就已经凝固，不能更改
            if(this.status === 'pending'){
                this.status = 'resolved';
                this.value = result;
                // 为了避免还没有执行then，成功状态事件池还没添加这里就同步执行了，因为foreach是一个同步方法
                // 所以需要把循环事件池处理成异步的，考虑到then也是异步的，所以不仅要将这里处理成异步的，还要
                // 要求这里的异步在then的异步后面执行，then是微任务，加个定时器让其变成宏任务，就一定时在then
                // 后面被执行
                let time = setTimeout(() => {
                    clearTimeout(time);
                    // 循环执行成功状态事件池中的事件
                    this.fulfilledCallbacks.forEach(item => item(this.value))
                },0)
            }
        };
        let reject = (reason) => {
            if(this.status === 'pending'){
                this.status = 'rejected';
                this.value = reason;
                let time = setTimeout(() => {
                    clearTimeout(time);
                    this.rejectedCallbacks.forEach(item => item(this.value))
                },0)
            }
        };

        try {
            excutor(resolve,reject);
        }catch (e) {
            reject(e);
        }

    }

    // then方法就是重点了，传入两个回调函数，但是并不立即执行，而是等this的status状态发生变化
    // 时在其resolve或者reject方法中执行
    then(onFulfilled,onRejected){
        // 需要链式调用then方法，所以then方法的返回值必须是一个promise的实例，而resolve和reject
        // 两个形参则是用来改变返回的这个promise的状态的，因为下一个then中的回调还挂着返回这个promise
        // 对象的身上，需要通过控制resolve和reject的执行来控制下一个then中执行的方法
        return new MyPromise((resolve,reject) => {
            // 向成功状态事件池添加回调，只添加并没有执行，this指向上一个promise实例，
            // 什么时候执行？在调用this的resolve方法时被执行，result就是传进来的this.value
            this.fulfilledCallbacks.push((result) => {
                // 如果then中的方法执行时报错，直接执行返回的promise的reject方法触发下一个then的失败回调执行
                try {
                    // onFulfilled是什么？是then中的第一个方法，result是上一个promise对象传过来的参数
                    // onFulfilled(result)执行的返回值如果是一个普通值，就通知下一个then中的成功回调执行
                    // 这个普通值作为参数传进去
                    let x = onFulfilled(result);
                    x instanceof MyPromise
                        // 如果返回的是一个promise对象，那就需要用返回的promise对象的状态来控制本次返回的promise
                        // 对象的状态以达到控制下一个then中哪个回调的执行，这里很妙的用了then方法，x是then中回调返
                        // 回的promise对象，resolve和reject两个实参则是控制当前返回peomise对象状态的方法，这样如
                        // 果then回调返回的promise状态时resolve就会执行当前返回promise对象的resolve以触发下
                        // 一个then中的成功回调的执行，如果then中回调的状态为reject就会执行传进去的reject也就
                        // 是控制当前返回promise对象状态的reject，就可以触发下一个then中的失败回调的执行
                        ? x.then(resolve,reject)
                        : resolve(x);
                }catch (e) {
                    reject(e);
                }
            })
            // 向失败状态事件池添加回调，原理与成功事件池添加一样
            this.rejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    x instanceof MyPromise
                        ? x.then(resolve,reject)
                        : resolve(x)
                }catch (e) {
                    reject(e);
                }
            })
        })
    }

}






// 测试代码
new MyPromise((resolve,reject) => {
    console.log(1);
    reject();
}).then((res) => {
    console.log(2);
},(err) => {
    console.log(3);
}).then((res) => {
    console.log(4);
},(err) => {
    console.log(5);
});