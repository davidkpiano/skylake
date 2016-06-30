/*

S.Is.string(varToCheck)
S.Is.nodeList(nodes)

*/

S.Is = (function () {
    const string = varToCheck => {
        return typeof varToCheck === 'string'
    }

/*
    DISABLE → BUG WITH ROLLUP

    const nodeList = nodes => {
        const sdc = Object.prototype.toString.call(nodes)

        return typeof nodes === 'object' &&
            /^\[object (HTMLCollection|NodeList|Object)]$/.test(sdc) &&
            (typeof nodes.length === 'number') &&
            (nodes.length === 0 || (typeof nodes[0] === 'object' && nodes[0].nodeType > 0))
    }
*/

    return {
        string: string/*,
        nodeList: nodeList*/
    }
}())
