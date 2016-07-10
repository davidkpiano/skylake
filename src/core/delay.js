/*

S.Delay(callback, delay)

*/

S.Delay = (callback, delay) => {
    window.setTimeout(_ => {
        callback()
    }, delay)
}
