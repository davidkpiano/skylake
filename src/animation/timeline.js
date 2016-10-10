/*

const tl = new S.Timeline()
tl.from('#element-0', '3dy', 0, 100, 1000, 'Power4Out', {delay: 500})
tl.from('#element-1', 'opacity', 1, 0, 500, 'linear', {callbackDelay: 600, callback: myCallback})
tl.play()
tl.pause('on')
tl.pause('off')

*/

S.Timeline = function () {
    this.content = []

    this.contentL = function () {
        return this.content.length
    }
}

S.Timeline.prototype.from = function (element, prop, start, end, duration, easing, opts) {
    if (this.contentL() > 0) {
        var opts = opts || {}
        var prevTimelineDelay = this.content[this.contentL() - 1].delay
        var arg4isObj = duration && S.Is.object(duration)
        if (arg4isObj && duration.delay) {
            duration.delay = prevTimelineDelay + duration.delay
        } else if (arg4isObj) {
            duration.delay = prevTimelineDelay
        } else if (opts.delay) {
            opts.delay = prevTimelineDelay + opts.delay
        } else {
            opts.delay = prevTimelineDelay
        }
    }

    this.content.push(new S.Merom(element, prop, start, end, duration, easing, opts))
}

S.Timeline.prototype.play = function () {
    for (var i = 0; i < this.contentL(); i++) {
        this.content[i].play()
    }
}

S.Timeline.prototype.pause = function (status) {
    for (var i = 0; i < this.contentL(); i++) {
        this.content[i].pause(status)
    }
}

S.Timeline.prototype.reverse = function () {
    for (var i = 0; i < this.contentL(); i++) {
        this.content[i].reverse(Array.from(arguments))
    }
}

S.Timeline.prototype.reset = function (opts) {
    for (var i = 0; i < this.contentL(); i++) {
        this.content[i].reset(opts)
    }
}
