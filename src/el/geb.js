/*

const content = S.Geb.id('content')
const btn     = S.Geb.class('btn')
const span    = S.Geb.tag('span')

*/

S.Geb = (function () {
    const doc = document

    const id = (elementName) => {
        return doc.getElementById(elementName)
    }

    const className = (elementName) => {
        return doc.getElementsByClassName(elementName)
    }

    const tag = (elementName) => {
        return doc.getElementsByTagName(elementName)
    }

    return {
        id: id,
        class: className,
        tag: tag
    }
}())
