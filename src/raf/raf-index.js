/*

►►►  Need two instances in zoom so no module pattern

const rafIndex = new S.RafIndex()

rafIndex.start(callback)
rafIndex.cancel()

*/

S.RafIndex = class {

    start (callback) {
        this.rafCallback = S.Raf(callback)
    }

    cancel () {
        window.cancelAnimationFrame(this.rafCallback)
    }
}
