/*

const MM = new S.MM(callback)

MM.on()
MM.off()

function callback (posX, posY) {

}

*/

S.MM = function (callback) {
    this.callback = callback
    this.posX = 0
    this.posY = 0

    this.rafTicking = new S.RafTicking()

    S.BindMaker(this, ['getRAF', 'run'])
}

S.MM.prototype.on = function () {
    this.listeners('add')
}

S.MM.prototype.off = function () {
    this.listeners('remove')
}

S.MM.prototype.listeners = function (action) {
    S.Listen(document, action, 'mousemove', this.getRAF)
}

S.MM.prototype.getRAF = function (event) {
    this.event = event

    this.rafTicking.start(this.run)
}

S.MM.prototype.run = function () {
    this.posX = this.event.pageX
    this.posY = this.event.pageY

    this.callback(this.posX, this.posY)
}
