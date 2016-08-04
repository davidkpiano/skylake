/*

const throttle = new S.Throttle({
    callback: callback,
    delay: 200
    atEnd: true
})

throttle.init()

*/

S.Throttle = class {

    constructor (options) {
        this.timeout = false
        this.timer = 0
        this.opts = options

        S.BindMaker(this, ['atEndController'])
    }

    init () {
        this.startTime = S.Win.perfNow

        if (!this.timeout) {
            this.timeout = true
            S.Delay(this.atEndController, this.opts.delay)
        }
    }

    atEndController () {
        const currentTime = S.Win.perfNow

        if (currentTime - this.startTime < this.opts.delay) {
            this.timer = S.Delay(this.atEndController, this.opts.delay)
            if (!this.opts.atEnd) {
                this.opts.callback()
            }
        } else {
            clearTimeout(this.timer)
            this.timeout = false
            this.opts.callback()
        }
    }
}
