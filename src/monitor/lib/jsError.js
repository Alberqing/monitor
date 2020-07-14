import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

export function injectJsError() {
    // 监听全局未捕获的错误
    window.addEventListener('error', function(event) { // 错误事件对象
        let lastEvent = getLastEvent(); //最后一个交互事件
        let log = {
            kind: "stability", // 监控指标的大类
            type: "error",   // 小类型 错误
            errorType: "jsError", // js执行错误
            // url: "", // 访问哪个路径报错了
            message: event.message, // 报错信息
            stack: getLines(event.error.stack),
            filename: event.filename, //哪个文件报错
            position: `${event.lineno}:${event.colno}`,
            selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后操作的元素
        }
        console.log(log, "log");
        tracker.send(log)
    })
 
    function getLines(stack) {
        return stack.split("\n").slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join("^");
    }
}