/*

S.OnPopstate()

*/

S.OnPopstate = () => {
    let blockPopstateEvent = document.readyState !== 'complete'

    S.Listen(window, 'add', 'load', load)
    S.Listen(window, 'add', 'popstate', popstate)

    function load () {
        S.Delay(() => {
            blockPopstateEvent = false
        }, 0)
    }

    function popstate (event) {
        if (blockPopstateEvent && document.readyState === 'complete') {
            event.preventDefault()
            event.stopImmediatePropagation()
        }
    }

    window.onpopstate = () => {
        window.location.href = S.Win.path
    }
}
