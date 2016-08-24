/*

RULES
─────

For 3dx & 3dy properties :
►►►  string   →   px
►►►  int      →   %

Delay :
►►►  delay           →   int
►►►  callbackDelay   →   int

Reverse :
►►►  if 'duration' and 'easing' are not defined, it inherits the play() properties

During :
►►►  example : elements needs to move during scroll

EXAMPLES
────────

const animation1 = new S.Merom('.class', '3dy', 0, 100, 1000, 'Power4Out')
animation1.play()
animation1.pause('on')
animation1.pause('off')

const animation2 = new S.Merom(domElement, 'opacity', 1, 0, 1000, 'linear', {delay: 500, callbackDelay: 200, callback: myCallback})
animation2.play()

const animation3 = new S.Merom('#id', ['rotate', '3dy'], [0, '0'], [-45, '-6'], 450, 'Power4Out')
animation3.play()

const animation4 = new S.Merom('.class', 'scale', '0', '145', 1000, 'Power4Out')
animation4.play()
animation4.reverse(600, 'ExpoOut', {delay: 100, callbackDelay: 200, callback: myCallback})

const animation5 = new S.Merom('.class', '3dx', 1, 1.2, 700, 'Power1In')
animation5.play()
animation5.pause('on')
animation5.reset({delay: 400, callbackDelay: 700, callback: myCallback})

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
        S.Delay(_ => {
            this.isPaused = false
            this.getRaf()
        }, this.delay)
    }

    pause (status) {
        if (status === 'on') {
            this.isPaused = true
            this.deltaTimeSave = this.deltaTime
        } else {
            this.deltaTimeAtPause = this.deltaTimeSave
            this.delay = 0
            this.play()
        }
    }

    reverse (duration, easing, opts) {
        this.pause('on')

        this.end = this.start
        this.start = S.Is.string(this.start) ? String(this.value) : this.value
        this.distance = +this.end - +this.start

        if (S.Is.object(duration)) {
            this.opts = duration
        } else {
            this.duration = duration
            this.easing = easing
            this.opts = opts || false
        }

        this.delay = this.opts.delay || 0
        this.callbackDelay = this.opts.callbackDelay || 0

        this.play()
    }

    reset (opts) {
        this.pause('on')

        this.end = this.start
        this.start = S.Is.string(this.start) ? String(this.value) : this.value
        this.distance = +this.end - +this.start
        this.duration = 0
        this.easing = 'linear'
        this.opts = opts || false

        this.delay = this.opts.delay || 0
        this.callbackDelay = this.opts.callbackDelay || 0

        this.play()
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

        // The linear interpolation → Lerp
        if (this.isNotMultipleT) {
            this.value = +this.start + this.distance * easingMultiplier
        } else {
            this.value = []
            for (let i = 0; i < this.updateQty; i++) {
                this.value[i] = +this.start[i] + this.distance[i] * easingMultiplier
            }
        }

        this.update(this.value)

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
                case 'scale':
                case 'rotate':
                    this.update = this.simpleT
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
        let rotate = ''
        let scale = ''

        for (let i = 0; i < this.updateQty; i++) {
            if (this.prop[i] === '3dx') {
                t3dx = value[i] + this.t3dUnit(this.start[i])
            } else if (this.prop[i] === '3dy') {
                t3dy = value[i] + this.t3dUnit(this.start[i])
            } else if (this.prop[i] === 'rotate') {
                rotate = 'rotate(' + value[i] + 'deg)'
            } else if (this.prop[i] === 'scale') {
                scale = 'scale(' + value[i] + ')'
            }
        }

        const translate3d = 'translate3d(' + t3dx + ',' + t3dy + ',0)'
        const multipleTransform = translate3d + ' ' + rotate + ' ' + scale

        this.updateDom('transform', multipleTransform)
    }

    simpleT (value) {
        let transformValue
        if (this.prop === '3dx' || this.prop === '3dy') {
            const valueUnit = value + this.t3dUnit(this.start)
            const translate = this.prop === '3dx' ? valueUnit + ',0' : '0,' + valueUnit
            transformValue = 'translate3d(' + translate + ',0)'
        } else if (this.prop === 'scale') {
            transformValue = 'scale(' + value + ')'
        } else {
            transformValue = 'rotate(' + value + 'deg)'
        }

        this.updateDom('transform', transformValue)
    }

    setScrollTop (value) {
        this.element[this.prop] = value

        if (this.opts.during) {
            this.opts.during(value)
        }
    }

    setStyle (value) {
        this.updateDom(this.prop, value)
    }

    updateDom (prop, value) {
        for (let i = 0; i < this.elL; i++) {
            if (prop === 'transform') {
                this.el[i].style.webkitTransform = value
                this.el[i].style.transform = value
            } else if (prop === 'x' || prop === 'y') {
                this.el[i].setAttribute(prop, value)
            } else {
                this.el[i].style[prop] = value
            }
        }
    }

    t3dUnit (valueToCheck) {
        return S.Is.string(valueToCheck) ? 'px' : '%'
    }

}
