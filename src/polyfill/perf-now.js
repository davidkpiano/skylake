/*

S.Polyfill.perfNow()

*/

S.Polyfill.perfNow = () => {
    if (!('performance' in window)) {
        window.performance = {}
    }

    if (!('now' in window.performance)) {
        let nowOffset = Date.now()

        window.performance.now = function now () {
            return Date.now() - nowOffset
        }
    }
}
