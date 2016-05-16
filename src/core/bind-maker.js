/*

S.BindMaker(this, ['bindFunction1', 'bindFunction2', 'bindFunction3'])

*/

S.BindMaker = (self, bindArray) => {
    const bindArrayL = bindArray.length

    for (let i = 0; i < bindArrayL; i++) {
        self[bindArray[i]] = self[bindArray[i]].bind(self)
    }
}
