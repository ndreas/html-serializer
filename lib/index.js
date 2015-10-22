var resolve = require('url').resolve;
var Promise = require('bluebird');
var jsdom   = require('jsdom');
var loadDom = Promise.promisify(jsdom.env);
var request = require('request').defaults({ encoding: null });
var get     = Promise.promisify(request.get);

module.exports = function serialize(url) {
    return loadDom(url, ['http://code.jquery.com/jquery-1.11.3.min.js'])
    .then(function(window) {
        var $ = window.$;
        var ps = [];

        $('img').each(function() {
            ps.push(replaceImage(url, $(this)));
        });

        return Promise.all(ps)
        .then(function() {
            $('script.jsdom').remove();
            return Promise.resolve(jsdom.serializeDocument(window.document));
        });
    });
}

function replaceImage(url, $img) {
    var img = $img.attr("src");

    return get(resolve(url, img))
    .spread(function(res, body) {
        var contentType = res.headers['content-type'];
        var base64 = body.toString('base64');
        $img.attr('src', 'data:' + contentType + ';base64,' + base64);
    });
}
