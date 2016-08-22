const fs = require('fs')

const srcArr = [
    'src/base/S.js',
    'src/animation/Merom.js',
    'src/animation/AnimatedLine.js',
    'src/animation/Morph.js',
    'src/animation/Timeline.js',
    'src/core/BindMaker.js',
    'src/core/Delay.js',
    'src/core/Easing.js',
    'src/core/Is.js',
    'src/core/Sniffer.js',
    'src/core/Throttle.js',
    'src/el/Geb.js', // Must be before 'dom'
    'src/el/Dom.js', // Must be before 'detect'
    'src/el/Selector.js',
    'src/event/MM.js',
    'src/event/RO.js',
    'src/event/Scroll.js',
    'src/event/WTDisable.js',
    'src/event/WT.js',
    'src/listener/AutoTransitionend.js',
    'src/listener/Listen.js',
    'src/polyfill/PerfNow.js',
    'src/polyfill/Raf.js',
    'src/raf/Raf.js',
    'src/raf/RafIndex.js',
    'src/raf/RafTicking.js',
    'src/scroll/ScrollToTop.js',
    'src/scroll/ScrollTo.js',
    'src/scroll/ScrollZero.js',
    'src/scroll/Scrollable.js',
    'src/scroll/TopWhenRefresh.js',
    'src/window/Win.js',
    'src/xhr/Controller.js',
    'src/xhr/OnPopstate.js'
]

const dist = 'skylake.js'

const encoding = 'utf-8'

const src = srcArr.map(value => {
    return fs.readFileSync(value, encoding)
}).join('\n')

fs.writeFileSync(dist, src, encoding)
