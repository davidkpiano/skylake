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

S.AnimatedLine = function (path) {
    this.path = S.Selector.el(path)
    this.pathL = this.path.length

    this.merom = []
}

S.AnimatedLine.prototype = {

    play: function (duration, easing, callback) {
        this.type = 'play'
        this.run(duration, easing, callback)
    },

    reverse: function (duration, easing, callback) {
        this.type = 'reverse'
        this.run(duration, easing, callback)
    },

    run: function (duration, easing, callback) {
        this.duration = duration
        this.easing = easing
        this.callback = callback
        for (var i = 0; i < this.pathL; i++) {
            this.animationLine(this.path[i], i)
        }
    },

    pause: function (status) {
        for (var i = 0; i < this.pathL; i++) {
            this.merom[i].pause(status)
        }
    },

    reset: function () {
        for (var i = 0; i < this.pathL; i++) {
            this.path[i].style = ''
        }
    },

    animationLine: function (path, i) {
        var pathLength = path.getTotalLength()
        var start
        var end
        if (this.type === 'reverse') {
            var pathSDO = path.style.strokeDashoffset
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

