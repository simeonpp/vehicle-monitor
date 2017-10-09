var homeController = function() {
    var templateData = {};

    function get(context) {
        generalHelper.setHeaderAndFooter({setFullHeader: true})
        .then(() => {
            return cacheData.getSupplies();
        })
        .then(function(supplies) {
            templateData['supplies'] = supplies.supplies;
            return templates.get('home');
        })
        .then(function(template) {
            $('#hb-content').html(template(templateData));
            return Promise.resolve();
        });
    }

    return {
        get: get
    }

}();