/*

EXPLOITATION JS
───────────────

S.AnimatedLine({
    pathsClass: 'pathsClassName',
    duration: 300,
    easing: 'linear',
    callback: false
})

OR

AnimatedLine({
    pathsClass: 'pathClassName',
    duration: 800,
    easing: 'Power4InOut',
    reverse: true
})

EXPLOITATION CSS
────────────────

.paths {
    fill: none;
    stroke: pink;
    opacity: 0;
    transition: opacity 10ms linear 10ms; /* pour IE
}

*/

S.AnimatedLine = options => {
    const opts = options
    const paths = S.Geb.class(opts.pathsClass)
    const pathsL = paths.length

    for (let i = 0; i < pathsL; i++) {
        animationLine(paths[i])
    }

    function animationLine (path) {
        const pathLength = path.getTotalLength()
        const start = opts.reverse ? 0 : pathLength
        const end = opts.reverse ? pathLength : 0

        path.style.strokeDasharray = pathLength
        path.style.opacity = 1

        const animate = new S.Animate(path, 'strokeDashoffset', start, end, opts.easing, opts.duration, {callback: opts.callback})
        animate.init()
    }
}
