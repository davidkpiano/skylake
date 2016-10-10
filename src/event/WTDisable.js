/*

S.WTDisable.on()
S.WTDisable.off()

*/

S.WTDisable = (function () {
    var on = function () {
        listeners('add')
    }

    var off = function () {
        listeners('remove')
    }

    function listeners (action) {
        var isTouch = S.Sniffer.isTouch
        var doc     = document

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
