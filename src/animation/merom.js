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

S.Merom = function (element, prop, start, end, duration, easing, opts) {
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

    this.delaysInit()

    this.el = S.Selector.el(this.element)
    this.elL = this.el.length

    this.deltaTimeAtPause = 0

    this.EasingLibrary = S.Easing
    this.raf = new S.RafIndex()

    this.selectUpdateType()

    S.BindMaker(this, ['getRaf', 'loop'])
}

S.Merom.prototype.play = function () {
    var self = this
    S.Delay(function () {
        self.isPaused = false
        self.getRaf()
    }, self.delay)
}

S.Merom.prototype.pause = function (status) {
    if (status === 'on') {
        this.isPaused = true
        this.deltaTimeSave = this.deltaTime
    } else {
        this.deltaTimeAtPause = this.deltaTimeSave
        this.delay = 0
        this.play()
    }
}

S.Merom.prototype.reverse = function (duration, easing, opts) {
    this.pause('on')

    if (S.Is.object(duration)) {
        this.opts = duration
    } else {
        this.duration = duration || this.duration
        this.easing = easing || this.easing
        this.opts = opts || false
    }

    this.getReset()
}

S.Merom.prototype.reset = function (opts) {
    this.pause('on')

    this.duration = 0
    this.easing = 'linear'
    this.opts = opts || false

    this.getReset()
}

S.Merom.prototype.getRaf = function () {
    this.startTime = S.Win.perfNow
    this.raf.start(this.loop)
}

S.Merom.prototype.loop = function () {
    if (this.isPaused) return

    var currentTime = S.Win.perfNow
    this.deltaTime = currentTime - this.startTime + this.deltaTimeAtPause
    var multiplier = this.deltaTime / this.duration
    var multiplierT = multiplier > 1 ? 1 : multiplier // T → ternary
    var easingMultiplier = this.EasingLibrary[this.easing](multiplierT)

    if (this.isNotMultipleT) {
        this.value = S.Lerp.init(+this.start, +this.end, easingMultiplier)
    } else {
        this.value = []
        for (var i = 0; i < this.updateQty; i++) {
            this.value[i] = S.Lerp.init(+this.start[i], +this.end[i], easingMultiplier)
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

S.Merom.prototype.selectUpdateType = function () {
    if (S.Is.array(this.prop)) {
        this.isNotMultipleT = false
        this.updateQty = this.prop.length
        this.update = this.multipleT
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
    }
}

S.Merom.prototype.multipleT = function (value) {
    var t3dx = 0
    var t3dy = 0
    var rotate = ''
    var scale = ''

    for (var i = 0; i < this.updateQty; i++) {
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

    var translate3d = 'translate3d(' + t3dx + ',' + t3dy + ',0)'
    var multipleTransform = translate3d + ' ' + rotate + ' ' + scale

    this.updateDom('transform', multipleTransform)
}

S.Merom.prototype.simpleT = function (value) {
    var transformValue
    if (this.prop === '3dx' || this.prop === '3dy') {
        var valueUnit = value + this.t3dUnit(this.start)
        var translate = this.prop === '3dx' ? valueUnit + ',0' : '0,' + valueUnit
        transformValue = 'translate3d(' + translate + ',0)'
    } else if (this.prop === 'rotate') {
        transformValue = 'rotate(' + value + 'deg)'
    } else {
        transformValue = 'scale(' + value + ')'
    }

    this.updateDom('transform', transformValue)
}

S.Merom.prototype.setScrollTop = function (value) {
    this.element[this.prop] = value

    if (this.opts.during) {
        this.opts.during(value)
    }
}

S.Merom.prototype.setStyle = function (value) {
    this.updateDom(this.prop, value)
}

S.Merom.prototype.updateDom = function (prop, value) {
    for (var i = 0; i < this.elL; i++) {
        if (prop === 'transform') {
            this.el[i].style.webkitTransform = value
            this.el[i].style.transform = value
        } else if (prop === 'x' || prop === 'y' || prop === 'r') {
            this.el[i].setAttribute(prop, value)
        } else {
            this.el[i].style[prop] = value
        }
    }
}

S.Merom.prototype.delaysInit = function () {
    this.delay = this.opts.delay || 0
    this.callbackDelay = this.opts.callbackDelay || 0
}

S.Merom.prototype.getReset = function () {
    this.end = this.start
    this.start = S.Is.string(this.start) ? String(this.value) : this.value

    this.delaysInit()

    this.play()
}

S.Merom.prototype.t3dUnit = function (valueToCheck) {
    return S.Is.string(valueToCheck) ? 'px' : '%'
}
