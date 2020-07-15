import tracker from '../utils/tracker';
import onload from '../utils/onload';

export function timing() {
    onload(function() {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                requestStart,
                requestEnd,
                responseStart,
                responseEnd,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart,
            } = performance.timing

            tracker.send({
                kind: "experience",  // 用户体验指标
                type: "timing",    // 统计每个阶段的时间
                connectTiming: connectEnd - connectStart,  // 连接时间
                ttfbTime: responseStart - requestStart,    // 首字节时间
                responseTime: responseEnd - responseStart,  // 响应读取时间
                parseDOMTime: loadEventStart - domLoading,  // dom解析时间
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
                timeToInteractive: domInteractive - fetchStart,  // 首次可交互时间
                loadTime: loadEventStart - fetchStart,   // 完整加载时间


            })
        }, 3000)
    })
}