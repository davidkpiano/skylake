/*

►►►  Scroll immediatly to top

S.ScrollZero()

*/

S.ScrollZero = () => {
    const defaultScrolled = S.Detect.defaultScrolled()

    defaultScrolled.scrollTop = 0
}
