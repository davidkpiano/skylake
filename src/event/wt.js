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

    S.BindMaker(this, ['getRAF', 'run', 'touchMove'])
}

S.WT.prototype.on = function () {
    S.WTDisable.off()
    this.listeners('add')
}

S.WT.prototype.off = function () {
    S.WTDisable.on()
    this.listeners('remove')
}

S.WT.prototype.listeners = function (action) {
    if (this.isTouch) {
        S.Listen(this.el, action, 'touchstart', this.getRAF)
    } else {
        S.Listen(document, action, 'mouseWheel', this.getRAF)
    }
}

S.WT.prototype.getRAF = function (event) {
    event.preventDefault()

    this.listeners('remove')

    this.event = event

    this.rafTicking.start(this.run)
}

S.WT.prototype.run = function () {
    const eventType = this.event.type

    if (eventType === 'wheel') {
        this.onWheel()
    } else if (eventType === 'mousewheel') {
        this.onMouseWheel()
    } else {
        this.touchStart()
    }
}

S.WT.prototype.onWheel = function () {
    this.type = 'scroll'
    this.delta = this.event.wheelDeltaY || this.event.deltaY * -1

    // deltamode = 1 -> wheel mouse, not touch pad
    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
    if (S.Sniffer.isFirefox && this.event.deltaMode === 1) {
        this.delta *= 40 // Firefox multiplicateur
    }

    this.getCallback()
}

S.WT.prototype.onMouseWheel = function () {
    this.type = 'scroll'
    this.delta = (this.event.wheelDeltaY) ? this.event.wheelDeltaY : this.event.wheelDelta

    this.getCallback()
}

S.WT.prototype.touchStart = function () {
    this.start = this.event.targetTouches[0].pageY

    this.touchMoveListener('add')
}

S.WT.prototype.touchMove = function () {
    this.event.preventDefault()

    this.type = 'touch'
    this.delta = (this.event.targetTouches[0].pageY - this.start)

    this.touchMoveListener('remove')

    this.getCallback()
}

S.WT.prototype.touchMoveListener = function (action) {
    S.Listen(document, action, 'touchmove', this.touchMove)
}

S.WT.prototype.getCallback = function () {
    this.listeners('add')

    this.callback(this.delta, this.type, this.event)
}
