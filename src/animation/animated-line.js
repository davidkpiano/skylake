/*

EXPLOITATION JS
───────────────

►►►  path    →   '#id' or '.class' or domElement

const animatedLine = new S.AnimatedLine('.paths')
animatedLine.play(4000, 'Power1InOut', playCallback)
animatedLine.reverse(1000, 'ExpoInOut', reverseCallback)
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

    constructor (path) {
        this.path = S.Selector.el(path)
        this.pathL = this.path.length

        this.merom = []
    }

    play () {
        this.type = 'play'
        this.run(arguments)
    }

    reverse () {
        this.type = 'reverse'
        this.run(arguments)
    }

    run (opts) {
        this.duration = opts[0]
        this.easing = opts[1]
        this.callback = opts[2]
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
        const start = this.type === 'reverse' ? +path.style.strokeDashoffset : pathLength
        const end = this.type === 'reverse' ? pathLength : 0

        path.style.strokeDasharray = pathLength
        path.style.opacity = 1

        this.merom[i] = new S.Merom(path, 'strokeDashoffset', start, end, this.duration, this.easing, {callback: this.callback})
        this.merom[i].play()
    }
}
