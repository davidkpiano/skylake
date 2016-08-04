/*

EXPLOITATION JS
───────────────

►►►  path    →   '#id' or '.class' or domElement

const animatedLine = new S.AnimatedLine('.paths', 1200, 'ExpoInOut', {reverse: true, callback: false})
animatedLine.play()
animatedLine.pause('on')
animatedLine.pause('off')
animatedLine.reset()

EXPLOITATION CSS
────────────────

.paths {
    fill: none;
    stroke: pink;
    opacity: 0;
    transition: opacity 10ms linear 10ms; /* debug IE
}

*/

S.AnimatedLine = class {

    constructor (path, duration, easing, opts) {
        this.path = S.Selector.el(path)
        this.pathL = this.path.length
        this.duration = duration
        this.easing = easing
        this.opts = opts || false

        this.merom = []
    }

    play () {
        for (let i = 0; i < this.pathL; i++) {
            this.animationLine(this.path[i], i)
        }
    }

    pause (status) {
        for (let i = 0; i < this.pathL; i++) {
            this.merom[i].pause(status)
        }
    }

    reset () {
        for (let i = 0; i < this.pathL; i++) {
            this.path[i].style = ''
        }
    }

    animationLine (path, i) {
        const pathLength = path.getTotalLength()
        const start = this.opts.reverse ? 0 : pathLength
        const end = this.opts.reverse ? pathLength : 0

        path.style.strokeDasharray = pathLength
        path.style.opacity = 1

        this.merom[i] = new S.Merom(path, 'strokeDashoffset', start, end, this.duration, this.easing, {callback: this.opts.callback})
        this.merom[i].play()
    }
}
