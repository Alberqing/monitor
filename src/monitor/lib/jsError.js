import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

export function injectJsError() {
    // 监听全局未捕获的错误
    window.addEventListener('error', function(event) { // 错误事件对象
        let lastEvent = getLastEvent(); //最后一个交互事件
        // 脚本加载错误
        if(event.target && (event.target.src || event.target.href)) {
            tracker.send({
                kind: "stability", // 监控指标的大类
                type: "error",   // 小类型 错误
                errorType: "resourceError", // js或css加载错误
                filename: event.target.src || event.target.href, //哪个文件报错
                tagName: event.target.tagName,
                selector: getSelector(event.target), // 代表最后操作的元素
            })
        } else {
            tracker.send({
                kind: "stability", // 监控指标的大类
                type: "error",   // 小类型 错误
                errorType: "jsError", // js执行错误
                message: event.message, // 报错信息
                stack: getLines(event.error.stack),
                filename: event.filename, //哪个文件报错
                position: `${event.lineno}:${event.colno}`,
                selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后操作的元素
            })
        }
    }, true)

    window.addEventListener("unhandledrejection", function(event) {
        console.log(event);
        let lastEvent = getLastEvent(); //最后一个交互事件
        let message;
        let filename;
        let line = 0;
        let col = 0;
        let stack = "";
        let reason = event.reason;
        if(typeof reason === "string") {
            message = reason
        } else if(typeof reason === "object") {
            message = reason.message
            if(reason.stack) {
                let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
                filename = matchResult[1];
                line = matchResult[2];
                col = matchResult[3];
            }
            stack = getLines(reason.stack);
        }
        tracker.send({
            kind: "stability", // 监控指标的大类
            type: "error",   // 小类型 错误
            errorType: "promiseError", // js执行错误
            message, // 报错信息
            stack,
            filename, //哪个文件报错
            position: `${line}:${col}`,
            selector: lastEvent ? getSelector(lastEvent.path) : "", // 代表最后操作的元素
        })
    }, true)
 
    function getLines(stack) {
        return stack.split("\n").slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join("^");
    }
}