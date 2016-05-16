/*

►►►  id only

S.AutoTransitionend('home-number', callbacks, args)

*/

S.AutoTransitionend = (elName, callback, args) => {
    let el = S.Geb.id(elName)

    listener('add')

    function beforeCallback (event) {
        event.stopPropagation()

        listener('remove')

        getCallback()
    }

    function getCallback () {
        callback(args)
    }

    function listener (action) {
        S.Listen(el, action, 'transitionend', beforeCallback)
    }
}
