/*

RULES
─────

BUG WITH ROLLUP AND DETECT NODELIST :
for animate elements with class :
►►►  for one   →   passing dom element
►►►  for all   →   '.myClass'

For 3dx & 3dy parameters :
►►►  string   →  px
►►►  int      →  %

During example :
►►►  elements needs to move during scroll

EXAMPLES
────────

const a1 = new S.Animate('.class', '3dy', 0, 100, 'Power4Out', 1000)
a1.init()

const a2 = new S.Animate(domElement, 'opacity', 1, 0, 'linear', 1000, {callback: myCallback})
a2.init()

const a3 = new S.Animate('#id', '3dx', '0', '100', 'linear', 1000, {delay: {before: 500, after: 500}, callback: callback, during: duringCallback})
a3.init()

const a4 = new S.Animate('#id', ['rotate', '3dy'], [0, '0'], [-45, '-6'], 'Power4Out', 450)
a4.init()

*/

S.Animate = class {

    constructor (element, parameter, start, end, easing, duration, options) {
        this.param = parameter
        this.start = start
        this.end = end
        this.easing = easing
        this.duration = duration
        this._opts = options || false

        this.delayBefore = this._opts.delay ? this._opts.delay.before : false
        this.delayAfter = this._opts.delay ? this._opts.delay.after : false

        this.processingEl(element)

        this.EasingLibrary = S.Easing
        this.raf = new S.RafIndex()

        this.prepare()

        S.BindMaker(this, ['run', 'loop'])
    }

    init () {
        const delay = this.delayBefore ? this.delayBefore : 0
        S.Delay(this.run, delay)
    }

    run () {
        this.startTime = S.Win.perfNow
        this.raf.start(this.loop)
    }

    loop () {
        const currentTime = S.Win.perfNow
        const multiplier = (currentTime - this.startTime) / this.duration
        const multiplierT = multiplier > 1 ? 1 : multiplier // T → ternary
        const easingMultiplier = this.EasingLibrary[this.easing](multiplierT)
        let update

        // The linear interpolation → Lerp
        if (this.isNotMultipleT) {
            update = +this.start + this.distance * easingMultiplier
        } else {
            update = []
            for (let i = 0; i < this.updateQty; i++) {
                update[i] = +this.start[i] + this.distance[i] * easingMultiplier
            }
        }

        this.render(update)

        if (multiplierT < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.render(this.end)
            if (this._opts.callback) {
                const delay = this.delayAfter ? this.delayAfter : 0
                S.Delay(this._opts.callback, delay)
            }
        }
    }

    prepare () {
        if (this.param.constructor === Array) {
            this.isNotMultipleT = false
            this.updateQty = this.param.length
            this.render = this.multipleT
            this.distance = []
            for (let i = 0; i < this.updateQty; i++) {
                this.distance[i] = +this.end[i] - +this.start[i]
            }
        } else {
            switch (this.param) {
                case 'x':
                case 'y':
                    this.render = this.attributUpdate
                    break
                case '3dx':
                case '3dy':
                    this.render = this.t3dUpdate
                    break
                case 'scrollTop':
                    this.render = this.scrollTopUpdate
                    break
                default:
                    this.render = this.styleUpdate
            }
            this.isNotMultipleT = true
            this.distance = +this.end - +this.start
        }
    }

    multipleT (update) {
        let t3dx = 0
        let t3dy = 0
        let rotate = 0

        for (let i = 0; i < this.updateQty; i++) {
            if (this.param[i] === '3dx') {
                t3dx = S.Is.string(this.start[i]) ? update[i] + 'px' : update[i] + '%'
            } else if (this.param[i] === '3dy') {
                t3dy = S.Is.string(this.start[i]) ? update[i] + 'px' : update[i] + '%'
            } else if (this.param[i] === 'rotate') {
                rotate = 'rotate(' + update[i] + 'deg)'
            }
        }

        const translate3d = 'translate3d(' + t3dx + ',' + t3dy + ',0)'
        const multipleTransform = translate3d + ' ' + rotate

        this.letsRock('transform', 'transform', multipleTransform)
    }

    attributUpdate (update) {
        this.letsRock('setAttribut', this.param, update)
    }

    scrollTopUpdate (update) {
        this.el[this.param] = update

        if (this._opts.during) {
            this._opts.during(update)
        }
    }

    t3dUpdate (update) {
        const value = S.Is.string(this.start) ? update + 'px' : update + '%'
        const translate = this.param === '3dx' ? value + ',0' : '0,' + value
        const translate3d = 'translate3d(' + translate + ',0)'

        this.letsRock('transform', 'transform', translate3d)
    }

    styleUpdate (update) {
        this.letsRock('style', this.param, update)
    }

    letsRock (type, param, update) {
        const elL = this.multiple ? this.el.length : 1

        for (let i = 0; i < elL; i++) {
            const el = this.multiple ? this.el[i] : this.el

            if (type === 'transform') {
                el.style.webkitTransform = update
            }
            if (type === 'setAttribut') {
                el.setAttribute(param, update)
            } else {
                el.style[param] = update
            }
        }
    }

    processingEl (element) {
        if (S.Is.string(element)) {
            this.el = S.Selector.el(element)
            this.multiple = S.Selector.type(element) === 'class'
        } else {
            this.el = element
            // this.multiple = S.Is.nodeList(this.el)
            this.multiple = false
        }
    }

}
