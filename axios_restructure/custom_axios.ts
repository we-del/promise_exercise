/**
 * @description: 使用类封装一个 axios的 get 和 post 请求
 * @tips: option 是一个对象 包含 url ,method ,params信息(携带的参数)
 * */
class Axios {
    constructor(obj: any) {
        this.sendReq(obj);
    }

    private sendReq(obj: any) {
        let xml = new XMLHttpRequest();
        let {url, params, method} = obj;
        // 监听成功对象
        xml.onreadystatechange = () => {
            if (xml.status == 200 && xml.readyState == 4) {
                return Promise.resolve(xml.response);
            }
        }
        // 监听错误对象
        xml.onerror = (e) => {
            return Promise.resolve(e);
        }
        xml.open(method, url);
        let data = "";
        for (const k in params) {
            data += k + "=" + params[k] + "&";
        }
    }
}