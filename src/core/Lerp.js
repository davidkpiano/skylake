/*

►►►  init : simple lerp (!== OP's algorithm used to prevent the floating-point error)

S.Lerp.init(start, end, multiplier)

►►►  extend : lerp with change of coordinates

S.Lerp.extend(nX, n0, n1, start, end)

*/

const Lerp = class {

    init (s, e, m) {
        return s + (e - s) * m
    }

    extend (nX, n0, n1, s, e) {
        return s + (e - s) / (n1 - n0) * (nX - 1)
    }

}

S.Lerp = new Lerp()
