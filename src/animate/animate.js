/*

RULES
─────

BUG WITH ROLLUP AND DETECT NODELIST :
for animate elements with class :
►►►  for one   →   passing dom element
►►►  for all   →   '.myClass'

For 3dx & 3dy properties :
►►►  string   →   px
►►►  int      →   %

Delay :
►►►  before   →   int
►►►  after    →   int

During example :
►►►  elements needs to move during scroll

EXAMPLES
────────

const a1 = new S.Animate('.class', '3dy', 0, 100, 'Power4Out', 1000)
a1.go()

const a2 = new S.Animate(domElement, 'opacity', 1, 0, 'linear', 1000, {callback: myCallback})
a2.go()

const a3 = new S.Animate('#id', '3dx', '0', '100', 'linear', 1000, {before: 500, after: 500, callback: callback, during: duringCallback})
a3.go()

const a4 = new S.Animate('#id', ['rotate', '3dy'], [0, '0'], [-45, '-6'], 'Power4Out', 450)
a4.go()

*/

S.Animate = class {

    constructor (element, prop, start, end, easing, duration, otps) {
        const args = arguments
        this.element = element
        this.prop = prop
        this.start = start
        this.end = end
        this.easing = easing
        this.duration = duration
        this._opts = otps || false

        this.before = this._opts.before ? this._opts.before : 0
        this.after = this._opts.after ? this._opts.after : 0

        this.processingEl()

        this.EasingLibrary = S.Easing
        this.raf = new S.RafIndex()

        this.selectUpdateType()

        S.BindMaker(this, ['getRaf', 'loop'])
    }

    go () {
        S.Delay(this.getRaf, this.before)
    }

    getRaf () {
        this.startTime = S.Win.perfNow
        this.raf.start(this.loop)
    }

    loop () {
        const currentTime = S.Win.perfNow
        const multiplier = (currentTime - this.startTime) / this.duration
        const multiplierT = multiplier > 1 ? 1 : multiplier // T → ternary
        const easingMultiplier = this.EasingLibrary[this.easing](multiplierT)
        let value

        // The linear interpolation → Lerp
        if (this.isNotMultipleT) {
            value = +this.start + this.distance * easingMultiplier
        } else {
            value = []
            for (let i = 0; i < this.updateQty; i++) {
                value[i] = +this.start[i] + this.distance[i] * easingMultiplier
            }
        }

        this.update(value)

        if (multiplierT < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.update(this.end)
            if (this._opts.callback) {
                S.Delay(this._opts.callback, this.after)
            }
        }
    }

    selectUpdateType () {
        if (this.prop.constructor === Array) {
            this.isNotMultipleT = false
            this.updateQty = this.prop.length
            this.update = this.multipleT
            this.distance = []
            for (let i = 0; i < this.updateQty; i++) {
                this.distance[i] = +this.end[i] - +this.start[i]
            }
        } else {
            switch (this.prop) {
                case 'x':
                case 'y':
                    this.update = this.setAttribut
                    break
                case 'scrollTop':
                    this.update = this.setScrollTop
                    break
                case '3dx':
                case '3dy':
                    this.update = this.setStyleT3d
                    break
                default:
                    this.update = this.setStyle
            }
            this.isNotMultipleT = true
            this.distance = +this.end - +this.start
        }
    }

    multipleT (value) {
        let t3dx = 0
        let t3dy = 0
        let rotate = 0

        for (let i = 0; i < this.updateQty; i++) {
            if (this.prop[i] === '3dx') {
                t3dx = S.Is.string(this.start[i]) ? value[i] + 'px' : value[i] + '%'
            } else if (this.prop[i] === '3dy') {
                t3dy = S.Is.string(this.start[i]) ? value[i] + 'px' : value[i] + '%'
            } else if (this.prop[i] === 'rotate') {
                rotate = 'rotate(' + value[i] + 'deg)'
            }
        }

        const translate3d = 'translate3d(' + t3dx + ',' + t3dy + ',0)'
        const multipleTransform = translate3d + ' ' + rotate

        this.updateDom('transform', 'transform', multipleTransform)
    }

    setAttribut (value) {
        this.updateDom('setAttribut', this.prop, value)
    }

    setScrollTop (value) {
        this.el[this.prop] = value

        if (this._opts.during) {
            this._opts.during(value)
        }
    }

    setStyleT3d (value) {
        const valueUnit = S.Is.string(this.start) ? value + 'px' : value + '%'
        const translate = this.prop === '3dx' ? valueUnit + ',0' : '0,' + valueUnit
        const translate3d = 'translate3d(' + translate + ',0)'

        this.updateDom('transform', 'transform', translate3d)
    }

    setStyle (value) {
        this.updateDom('style', this.prop, value)
    }

    updateDom (type, prop, value) {
        const elL = this.multiple ? this.el.length : 1

        for (let i = 0; i < elL; i++) {
            const el = this.multiple ? this.el[i] : this.el

            if (type === 'transform') {
                el.style.webkitTransform = value
            }
            if (type === 'setAttribut') {
                el.setAttribute(prop, value)
            } else {
                el.style[prop] = value
            }
        }
    }

    processingEl () {
        if (S.Is.string(this.element)) {
            this.el = S.Selector.el(this.element)
            this.multiple = S.Selector.type(this.element) === 'class'
        } else {
            this.el = this.element
            // this.multiple = S.Is.nodeList(this.el)
            this.multiple = false
        }
    }

}
