/*

S.WTDisable.on()
S.WTDisable.off()

*/

S.WTDisable = (function () {
    const on = _ => {
        listeners('add')
    }

    const off = _ => {
        listeners('remove')
    }

    function listeners (action) {
        const isTouch = S.Sniffer.isTouch
        const doc     = document

        if (isTouch) {
            S.Listen(doc, action, 'touchmove', prevent)
        } else {
            S.Listen(doc, action, 'mouseWheel', prevent)
        }
    }

    function prevent (event) {
        event.preventDefault()
    }

    return {
        on: on,
        off: off
    }
}())
