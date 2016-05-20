/*

S.Polyfill.raf()

*/

S.Polyfill.raf = () => {
    let lastTime = 0

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            let currentTime = new Date().getTime()
            let timeToCall = Math.max(0, 16 - (currentTime - lastTime))
            let id = S.Delay(() => {
                callback(currentTime + timeToCall)
            }, timeToCall)
            lastTime = currentTime + timeToCall
            return id
        }
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = id => {
            clearTimeout(id)
        }
    }
}
