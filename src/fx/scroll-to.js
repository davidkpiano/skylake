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
    // const isFirefox = navigator.userAgent.indexOf('Firefox') > -1
    // let debug
    // if(isFirefox && document.documentElement.scrollTop === 0) {
    //     document.documentElement.scrollTop = 1;
    //     debug = true;
    // }
    // this.defaultScrolled = document.documentElement.scrollTop ? document.documentElement : document.body;
    // if(debug) {
    //     document.documentElement.scrollTop = 0;
    // }

    const opts            = options
    const defaultScrolled = S.Detect.defaultScrolled()
    const initialPosition = defaultScrolled.scrollTop
    const animate         = new S.Animate({
        element: defaultScrolled,
        parameter: 'scrollTop',
        start: initialPosition,
        end: opts.destination,
        easing: opts.easing,
        duration: opts.duration,
        during: opts.during,
        callback: getCallback
    })

    if (opts.destination === initialPosition) {
        getCallback()
    } else {
        S.WTDisable.on()
        animate.init()
    }

    function getCallback () {
        S.WTDisable.off()

        if (opts.callback) {
            opts.callback()
        }
    }
}
