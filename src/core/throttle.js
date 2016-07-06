/*

const throttle = new S.Throttle({
    callback: callback,
    delay: 200
    endOnly: true
})

throttle.init()

*/

S.Throttle = class {

    constructor (options) {
        this.currentTime = 0
        this.lastTime = 0
        this.timer
        this.opts = options
    }

    init () {
        this.currentTime = S.Win.perfNow

        if (this.lastTime + this.opts.delay > this.currentTime) {
            clearTimeout(this.timer)
            this.timer = S.Delay(() => {
                this.opts.callback()
                this.timeReset()
            }, this.opts.delay)
        } else {
            if (!this.opts.endOnly) {
                this.opts.callback()
            }
            this.timeReset()
        }
    }

    timeReset () {
        this.lastTime = this.currentTime
    }
}
