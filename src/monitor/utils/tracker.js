let userAgent = require("user-agent");

let host = "cn-beijing.log.aliyuncs.com";
let project = "zyq-monitor";
let logStore = "zyq-monitor-storage";

function getExtraData() {
    return {
        title: document.title,
        url: location.url,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent),
    }
}

class SendTracker {
    constructor() {
        this.url = `http://${project}.${host}/logstores/${logStore}/track`;  // 上报路径
        this.xhr = new XMLHttpRequest;
    }
    send(data = {}) {
        let extraData = getExtraData();
        let log = {...extraData, ...data};
        for(let key in log) {
            if(typeof log[key] === "number") {
                log[key] = `${log[key]}`;
            }
        }
        console.log(log);
        this.xhr.open("POST", this.url, true)
        let body = JSON.stringify(log);
        this.xhr.setRequestHeader("Content-Type", "application/json");
        this.xhr.setRequestHeader("x-log-apiversion", "0.6.0");
        this.xhr.setRequestHeader("x-log-bodyrawsize", body.length);  // 请求体大小
        this.xhr.onload = function() {
            console.log(this.xhr.response);
        }
        this.xhr.onerror = function(error) {
            console.log(error);
        }
        this.xhr.send(body);
    }
}

export default new SendTracker()