/*

const isSafari = S.Detect.isSafari
const version = S.Detect.browserVersion
const isTouch = S.Detect.isTouch
const isString = S.Detect.isString(varToCheck)
const scrollable = S.Detect.scrollable

*/

const Detect = class {

    constructor () {
        this.uA = navigator.userAgent.toLowerCase()
    }

    get isFirefox () {
        return this.uA.indexOf('firefox') > -1
    }

    safari () {
        return this.uA.match(/version\/[\d\.]+.*safari/)
    }

    get isSafari () {
        return !!this.safari()
    }

    get browserVersion () {
        if (this.isSafari) {
            const fullVersion = this.safari()[0].match(/\d{1,2}\.\d{1,2}\.\d{1,2}/)
            return +fullVersion[0].split('.')[0]
        } else {
            // TODO : others
            return false
        }
    }

    get isTouch () {
        return 'ontouchend' in window
    }

    get scrollable () {
        return this.firefox ? document.documentElement : S.Dom.body
    }

    isString (varToCheck) {
        return typeof varToCheck === 'string'
    }

/*
    DISABLE → BUG WITH ROLLUP

    isNodeList (nodes) {
        const sdc = Object.prototype.toString.call(nodes)

        return typeof nodes === 'object' &&
            /^\[object (HTMLCollection|NodeList|Object)]$/.test(sdc) &&
            (typeof nodes.length === 'number') &&
            (nodes.length === 0 || (typeof nodes[0] === 'object' && nodes[0].nodeType > 0))
    }
*/

}

S.Detect = new Detect()
