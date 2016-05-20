const fs = require('fs')

const srcArr = [
    'src/base/s.js',
    'src/core/animate.js',
    'src/core/bind-maker.js',
    'src/core/delay.js',
    'src/core/easing.js',
    'src/core/throttle.js',
    'src/el/geb.js', // Must be before 'dom'
    'src/el/dom.js', // Must be before 'detect'
    'src/core/detect.js',
    'src/el/selector.js',
    'src/event/mm.js',
    'src/event/ro.js',
    'src/event/scroll.js',
    'src/event/wt-disable.js',
    'src/event/wt.js',
    'src/fx/animated-line.js',
    'src/fx/scroll-to-top.js',
    'src/fx/scroll-to.js',
    'src/fx/scroll-zero.js',
    'src/listener/auto-transitionend.js',
    'src/listener/listen.js',
    'src/polyfill/perf-now.js',
    'src/polyfill/raf.js',
    'src/raf/raf.js',
    'src/raf/raf-index.js',
    'src/raf/raf-ticking.js',
    'src/window/win.js',
    'src/xhr/on-popstate.js'
]

const dist = 'skylake.js'

const encoding = 'utf-8'

const src = srcArr.map(value => {
    return fs.readFileSync(value, encoding)
}).join('\n')

fs.writeFileSync(dist, src, encoding)
