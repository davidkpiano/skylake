/*

const WT = new S.WT(callback)

WT.on()
WT.off()

function callback (delta, type, event) {

}

type → 'scroll' or 'touch'

*/

S.WT = class EventWT {

    constructor (callback) {
        this.callback = callback
        this.isTouch = S.Is.touch

        this.rafTicking = new S.RafTicking()

        S.BindMaker(this, ['getRAF', 'run', 'touchMove'])
    }

    on () {
        S.WTDisable.off()
        this.listeners('add')
    }

    off () {
        S.WTDisable.on()
        this.listeners('remove')
    }

    listeners (action) {
        if (this.isTouch) {
            S.Listen(this.el, action, 'touchstart', this.getRAF)
        } else {
            S.Listen(document, action, 'mouseWheel', this.getRAF)
        }
    }

    getRAF (event) {
        event.preventDefault()

        this.listeners('remove')

        this.event = event

        this.rafTicking.start(this.run)
    }

    run () {
        const eventType = this.event.type

        if (eventType === 'wheel') {
            this.onWheel()
        } else if (eventType === 'mousewheel') {
            this.onMouseWheel()
        } else {
            this.touchStart()
        }
    }

    onWheel () {
        this.type = 'scroll'
        this.delta = this.event.wheelDeltaY || this.event.deltaY * -1

        // deltamode = 1 -> wheel mouse, not touch pad
        // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
        if (S.Browser.isFirefox && this.event.deltaMode === 1) {
            this.delta *= 40 // Firefox multiplicateur
        }

        this.getCallback()
    }

    onMouseWheel () {
        this.type = 'scroll'
        this.delta = (this.event.wheelDeltaY) ? this.event.wheelDeltaY : this.event.wheelDelta

        this.getCallback()
    }

    touchStart () {
        this.start = this.event.targetTouches[0].pageY

        this.touchMoveListener('add')
    }

    touchMove () {
        this.event.preventDefault()

        this.type = 'touch'
        this.delta = (this.event.targetTouches[0].pageY - this.start)

        this.touchMoveListener('remove')

        this.getCallback()
    }

    touchMoveListener (action) {
        S.Listen(document, action, 'touchmove', this.touchMove)
    }

    getCallback () {
        this.listeners('add')

        this.callback(this.delta, this.type, this.event)
    }

}
