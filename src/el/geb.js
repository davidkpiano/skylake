/*

const content = S.Geb.id('content')
const btn     = S.Geb.class('btn')
const span    = S.Geb.tag('span')

*/

S.Geb = (function () {
    var doc = document

    var id = function (elementName) {
        return doc.getElementById(elementName)
    }

    var class = function (elementName) {
        return doc.getElementsByClassName(elementName)
    }

    var tag = function (elementName) {
        return doc.getElementsByTagName(elementName)
    }

    return {
        id: id,
        class: class,
        tag: tag
    }
}())
