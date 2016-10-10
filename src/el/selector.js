/*

const el   = S.Selector.el(selector)
const type = S.Selector.type(selector)
const name = S.Selector.name(selector)

*/

S.Selector = (function () {
    var el = function (selector) {
        var el = []
        if (S.Is.string(selector)) {
            const elementName = selector.substring(1)
            if (selector.charAt(0) === '#') {
                el[0] = S.Geb.id(elementName)
            } else {
                el = S.Geb.class(elementName)
            }
        } else {
            el[0] = selector
        }
        return el
    }

    var type = function (selector) {
        if (selector.charAt(0) === '#') {
            return 'id'
        } else {
            return 'class'
        }
    }

    var name = function (selector) {
        return selector.substring(1)
    }

    return {
        el: el,
        type: type,
        name: name
    }
}())
