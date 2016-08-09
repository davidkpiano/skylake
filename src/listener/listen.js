/*

S.Listen(element, 'add', 'click', callback)

S.Listen(document, 'remove', 'touchmove', callback)

*/

S.Listen = (element, action, type, callback) => {
    const doc = document
    const el  = S.Selector.el(element)
    const elL = el.length
    let listenType

    if (type === 'mouseWheel') {
        listenType = 'onwheel' in doc ? 'wheel' : doc.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll'
    } else if (type === 'focusOut') {
        listenType = S.Sniffer.isFirefox ? 'blur' : 'focusout'
    } else {
        listenType = type
    }

    for (let i = 0; i < elL; i++) {
        el[i][action + 'EventListener'](listenType, callback)
    }
}
