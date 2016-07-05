/*

const content = S.Geb.id('content')
const btn     = S.Geb.class('btn')
const span    = S.Geb.tag('span')

*/

const Geb = class {

    constructor () {
        this.doc = document
    }

    id (elementName) {
        return this.doc.getElementById(elementName)
    }

    class (elementName) {
        return this.doc.getElementsByClassName(elementName)
    }

    tag (elementName) {
        return this.doc.getElementsByTagName(elementName)
    }

}

S.Geb = new Geb()
