/*

S.BindMaker(this, ['bindFunction1', 'bindFunction2', 'bindFunction3'])

*/

S.BindMaker = function (self, bindArray) {
    var bindArrayL = bindArray.length

    for (var i = 0; i < bindArrayL; i++) {
        self[bindArray[i]] = self[bindArray[i]].bind(self)
    }
}
