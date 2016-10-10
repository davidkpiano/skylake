/*

►►►  Scroll top when refresh browser

S.TopWhenRefresh()

*/

S.TopWhenRefresh = function () {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0)
    }
}
