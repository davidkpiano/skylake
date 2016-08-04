/*

const el   = S.Selector.el(selector)
const type = S.Selector.type(selector)
const name = S.Selector.name(selector)

*/

const Selector = class {

    el (selector) {
        let el = []
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

    type (selector) {
        if (selector.charAt(0) === '#') {
            return 'id'
        } else {
            return 'class'
        }
    }

    name (selector) {
        return selector.substring(1)
    }

}

S.Selector = new Selector()
