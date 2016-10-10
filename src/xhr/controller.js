/*

S.Controller(pageName, myCallback, args);

function myCallback(response, args) {

    // Insert HTML
    app.insertAdjacentHTML('beforeend', response);

}

*/

S.Controller = function (page, callback, args) {
    var path = 'index.php?url=' + page + '&xhr=true'
    var xhr = new XMLHttpRequest()

    xhr.open('GET', path, true)

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var xhrController = JSON.parse(xhr.responseText).xhrController

            getHeadUpdate(xhrController)
            getHistoryUpdate()
            callback(xhrController.view, args)
        }
    }
    xhr.send(null)

    // Head update
    function getHeadUpdate (xhrController) {
        var cannonicalLink = S.Geb.tag('link')[0]
        var titleTag       = S.Geb.tag('title')[0]
        var metaTag        = S.Geb.tag('meta')
        var metaTagL       = metaTag.length
        var url            = xhrController.head.url
        var title          = xhrController.head.title
        var description    = xhrController.head.description
        var keywords       = xhrController.head.keywords

        cannonicalLink.href = url

        titleTag.textContent = title

        for (var i = 0; i < metaTagL; i++) {
            var meta         = metaTag[i]
            var metaName     = meta.getAttribute('name')
            var metaItemprop = meta.getAttribute('itemprop')
            var metaProperty = meta.getAttribute('property')

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
        var pageUrl = page === 'home' ? '/' : page

        history.pushState({key: 'value'}, 'titre', pageUrl)
    }
}
