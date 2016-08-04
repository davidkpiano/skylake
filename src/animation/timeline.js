/*

const tl = new S.Timeline()
tl.from('#element-0', '3dy', 0, 100, 1000, 'Power4Out', {delay: 500})
tl.from('#element-1', 'opacity', 1, 0, 500, 'linear', {callbackDelay: 600, callback: myCallback})
tl.play()
tl.pause('on')
tl.pause('off')

*/

S.Timeline = class {

    constructor () {
        this.content = []
    }

    from () {
        if (this.contentL > 0) {
            const prevTimelineDelay = this.content[this.contentL - 1].delay
            const arg4isObj = arguments[4] && S.Is.object(arguments[4])
            if (arg4isObj && arguments[4].delay) {
                arguments[4].delay = prevTimelineDelay + arguments[4].delay
            } else if (arg4isObj) {
                arguments[4].delay = prevTimelineDelay
            } else if (arguments[6] && arguments[6].delay) {
                arguments[6].delay = prevTimelineDelay + arguments[6].delay
            } else if (arguments[6]) {
                arguments[6].delay = prevTimelineDelay
            } else {
                [].push.call(arguments, {delay: prevTimelineDelay})
            }
        }

        this.content.push(new S.Merom(...arguments))
    }

    play () {
        for (let i = 0; i < this.contentL; i++) {
            this.content[i].play()
        }
    }

    pause (status) {
        for (let i = 0; i < this.contentL; i++) {
            this.content[i].pause(status)
        }
    }

    get contentL () {
        return this.content.length
    }

}
