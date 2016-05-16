/*

const animate = new S.Animate({
    element: myElement,
    parameter: 'x',
    start: myCurrentElementPosition,
    end: 100,
    easing: 'Power4InOut',
    duration: 500,
    during: false,    // Example : elements needs to move during scroll
    callback: false
})

animate.init()

*/

S.Animate = class {

    constructor (options) {
        this.opts = options
        this.distance = this.opts.end - this.opts.start
        this.Easing = S.Easing

        this.raf = new S.RafIndex()

        switch (this.opts.parameter) {
            case 'x':
            case 'y':
                this.getUpdate = this.attributUpdate
                break
            case 'scrollTop':
                this.getUpdate = this.scrollTopUpdate
                break
            default:
                this.getUpdate = this.styleUpdate
        }

        S.BindMaker(this, ['loop'])
    }

    init () {
        this.startTime = S.Win.perfNow()

        this.raf.start(this.loop)
    }

    loop () {
        const currentTime      = S.Win.perfNow()
        const multiplier       = (currentTime - this.startTime) / this.opts.duration
        const multiplierT      = multiplier > 1 ? 1 : multiplier // T → ternary
        const easingMultiplier = this.Easing[this.opts.easing](multiplierT)

        const update = this.opts.start + this.distance * easingMultiplier // Lerp → linear interpolation

        this.getUpdate(update)

        if (multiplierT < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.getUpdate(this.opts.end)
            if (this.opts.callback) {
                this.opts.callback()
            }
        }
    }

    attributUpdate (update) {
        this.opts.element.setAttribute(this.opts.parameter, update)
    }

    scrollTopUpdate (update) {
        this.opts.element[this.opts.parameter] = update

        if (this.opts.during) {
            this.opts.during(update)
        }
    }

    styleUpdate (update) {
        this.opts.element.style[this.opts.parameter] = update
    }
}
