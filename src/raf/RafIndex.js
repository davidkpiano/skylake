/*

►►►  Need two instances in zoom so no module pattern

const rafIndex = new S.RafIndex()

rafIndex.start(callback)
rafIndex.cancel()

*/

S.RafIndex = function () {

    this.start = function (callback) {
        this.rafCallback = S.Raf(callback)
    }

    this.cancel = function () {
        window.cancelAnimationFrame(this.rafCallback)
    }
}
