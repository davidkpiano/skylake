/*

const el   = S.Selector.el(selector)
const type = S.Selector.type(selector)
const name = S.Selector.name(selector)

*/

const Selector = class {

    el (selector) {
        const elementName = selector.substring(1)
        if (selector.charAt(0) === '#') {
            return S.Geb.id(elementName)
        } else {
            return S.Geb.class(elementName)
        }
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
