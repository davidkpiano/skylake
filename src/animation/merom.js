/*

RULES
─────

For 3dx & 3dy properties :
►►►  string   →   px
►►►  int      →   %

Delay :
►►►  delay           →   int
►►►  callbackDelay   →   int

During :
►►►  example : elements needs to move during scroll

EXAMPLES
────────

const animation1 = new S.Merom('.class', '3dy', 0, 100, 1000, 'Power4Out')
animation1.play()
animation1.pause('on')
animation1.pause('off')

const animation2 = new S.Merom(domElement, 'opacity', 1, 0, 1000, 'linear', {callback: myCallback})
animation2.play()

const animation3 = new S.Merom('#id', '3dx', '0', '100', 1000, 'linear', {delay: 500, callbackDelay: 500, callback: myCallback, during: duringCallback})
animation3.play()

const animation4 = new S.Merom('#id', ['rotate', '3dy'], [0, '0'], [-45, '-6'], 450, 'Power4Out')
animation4.play()

const animation5 = new S.Merom('#id', '3dx', '0', '100')
animation5.play()

BUG
───

ROLLUP AND DETECT NODELIST : S.Is.nodeList(this.el)
So for animate elements with class :
►►►  for one   →   passing dom element
►►►  for all   →   '.myClass'

*/

S.Merom = class {

    constructor (element, prop, start, end, duration, easing, opts) {
        const args = arguments
        this.element = element
        this.prop = prop
        this.start = start
        this.end = end

        if (S.Is.object(duration)) {
            this.duration = 0
            this.easing = 'linear'
            this.opts = duration
        } else {
            this.duration = duration || 0
            this.easing = easing || 'linear'
            this.opts = opts || false
        }

        this.delay = this.opts.delay || 0
        this.callbackDelay = this.opts.callbackDelay || 0

        this.el = S.Selector.el(this.element)
        this.elL = this.el.length

        this.deltaTimeAtPause = 0

        this.EasingLibrary = S.Easing
        this.raf = new S.RafIndex()

        this.selectUpdateType()

        S.BindMaker(this, ['getRaf', 'loop'])
    }

    play () {
        S.Delay(this.getRaf, this.delay)
    }

    pause (status) {
        if (status === 'on') {
            this.isPaused = true
            this.deltaTimeSave = this.deltaTime
        } else {
            this.isPaused = false
            this.deltaTimeAtPause = this.deltaTimeSave
            this.startTime = S.Win.perfNow
            this.raf.start(this.loop)
        }
    }

    getRaf () {
        this.startTime = S.Win.perfNow
        this.raf.start(this.loop)
    }

    loop () {
        if (this.isPaused) return

        const currentTime = S.Win.perfNow
        this.deltaTime = currentTime - this.startTime + this.deltaTimeAtPause
        const multiplier = this.deltaTime / this.duration
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
            if (this.opts.callback) {
                S.Delay(this.opts.callback, this.callbackDelay)
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
                case '3dx':
                case '3dy':
                    this.update = this.setStyleT3d
                    break
                case 'x':
                case 'y':
                    this.update = this.setAttribut
                    break
                case 'scrollTop':
                    this.update = this.setScrollTop
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

    setStyleT3d (value) {
        const valueUnit = S.Is.string(this.start) ? value + 'px' : value + '%'
        const translate = this.prop === '3dx' ? valueUnit + ',0' : '0,' + valueUnit
        const translate3d = 'translate3d(' + translate + ',0)'

        this.updateDom('transform', 'transform', translate3d)
    }

    setAttribut (value) {
        this.updateDom('setAttribut', this.prop, value)
    }

    setScrollTop (value) {
        this.element[this.prop] = value

        if (this.opts.during) {
            this.opts.during(value)
        }
    }

    setStyle (value) {
        this.updateDom('style', this.prop, value)
    }

    updateDom (type, prop, value) {
        for (let i = 0; i < this.elL; i++) {
            if (type === 'transform') {
                this.el[i].style.webkitTransform = value
            }
            if (type === 'setAttribut') {
                this.el[i].setAttribute(prop, value)
            } else {
                this.el[i].style[prop] = value
            }
        }
    }

}
