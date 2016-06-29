/*

S.Controller(pageName, myCallback, args);

function myCallback(response, args) {

    // Insert HTML
    app.insertAdjacentHTML('beforeend', response);

}

*/

S.Controller = (page, callback, args) => {
    const path = 'index.php?url=' + page + '&xhr=true'
    const req = new XMLHttpRequest()

    req.open('GET', path, true)

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            const xhrController = JSON.parse(req.responseText).xhrController

            getHeadUpdate(xhrController)
            getHistoryUpdate()
            callback(xhrController.view, args)
        }
    }
    req.send(null)

    // Head update
    function getHeadUpdate (xhrController) {
        const cannonicalLink = S.Geb.tag('link')[0]
        const titleTag       = S.Geb.tag('title')[0]
        const metaTag        = S.Geb.tag('meta')
        const metaTagL       = metaTag.length
        const url            = xhrController.head.url
        const title          = xhrController.head.title
        const description    = xhrController.head.description
        const keywords       = xhrController.head.keywords

        cannonicalLink.href = url

        titleTag.textContent = title

        for (let i = 0; i < metaTagL; i++) {
            const meta         = metaTag[i]
            const metaName     = meta.getAttribute('name')
            const metaItemprop = meta.getAttribute('itemprop')
            const metaProperty = meta.getAttribute('property')

            if (metaName) {
                // Description
                if (metaName === 'description') {
                    updateMeta(meta, description)
                // Keywords
                } else if (metaName === 'keywords') {
                    updateMeta(meta, keywords)
                // Twitter title
                } else if (metaName === 'twitter:title') {
                    updateMeta(meta, title)
                // Twitter description
                } else if (metaName === 'twitter:description') {
                    updateMeta(meta, description)
                }
            } else if (metaItemprop) {
                // Google+ name
                if (metaItemprop === 'name') {
                    updateMeta(meta, title)
                // Google+ description
                } else if (metaItemprop === 'description') {
                    updateMeta(meta, description)
                }
            } else if (metaProperty) {
                // Facebook url
                if (metaProperty === 'og:url') {
                    updateMeta(meta, url)
                // Facebook title
                } else if (metaProperty === 'og:title') {
                    updateMeta(meta, title)
                // Facebook descripiton
                } else if (metaProperty === 'og:description') {
                    updateMeta(meta, description)
                }
            }
        }

        function updateMeta (meta, data) {
            meta.setAttribute('content', data)
        }
    }

    // Browser history update
    function getHistoryUpdate () {
        const pageUrl = page === 'home' ? '/' : page

        history.pushState({key: 'value'}, 'titre', pageUrl)
    }
}
