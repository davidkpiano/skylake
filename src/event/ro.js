/*

const RO = new S.RO({
    throttle: {
        delay: 100,
        atEnd: true
    },
    callback: callback
})

RO.on()
RO.off()

*/

S.RO = function (options) {
    this.opts = options
    this.isTouch = S.Sniffer.isTouch

    S.BindMaker(this, ['getThrottle', 'getRAF'])

    this.throttle = new S.Throttle({
        callback: this.getRAF,
        delay: this.opts.throttle.delay,
        atEnd: this.opts.throttle.atEnd
    })
    this.rafTicking = new S.RafTicking()
}

S.RO.prototype = {

    on: function () {
        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    },

    listeners: function (action) {
        if (this.isTouch) {
            S.Listen(window, action, 'orientationchange', this.getThrottle)
        } else {
            S.Listen(window, action, 'resize', this.getThrottle)
        }
    },

    getThrottle: function () {
        this.throttle.init()
    },

    getRAF: function () {
        this.rafTicking.start(this.opts.callback)
    }

}
