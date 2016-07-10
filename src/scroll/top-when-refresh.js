/*

►►►  Scroll top when refresh browser

S.TopWhenRefresh()

*/

S.TopWhenRefresh = _ => {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0)
    }
}
