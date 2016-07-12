/*

►►►  The before property is added

const tl = new S.Timeline()
tl.from('#element-0', '3dy', 0, 100, 'Power4Out', 1000, {before: 500})
tl.from('#element-1', 'opacity', 1, 0, 'linear', 500, {before: 600})

tl.go()

*/

S.Timeline = class {

    constructor () {
        this.content = []
    }

    from () {
        if (this.contentL > 0) {
            const prevBefore = this.content[this.contentL - 1].before
            if (arguments[6] && arguments[6].before) {
                arguments[6].before = prevBefore + arguments[6].before
            } else {
                [].push.call(arguments, {before: prevBefore})
            }
        }

        this.content.push(new S.Animate(...arguments))
    }

    go () {
        for (let i = 0; i < this.contentL; i++) {
            this.content[i].go()
        }
    }

    get contentL () {
        return this.content.length
    }

}
