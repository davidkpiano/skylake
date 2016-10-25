/*

const isSafari = S.Sniffer.isSafari
const version = S.Sniffer.version
const isTouch = S.Sniffer.isTouch

*/

S.Sniffer = {

    uA: navigator.userAgent.toLowerCase(),

    get isFirefox () {
        return this.uA.indexOf('firefox') > -1
    },

    get safari () {
        return this.uA.match(/version\/[\d\.]+.*safari/)
    },

    get isSafari () {
        return !!this.safari
    },

    get isFacebookApp () {
        const ua = navigator.userAgent || navigator.vendor || window.opera
        return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1)
    },

    get version () {
        if (this.isSafari) {
            var versionWithVersion = this.safari[0].match(/version\/\d{1,2}/)
            return +versionWithVersion[0].split('/')[1]
        } else {
            // TODO : others
            return false
        }
    },

    get isTouch () {
        return 'ontouchend' in window
    },

    get isPageError () {
        var meta  = S.Geb.tag('meta')
        var metaL = meta.length
        var hasMetaError = false

        for (var i = 0; i < metaL; i++) {
            if (meta[i].name === 'error') {
                hasMetaError = true
                break
            }
        }

        return hasMetaError
    }
}
