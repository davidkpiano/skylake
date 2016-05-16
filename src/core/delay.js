/*

S.Delay(callback, delay)

*/

S.Delay = (callback, delay) => {
    window.setTimeout(() => {
        callback()
    }, delay)
}
