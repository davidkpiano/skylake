/*

S.WTDisable.on()
S.WTDisable.off()

*/

S.WTDisable = (function () {
    const on = () => {
        listeners('add')
    }

    const off = () => {
        listeners('remove')
    }

    function listeners (action) {
        const isTouch = S.Is.touch
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
