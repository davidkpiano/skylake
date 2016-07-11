/*

const tl = new S.Timeline()
tl.from('#element-0', '3dy', 0, 100, 'Power4Out', 1000)
tl.from('#element-1', 'opacity', 1, 0, 'linear', 500)

tl.go()

*/

S.Timeline = class {

    constructor () {
        this.content = []
    }

    from () {
        this.content.push(new S.Animate(arguments))
    }

    go () {
        const contentL = this.content.length
        for (let i = 0; i < contentL; i++) {
            return this.content[i].go()
        }
    }

}
