/*

►►►  during   →   Elements needs to move during scroll (ex: my portfolio)

const options = {
    totalHeight: element.offsetHeight,
    during: SideScroll,
    callback: afterTop
}
S.ScrollToTop(options)

*/

S.ScrollToTop = options => {
    const opts            = options
    const defaultScrolled = S.Detect.defaultScrolled()
    const currentPosition = defaultScrolled.scrollTop
    const scrollToOptions = {
        destination: 0,
        duration: getDuration(),
        easing: getEasing(),
        during: opts.during,
        callback: opts.callback
    }

    S.ScrollTo(scrollToOptions)

    function getEasing () {
        switch (true) {
            case (currentPosition === 0):
                return 'Power1InOut'
            case (currentPosition <= 600):
                return 'Power1InOut'
            default:
                return 'ExpoInOut'
        }
    }

    function getDuration () {
        const coeff     = currentPosition / opts.totalHeight
        const coeffEasing = (-Math.pow(2, -10 * coeff) + 1)

        switch (true) {
            case (currentPosition === 0):
                return 0
            case (currentPosition > 0 && currentPosition <= 200):
                return 300
            case (currentPosition > 200 && currentPosition <= 400):
                return 500
            case (currentPosition > 400 && currentPosition <= 600):
                return 700
            default:
                return coeffEasing * 1500
        }
    }
}
