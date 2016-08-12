/*

S.DDDisable.on()
S.DDDisable.off()

*/

S.DDDisable = (function () {
    const on = _ => {
        listener('add')
    }

    const off = _ => {
        listener('remove')
    }

    function listener (action) {
        S.Listen(document, action, 'dragstart', disable)
    }

    function disable () {
        return false
    }

    return {
        on: on,
        off: off
    }
}())
