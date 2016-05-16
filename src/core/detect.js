/*

const isTouch         = S.Detect.isTouch
const defaultScrolled = S.Detect.defaultScrolled()

*/

S.Detect = {
    isTouch: 'ontouchend' in window,
    isFirefox: navigator.userAgent.indexOf('Firefox') > -1,
    isSafari: navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS'),
    defaultScrolled: function () {
        const dScrolled = this.isFirefox ? document.documentElement : S.Dom.body
        return dScrolled
    }
}
