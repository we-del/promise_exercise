/**
 * @description: 使用类封装一个 axios的 get 和 post 请求
 * @tips: option 是一个对象 包含 url ,method ,params信息(携带的参数)
 * */
var Axios = /** @class */ (function () {
    function Axios(obj) {
        this.sendReq(obj);
    }
    Axios.prototype.sendReq = function (obj) {
        var xml = new XMLHttpRequest();
        var url = obj.url, params = obj.params, method = obj.method;
        // 监听成功对象
        xml.onreadystatechange = function () {
            if (xml.status == 200 && xml.readyState == 4) {
                return Promise.resolve(xml.response);
            }
        };
        // 监听错误对象
        xml.onerror = function (e) {
            return Promise.resolve(e);
        };
        xml.open(method, url);
        var data = "";
        for (var k in params) {
            data += k + "=" + params[k] + "&";
        }
    };
    return Axios;
}());
//# sourceMappingURL=custom_axios.js.map