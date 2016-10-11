/*

const WT = new S.WT(callback)

WT.on()
WT.off()

function callback (delta, type, event) {

}

type → 'scroll' or 'touch'

*/

S.WT = function (callback) {
    this.callback = callback
    this.isTouch = S.Sniffer.isTouch

    this.rafTicking = new S.RafTicking()

    S.BindMaker(this, ['getRAF', 'run', 'touchStart', 'touchMove'])
}

S.WT.prototype = {

    on: function () {
        S.WTDisable.off()
        this.listeners('add')
    },

    off: function () {
        S.WTDisable.on()
        this.listeners('remove')
    },

    listeners: function (action) {
        var doc = document
        if (this.isTouch) {
            S.Listen(doc, action, 'touchstart', this.touchStart)
            S.Listen(doc, action, 'touchmove', this.touchMove)
        } else {
            S.Listen(doc, action, 'mouseWheel', this.getRAF)
        }
    },

    getRAF: function (event) {
        event.preventDefault()

        this.listeners('remove')

        this.event = event

        this.rafTicking.start(this.run)
    },

    run: function () {
        const eventType = this.event.type

        if (eventType === 'wheel') {
            this.onWheel()
        } else if (eventType === 'mousewheel') {
            this.onMouseWheel()
        }
    },

    onWheel: function () {
        this.type = 'scroll'
        this.delta = this.event.wheelDeltaY || this.event.deltaY * -1

        // deltamode = 1 -> wheel mouse, not touch pad
        // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
        if (S.Sniffer.isFirefox && this.event.deltaMode === 1) {
            this.delta *= 40 // Firefox multiplicateur
        }

        this.getCallback()
    },

    onMouseWheel: function () {
        this.type = 'scroll'
        this.delta = (this.event.wheelDeltaY) ? this.event.wheelDeltaY : this.event.wheelDelta

        this.getCallback()
    },

    touchStart: function (event) {
        event.preventDefault()

        this.start = event.targetTouches[0].pageY
    },

    touchMove: function (event) {
        event.preventDefault()

        this.type = 'touch'
        this.delta = event.targetTouches[0].pageY - this.start

        this.getCallback()
    },

    getCallback: function () {
        if (!this.isTouch) {
            this.listeners('add')
        }

        this.callback(this.delta, this.type, this.event)
    }

}
