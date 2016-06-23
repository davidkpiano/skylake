/*

const animate1 = new S.Animate({
    element: myElement,
    parameter: 'x',
    start: myCurrentElementPosition,
    end: 100,
    easing: 'Power5Out',
    duration: 500,
    during: true    // Example : elements needs to move during scroll
})
animate1.init()

const animate2 = new S.Animate({
    element: myElement,
    parameter: 'y3d',
    start: 100,
    end: 0,
    pixel: false,
    easing: 'Power4InOut',
    duration: 2000,
    callback: getRAF,
    delay: {
        before: 500,
        after: 600
    }
})
animate2.init()

*/

S.Animate = class {

    constructor (options) {
        this.opts = options
        this.distance = this.opts.end - this.opts.start
        this.Easing = S.Easing
        this.delayBefore = this.opts.delay ? this.opts.delay.before : false
        this.delayAfter = this.opts.delay ? this.opts.delay.after : false

        this.raf = new S.RafIndex()

        switch (this.opts.parameter) {
            case 'x':
            case 'y':
                this.getUpdate = this.attributUpdate
                break
            case 'x3d':
            case 'y3d':
                this.getUpdate = this.translate3dUpdate
                break
            case 'scrollTop':
                this.getUpdate = this.scrollTopUpdate
                break
            default:
                this.getUpdate = this.styleUpdate
        }

        S.BindMaker(this, ['start', 'loop'])
    }

    init () {
        const delay = this.delayBefore ? this.delayBefore : 0
        S.Delay(this.start, delay)
    }

    start () {
        this.startTime = S.Win.perfNow()
        this.raf.start(this.loop)
    }

    loop () {
        const currentTime      = S.Win.perfNow()
        const multiplier       = (currentTime - this.startTime) / this.opts.duration
        const multiplierT      = multiplier > 1 ? 1 : multiplier // T → ternary
        const easingMultiplier = this.Easing[this.opts.easing](multiplierT)
        const update           = this.opts.start + this.distance * easingMultiplier // Lerp → linear interpolation

        this.getUpdate(update)

        if (multiplierT < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.getUpdate(this.opts.end)
            if (this.opts.callback) {
                const delay = this.delayAfter ? this.delayAfter : 0
                S.Delay(this.opts.callback, delay)
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

    translate3dUpdate (update) {
        const value = this.opts.pixel ? update + 'px' : update + '%'
        const translate = this.opts.parameter === 'x3d' ? value + ',0' : '0,' + value
        const translate3d = 'translate3d(' + translate + ',0)'
        const elStyle = this.opts.element.style

        elStyle.webkitTransform = translate3d
        elStyle.transform = translate3d
    }

    styleUpdate (update) {
        this.opts.element.style[this.opts.parameter] = update
    }
}
