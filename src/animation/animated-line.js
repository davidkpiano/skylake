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
        this.run(...arguments)
    }

    reverse () {
        this.type = 'reverse'
        this.run(...arguments)
    }

    run (duration, easing, callback) {
        this.duration = duration
        this.easing = easing
        this.callback = callback
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
        let start
        let end
        if (this.type === 'reverse') {
            const pathSDO = path.style.strokeDashoffset
            start = pathSDO.charAt(pathSDO.length - 1) === 'x' ? +pathSDO.substring(0, pathSDO.length - 2) : +pathSDO
            end = pathLength
        } else {
            start = pathLength
            end = 0
        }

        path.style.strokeDasharray = pathLength
        path.style.opacity = 1

        this.merom[i] = new S.Merom(path, 'strokeDashoffset', start, end, this.duration, this.easing, {callback: this.callback})
        this.merom[i].play()
    }
}
