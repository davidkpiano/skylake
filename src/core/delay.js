/*

S.Delay(callback, delay)

*/

S.Delay = function (callback, delay) {
    window.setTimeout(function () {
        callback()
    }, delay)
}
