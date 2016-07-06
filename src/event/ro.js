/*

const RO = new S.RO({
    callback: callback,
    throttle: {
        delay: 100,
        endOnly: true
    }
})

RO.on()
RO.off()

*/

S.RO = class {

    constructor (options) {
        this.opts = options
        this.isTouch = S.Sniffer.isTouch

        S.BindMaker(this, ['getThrottle', 'getRAF'])

        this.throttle = new S.Throttle({
            callback: this.getRAF,
            delay: this.opts.throttle.delay,
            endOnly: this.opts.throttle.endOnly
        })
        this.rafTicking = new S.RafTicking()
    }

    on () {
        this.listeners('add')
    }

    off () {
        this.listeners('remove')
    }

    listeners (action) {
        if (this.isTouch) {
            S.Listen(window, action, 'orientationchange', this.getThrottle)
        } else {
            S.Listen(window, action, 'resize', this.getThrottle)
        }
    }

    getThrottle () {
        this.throttle.init()
    }

    getRAF () {
        this.rafTicking.start(this.opts.callback)
    }

}
