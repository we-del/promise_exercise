/*
*  node环境下不能发送ajax请求？
*  */
let xhl = new XMLHttpRequest();
xhl.onreadystatechange = ()=>{
    if(xhl.status == 200 && xhl.readyState == 4){
        console.log(xhl.response);
    }
}
xhl.open("get","hppt:127.0.0.1");
xhl.send();