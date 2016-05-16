/*

S.Listen(element, 'add', 'click', callback)

S.Listen(document, 'remove', 'touchmove', callback)

*/

S.Listen = (element, action, type, callback) => {
    const doc = document
    let listenType

    if (type === 'mouseWheel') {
        listenType = 'onwheel' in doc ? 'wheel' : doc.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll'
    } else if (type === 'focusOut') {
        listenType = S.Detect.isFirefox ? 'blur' : 'focusout'
    } else {
        listenType = type
    }

    element[action + 'EventListener'](listenType, callback)
}
