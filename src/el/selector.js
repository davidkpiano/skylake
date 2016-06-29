/*

const el   = S.Selector.el(selector)
const type = S.Selector.type(selector)
const name = S.Selector.name(selector)

*/

S.Selector = (function () {
    const el = selector => {
        const firstChar = selector.charAt(0)
        const elementName = selector.substring(1)

        if (firstChar === '#') {
            return S.Geb.id(elementName)
        } else {
            return S.Geb.class(elementName)
        }
    }

    const type = selector => {
        const firstChar = selector.charAt(0)

        if (firstChar === '#') {
            return 'id'
        } else {
            return 'class'
        }
    }

    const name = selector => {
        return selector.substring(1)
    }

    return {
        el: el,
        type: type,
        name: name
    }
}())
