/*

S.Polyfill.raf()

*/

S.Polyfill.raf = function () {
    var lastTime = 0

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currentTime = new Date().getTime()
            var timeToCall = Math.max(0, 16 - (currentTime - lastTime))
            var id = S.Delay(function () {
                callback(currentTime + timeToCall)
            }, timeToCall)
            lastTime = currentTime + timeToCall
            return id
        }
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
}
