/*

►►►  Auto destroy after callback but can destroy manually if necessary

const rafTicking = new S.RafTicking()

rafTicking.start(callback)
rafTicking.destroy()

*/

S.RafTicking = function () {
    this.ticking = false
    this.rafIndex = new S.RafIndex()
    S.BindMaker(this, ['getCallback'])
}

S.RafTicking.prototype.start = function (callback) {
    this.callback = callback

    if (!this.ticking) {
        this.ticking = true
        this.rafIndex.start(this.getCallback)
    }
}

S.RafTicking.prototype.getCallback = function () {
    this.callback()
    this.destroy()
}

S.RafTicking.prototype.destroy = function () {
    this.rafIndex.cancel()
    this.ticking = false
}
