let axios = require("axios");
axios.defaults.baseURL = "http://127.0.0.1:9999";
axios.post("/login", {
    user: "aa",
    pwd: 123
}).then(value => console.log(value.data));
//
axios.get("/index", {params: {name: "ww"}}).then(value => console.log(value.data),
    reason => console.log(reason));
axios.get("http://127.0.0.1:8888",{params:{name:"zs"}}).then(value => console.log(value.data))

