/*

const isString = S.Is.string(varToCheck)
const isObject = S.Is.object(varToCheck)

*/

const Is = class {

    string (v) {
        return typeof v === 'string'
    }

    object (v) {
        return v === Object(v)
    }

    array (v) {
        v.constructor === Array
    }

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

}

S.Is = new Is()
