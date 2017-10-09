/*jshint esversion: 6 */

var footerController = function() {
    function set(context) {
        var templateData = {};

        return cacheData.getVehicles()
            .then((vehicles) => {
                templateData.vehicles = vehicles;
                return cacheData.getMaintenances();
            })
            .then((maintenances) => {
                templateData.maintenances = maintenances;
                return templates.get('footer');
            })
            .then(function(template) {
                $('#hb-footer').html(template(templateData));
                return Promise.resolve();
            });
    }

    return {
        set: set
    };

}();
