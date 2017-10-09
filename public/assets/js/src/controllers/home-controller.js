/*jshint esversion: 6 */

var homeController = function() {
    function get(context) {
        var templateData = {};

        generalHelper.setHeaderAndFooter({setFullHeader: true})
        .then(() => {
            return cacheData.getSupplies();
        })
        .then(function(supplies) {
            templateData.supplies = supplies.supplies;
            return templates.get('home');
        })
        .then(function(template) {
            $('#hb-content').html(template(templateData));
            return Promise.resolve();
        });
    }

    return {
        get: get
    };

}();