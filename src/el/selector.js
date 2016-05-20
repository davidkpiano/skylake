/*

const el   = S.Selector.el(selector)
const type = S.Selector.type(selector)
const name = S.Selector.name(selector)

*/

S.Selector = (function () {
    const el = selector => {
        const firstChar = selector.charAt(0)
        const elementName = selector.substring(1)
        let selectorElement

        if (firstChar === '#') {
            selectorElement = S.Geb.id(elementName)
        } else {
            selectorElement = S.Geb.class(elementName)
        }

        return selectorElement
    }

    const type = selector => {
        const firstChar = selector.charAt(0)
        let selectorType

        if (firstChar === '#') {
            selectorType = 'id'
        } else {
            selectorType = 'class'
        }

        return selectorType
    }

    const name = selector => {
        const selectorName = selector.substring(1)

        return selectorName
    }

    return {
        el: el,
        type: type,
        name: name
    }
}())
