/*

const scroll = new S.Scroll({
    throttle: {
        delay: 100,
        atEnd: true
    },
    callback: callback
})

scroll.on()
scroll.off()

function callback (currentScrollY, delta) {

}

*/

S.Scroll = function (options) {
    this.opts = options
    this.scrollable = S.Scrollable

    S.BindMaker(this, ['getThrottle', 'getRAF', 'run'])

    this.throttle = new S.Throttle({
        callback: this.getRAF,
        delay: this.opts.throttle.delay,
        atEnd: this.opts.throttle.atEnd
    })
    this.rafTicking = new S.RafTicking()
}

S.Scroll.prototype = {

    on: function () {
        this.startScrollY = this.scrollable.scrollTop

        this.listeners('add')
    },

    off: function () {
        this.listeners('remove')
    },

    listeners: function (action) {
        S.Listen(window, action, 'scroll', this.getThrottle)
    },

    getThrottle: function () {
        this.throttle.init()
    },

    getRAF: function () {
        this.rafTicking.start(this.run)
    },

    run: function () {
        var currentScrollY = this.scrollable.scrollTop
        var delta          = -(currentScrollY - this.startScrollY)

        // Reset start scroll y
        this.startScrollY = currentScrollY

        this.opts.callback(currentScrollY, delta)
    }

}
