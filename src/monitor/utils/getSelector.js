function getSelectors(path) {
    return path.reverse().filter(element => {
        return element !== document && element !== window;
    }).map(element => {
        let selector = "";
        if(element.id) {
            return `${element.tagName.toLowerCase()}#${element.id}`
        } else if(element.className && typeof element.className === "string") {
            return `${element.tagName.toLowerCase()}#${element.className}`
        } else {
            selector = element.nodeName.toLowerCase();
        }
        return selector;
    }).join(" ");
}

export default function(pathOrTarget) {  // 对象or数组
    if(Array.isArray(pathOrTarget)) {
        return getSelectors(pathOrTarget)
    } else {
        let path = [];
        while(pathOrTarget) {
            path.push(pathOrTarget);
            pathOrTarget = pathOrTarget.parentNode;
        }
        return getSelectors(path)
    }
}