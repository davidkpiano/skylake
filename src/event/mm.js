/*

const MM = new S.MM(callback)

MM.on()
MM.off()

function callback (posX, posY) {

}

*/

S.MM = class {

    constructor (callback) {
        this.callback = callback
        this.posX = 0
        this.posY = 0

        this.rafTicking = new S.RafTicking()

        S.BindMaker(this, ['getRAF', 'run'])
    }

    on () {
        this.listeners('add')
    }

    off () {
        this.listeners('remove')
    }

    listeners (action) {
        S.Listen(document, action, 'mousemove', this.getRAF)
    }

    getRAF (event) {
        this.event = event

        this.rafTicking.start(this.run)
    }

    run () {
        this.posX = this.event.pageX
        this.posY = this.event.pageY

        this.callback(this.posX, this.posY)
    }

}
