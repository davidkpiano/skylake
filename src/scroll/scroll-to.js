/*

►►►  during   →   Elements needs to move during scroll

const options = {
    destination: 1000,
    duration: 200,
    easing: 'Power3Out',
    during: SideScroll,
    callback: afterTop
}

S.ScrollTo(options)

*/

S.ScrollTo = options => {
    const opts            = options
    const scrollable      = S.Scrollable
    const initialPosition = scrollable.scrollTop
    const animation       = new S.Merom(scrollable, 'scrollTop', initialPosition, opts.destination, opts.duration, opts.easing, {callback: getCallback, during: opts.during})

    if (opts.destination === initialPosition) {
        getCallback()
    } else {
        S.WTDisable.on()
        animation.play()
    }

    function getCallback () {
        S.WTDisable.off()

        if (opts.callback) {
            opts.callback()
        }
    }
}
