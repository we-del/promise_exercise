var axios = require("axios");
axios.defaults.baseURL = "http://127.0.0.1:9999";
axios.post("/login", {
    user: "aa",
    pwd: 123
}).then(function (value) { return console.log(value.data); });
//
axios.get("/index", { params: { name: "ww" } }).then(function (value) { return console.log(value.data); }, function (reason) { return console.log(reason); });
axios.get("http://127.0.0.1:8888", { params: { name: "zs" } }).then(function (value) { return console.log(value.data); });
//# sourceMappingURL=axios.js.map