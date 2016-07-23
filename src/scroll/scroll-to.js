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
    const animate         = new S.Animate(scrollable, 'scrollTop', initialPosition, opts.destination, opts.easing, opts.duration, {callback: getCallback, during: opts.during})

    if (opts.destination === initialPosition) {
        getCallback()
    } else {
        S.WTDisable.on()
        animate.go()
    }

    function getCallback () {
        S.WTDisable.off()

        if (opts.callback) {
            opts.callback()
        }
    }
}
