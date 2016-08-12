/*

►►►  Auto destroy after callback but can destroy manually if necessary

const rafTicking = new S.RafTicking()

rafTicking.start(callback)
rafTicking.destroy()

*/

S.RafTicking = class {

    constructor () {
        this.ticking = false
        this.rafIndex = new S.RafIndex()
        S.BindMaker(this, ['getCallback'])
    }

    start (callback) {
        this.callback = callback

        if (!this.ticking) {
            this.ticking = true
            this.rafIndex.start(this.getCallback)
        }
    }

    getCallback () {
        this.callback()
        this.destroy()
    }

    destroy () {
        this.rafIndex.cancel()
        this.ticking = false
    }
}
