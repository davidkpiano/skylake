/*

const isSafari = S.Browser.isSafari
const version = S.Browser.version

*/

const Browser = class {

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

    get version () {
        if (this.isSafari) {
            const fullVersion = this.safari()[0].match(/\d{1,2}\.\d{1,2}\.\d{1,2}/)
            return +fullVersion[0].split('.')[0]
        } else {
            // TODO : others
            return false
        }
    }

}

S.Browser = new Browser()
