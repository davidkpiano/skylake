/*

S.OnPopstate()

*/

S.OnPopstate = function () {
    var blockPopstateEvent = document.readyState !== 'complete'

    S.Listen(window, 'add', 'load', load)
    S.Listen(window, 'add', 'popstate', popstate)

    function load () {
        S.Delay(function () {
            blockPopstateEvent = false
        }, 0)
    }

    function popstate (event) {
        if (blockPopstateEvent && document.readyState === 'complete') {
            event.preventDefault()
            event.stopImmediatePropagation()
        }
    }

    window.onpopstate = function () {
        window.location.href = S.Win.path
    }
}
