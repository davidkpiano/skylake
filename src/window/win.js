/*

const winH = S.Win.h()
const path = S.Win.path()

*/

S.Win = {
    w: () => {
        return window.innerWidth
    },
    h: () => {
        return window.innerHeight
    },
    path: () => {
        return window.location.pathname
    },
    href: () => {
        return window.location.href
    },
    perfNow: () => {
        return window.performance.now()
    }
}
