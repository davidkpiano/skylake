/*

►►► Type : 'polygon' or 'path'

const morphAnimation = new S.Morph({
    type: 'polygon',
    element: S.Geb.id('polygon'),
    newCoords: '50.2,12.8 63,0 63,4.1 63,7 63,10 63,13.1 63,17',
    duration: 1100,
    easing: 'Power4InOut',
    delay: 700,
    callbackDelay: myCallback,
    callback: myCallback
})

morphAnimation.play()

*/

S.Morph = class {

    constructor (opts) {
        this.opts = opts
        this.type = this.opts.type === 'polygon' ? 'points' : 'd'
        this.coordsStart = this.getCoordsArr(this.opts.element.getAttribute(this.type))
        this.coordsEnd = this.getCoordsArr(this.opts.newCoords)

        this.raf = new S.RafIndex()

        S.BindMaker(this, ['getRaf', 'loop'])
    }

    play () {
        const delay = this.opts.delay ? this.opts.delay : 0
        S.Delay(this.getRaf, delay)
    }

    pause () {
        this.isPaused = true
    }

    getRaf () {
        this.startTime = S.Win.perfNow
        this.raf.start(this.loop)
    }

    loop () {
        if (this.isPaused) return

        const currentTime      = S.Win.perfNow
        const multiplier       = (currentTime - this.startTime) / this.opts.duration
        const multiplierT      = multiplier > 1 ? 1 : multiplier // T → ternary
        const easingMultiplier = S.Easing[this.opts.easing](multiplierT)

        let update = []
        let coordsUpdate = ''

        for (let i = 0; i < this.coordsStart.length; i++) {
            update[i] = this.isLetter(this.coordsStart[i]) ? this.coordsStart[i] + ' ' : S.Lerp.init(+this.coordsStart[i], +this.coordsEnd[i], easingMultiplier)
            coordsUpdate += update[i]

            if (i !== this.coordsStart.length - 1) {
                if (coordsUpdate.charAt(coordsUpdate.length - 1) === ',') {
                    coordsUpdate += ' '
                } else {
                    coordsUpdate += ','
                }
            }
        }

        this.opts.element.setAttribute(this.type, coordsUpdate)

        if (easingMultiplier < 1) {
            this.raf.start(this.loop)
        } else {
            this.raf.cancel()
            this.opts.element.setAttribute(this.type, this.opts.newCoords)
            this.getCallback()
        }
    }

    getCoordsArr (coords) {
        const coordsSplit = coords.split(' ')
        let coordsArr = []
        for (let i = 0; i < coordsSplit.length; i++) {
            const coordsSplit2 = coordsSplit[i].split(',')
            for (let j = 0; j < coordsSplit2.length; j++) {
                coordsArr.push(coordsSplit2[j])
            }
        }
        return coordsArr
    }

    isLetter (varToCheck) {
        return (varToCheck === 'M' || varToCheck === 'L' || varToCheck === 'C' || varToCheck === 'Z')
    }

    getCallback () {
        if (this.opts.callback) {
            const delay = this.opts.callbackDelay ? this.opts.callbackDelay : 0
            S.Delay(this.opts.callback, delay)
        }
    }
}
