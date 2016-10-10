/*

const isString = S.Is.string(varToCheck)
const isObject = S.Is.object(varToCheck)

*/

S.Is = (function () {
    var string = function (v) {
        return typeof v === 'string'
    }

    var object = function (v) {
        return v === Object(v)
    }

    var array = function (v) {
        v.constructor === Array
    }

    return {
        string: string,
        object: object,
        array: array
    }
}())

/*
    DISABLE → BUG WITH ROLLUP

    nodeList (nodes) {
        const sdc = Object.prototype.toString.call(nodes)

        return typeof nodes === 'object' &&
            /^\[object (HTMLCollection|NodeList|Object)]$/.test(sdc) &&
            (typeof nodes.length === 'number') &&
            (nodes.length === 0 || (typeof nodes[0] === 'object' && nodes[0].nodeType > 0))
    }
*/
