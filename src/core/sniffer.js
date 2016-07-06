/*

const isSafari = S.Sniffer.isSafari
const version = S.Sniffer.version
const isTouch = S.Sniffer.isTouch

*/

const Sniffer = class {

    constructor () {
        this.uA = navigator.userAgent.toLowerCase()
    }

    get isFirefox () {
        return this.uA.indexOf('firefox') > -1
    }

    get safari () {
        return this.uA.match(/version\/[\d\.]+.*safari/)
    }

    get isSafari () {
        return !!this.safari
    }

    get version () {
        if (this.isSafari) {
            const versionWithVersion = this.safari[0].match(/version\/\d{1,2}/)
            return +versionWithVersion[0].split('/')[1]
        } else {
            // TODO : others
            return false
        }
    }

    get isTouch () {
        return 'ontouchend' in window
    }

}

S.Sniffer = new Sniffer()
