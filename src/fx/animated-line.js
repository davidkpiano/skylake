/*

EXPLOITATION JS
───────────────

S.AnimatedLine({
    pathsClass: 'pathsClassName',
    duration: 300,
    easing: 'linear',
    callback: false
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

S.AnimatedLine = (options) => {
    const opts = options
    const paths = S.Geb.class(opts.pathsClass)
    const pathsL = paths.length

    for (let i = 0; i < pathsL; i++) {
        animationLine(paths[i])
    }

    function animationLine (path) {
        const start = path.getTotalLength()

        path.style.strokeDasharray = start
        path.style.opacity = 1

        const animate = new S.Animate({
            element: path,
            parameter: 'strokeDashoffset',
            start: start,
            end: 0,
            easing: opts.easing,
            duration: opts.duration,
            callback: opts.callback
        })
        animate.init()
    }
}
