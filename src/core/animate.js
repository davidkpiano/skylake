/*

RULES
─────

Animate elements with class :
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

*/

S.Animate = class {

    constructor (element, parameter, start, end, easing, duration, options) {
        this.param = parameter
        this.start = start
        this.end = end
        this.easing = easing
        this.duration = duration
        this._opts = options || false

        this.distance = this.end - this.start
        this.delayBefore = this._opts.delay ? this._opts.delay.before : false
        this.delayAfter = this._opts.delay ? this._opts.delay.after : false

        this.getElement(element)

        this.EasingLibrary = S.Easing
        this.raf = new S.RafIndex()

        switch (this.param) {
            case 'x':
            case 'y':
                this.getUpdate = this.attributUpdate
                break
            case '3dx':
            case '3dy':
                this.getUpdate = this.t3dUpdate
                break
            case 'scrollTop':
                this.getUpdate = this.scrollTopUpdate
                break
            default:
                this.getUpdate = this.styleUpdate
        }

        S.BindMaker(this, ['run', 'loop'])
    }

    init () {
        const delay = this.delayBefore ? this.delayBefore : 0
        S.Delay(this.run, delay)
    }

    run () {
        this.startTime = S.Win.perfNow()
        this.raf.start(this.loop)
    }

    loop () {
        const currentTime      = S.Win.perfNow()
        const multiplier       = (currentTime - this.startTime) / this.duration
        const multiplierT      = multiplier > 1 ? 1 : multiplier // T → ternary
        const easingMultiplier = this.EasingLibrary[this.easing](multiplierT)
        const update           = this.start + this.distance * easingMultiplier // Lerp → linear interpolation

        this.getUpdate(update)

        if (multiplierT < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.getUpdate(this.end)
            if (this._opts.callback) {
                const delay = this.delayAfter ? this.delayAfter : 0
                S.Delay(this._opts.callback, delay)
            }
        }
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
        const value = this.isString(this.start) ? update + 'px' : update + '%'
        const translate = this.param === 'x3d' ? value + ',0' : '0,' + value
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

    getElement (element) {
        this.el = this.isString(element) ? S.Selector.el(element) : element
        this.multiple = this.isString(element) ? (S.Selector.type(element) === 'class') : false
    }

    isString (varToCheck) {
        return typeof varToCheck === 'string'
    }
}
