/*

const Scroll = new S.Scroll({
    callback: callback,
    throttle: {
        delay: 100,
        endOnly: true
    }
})

Scroll.on()
Scroll.off()

function callback (currentScrollY, delta) {

}

*/

S.Scroll = class {

    constructor (options) {
        this.opts = options
        this.defaultScrolled = S.Detect.defaultScrolled()

        S.BindMaker(this, ['getThrottle', 'getRAF', 'run'])

        this.throttle = new S.Throttle({
            callback: this.getRAF,
            delay: this.opts.throttle.delay,
            endOnly: this.opts.throttle.endOnly
        })
        this.rafTicking = new S.RafTicking()
    }

    on () {
        this.startScrollY = this.defaultScrolled.scrollTop

        this.listeners('add')
    }

    off () {
        this.listeners('remove')
    }

    listeners (action) {
        S.Listen(window, action, 'scroll', this.getThrottle)
    }

    getThrottle () {
        this.throttle.init()
    }

    getRAF () {
        this.rafTicking.start(this.run)
    }

    run () {
        const currentScrollY = this.defaultScrolled.scrollTop
        const delta          = -(currentScrollY - this.startScrollY)

        // Reset start scroll y
        this.startScrollY = currentScrollY

        this.opts.callback(currentScrollY, delta)
    }

}
