/*

S.Polyfill.perfNow()

*/

S.Polyfill.perfNow = function () {
    if (!('performance' in window)) {
        window.performance = {}
    }

    if (!('now' in window.performance)) {
        var nowOffset = Date.now()

        window.performance.now = function now () {
            return Date.now() - nowOffset
        }
    }
}
