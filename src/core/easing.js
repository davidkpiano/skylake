/*

easingMultiplier = S.Easing['linear'](multiplier)

*/

var e = {
    s: 1.70158,
    q: 2.25,
    r: 1.525,
    u: 0.984375,
    v: 7.5625,
    w: 0.9375,
    x: 2.75,
    y: 2.625,
    z: 0.75
}

S.Easing = {
    linear: function (m) { return m },
    Power1In: function (m) { return -Math.cos(m * (Math.PI / 2)) + 1 },
    Power1Out: function (m) { return Math.sin(m * (Math.PI / 2)) },
    Power1InOut: function (m) { return (-0.5 * (Math.cos(Math.PI * m) - 1)) },
    Power2In: function (m) { return m * m },
    Power2Out: function (m) { return m * (2 - m) },
    Power2InOut: function (m) { return m < 0.5 ? 2 * m * m : -1 + (4 - 2 * m) * m },
    Power3In: function (m) { return m * m * m },
    Power3Out: function (m) { return (--m) * m * m + 1 },
    Power3InOut: function (m) { return m < 0.5 ? 4 * m * m * m : (m - 1) * (2 * m - 2) * (2 * m - 2) + 1 },
    Power4In: function (m) { return m * m * m * m },
    Power4Out: function (m) { return 1 - (--m) * m * m * m },
    Power4InOut: function (m) { return m < 0.5 ? 8 * m * m * m * m : 1 - 8 * (--m) * m * m * m },
    Power5In: function (m) { return m * m * m * m * m },
    Power5Out: function (m) { return 1 + (--m) * m * m * m * m },
    Power5InOut: function (m) { return m < 0.5 ? 16 * m * m * m * m * m : 1 + 16 * (--m) * m * m * m * m },
    ExpoIn: function (m) { return (m === 0) ? 0 : Math.pow(2, 10 * (m - 1)) },
    ExpoOut: function (m) { return (m === 1) ? 1 : -Math.pow(2, -10 * m) + 1 },
    ExpoInOut: function (m) { if (m === 0) { return 0 } if (m === 1) { return 1 } if ((m /= 0.5) < 1) { return 0.5 * Math.pow(2, 10 * (m - 1)) } else { return 0.5 * (-Math.pow(2, -10 * --m) + 2) } },
    CircIn: function (m) { return -(Math.sqrt(1 - (m * m)) - 1) },
    CircOut: function (m) { return Math.sqrt(1 - Math.pow((m - 1), 2)) },
    CircInOut: function (m) { if ((m /= 0.5) < 1) { return -0.5 * (Math.sqrt(1 - m * m) - 1) } else { return 0.5 * (Math.sqrt(1 - (m -= 2) * m) + 1) } },
    BackIn: function (m) { return m * m * ((e.s + 1) * m - e.s) },
    BackOut: function (m) { return (m = m - 1) * m * ((e.s + 1) * m + e.s) + 1 },
    BackInOut: function (m) { if ((m /= 0.5) < 1) { return 0.5 * (m * m * (((e.s *= (e.r)) + 1) * m - e.s)) } else { return 0.5 * ((m -= 2) * m * (((e.s *= (e.r)) + 1) * m + e.s) + 2) } },
    Elastic: function (m) { return -1 * Math.pow(4, -8 * m) * Math.sin((m * 6 - 1) * (2 * Math.PI) / 2) + 1 },
    SwingFromTo: function (m) { return ((m /= 0.5) < 1) ? 0.5 * (m * m * (((e.s *= (e.r)) + 1) * m - e.s)) : 0.5 * ((m -= 2) * m * (((e.s *= (e.r)) + 1) * m + e.s) + 2) },
    SwingFrom: function (m) { return m * m * ((e.s + 1) * m - e.s) },
    SwingTo: function (m) { return (m -= 1) * m * ((e.s + 1) * m + e.s) + 1 },
    Bounce: function (m) { if (m < 1 / e.x) { return (e.v * m * m) } else if (m < 2 / e.x) { return (e.v * (m -= (1.5 / e.x)) * m + e.z) } else if (m < 2.5 / e.x) { return (e.v * (m -= (e.q / e.x)) * m + e.w) } else { return (e.v * (m -= (e.y / e.x)) * m + e.u) } },
    BounceOut: function (m) { if (m < 1 / e.x) { return (e.v * m * m) } else if (m < 2 / e.x) { return (e.v * (m -= (1.5 / e.x)) * m + e.z) } else if (m < 2.5 / e.x) { return (e.v * (m -= (e.q / e.x)) * m + e.w) } else { return (e.v * (m -= (e.y / e.x)) * m + e.u) } },
    BouncePast: function (m) { if (m < 1 / e.x) { return (e.v * m * m) } else if (m < 2 / e.x) { return 2 - (e.v * (m -= (1.5 / e.x)) * m + e.z) } else if (m < 2.5 / e.x) { return 2 - (e.v * (m -= (e.q / e.x)) * m + e.w) } else { return 2 - (e.v * (m -= (e.y / e.x)) * m + e.u) } },
    FromTo: function (m) { if ((m /= 0.5) < 1) { return 0.5 * Math.pow(m, 4) } else { return -0.5 * ((m -= 2) * Math.pow(m, 3) - 2) } },
    From: function (m) { return Math.pow(m, 4) },
    To: function (m) { return Math.pow(m, 0.25) }
}
