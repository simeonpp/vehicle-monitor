/*jshint esversion: 6 */

var suppliesController = function() {

    const breadcrumbs = {
        list: [
            {name: 'Home', link: '#/home', isActive: false},
            {name: 'Supplies list', isActive: true}
        ]
    };

    function get(context) {
        let title = 'Supplies list';
        var page = context.params.page || 1;
        var filterVehicleId = context.params.vehicleId;
        if (filterVehicleId === "0") {
            filterVehicleId = null;
        }
        var templateData = { 
            breadcrumbs: breadcrumbs.list,
            aside: {},
            filters: {
                hasActiveFilter: filterVehicleId !== null,
                vehicleId: filterVehicleId
            }
        };

        return suppliesData.getAll(5, page, filterVehicleId)
            .then((suppliesResult) => {
                templateData.supplies = suppliesResult.results.supplies;
                templateData.pagination = suppliesResult.pagination;
                return cacheData.getMaintenances();
            })
            .then(function(maintenances) {
                templateData.aside.maintenances = maintenances;
                return cacheData.getVehicles();
            })
            .then((vehicles) => {
                let asideVehicles = [].concat(vehicles.map((v) => {
                    v.filterByIsActive = false;
                    if (v.id === filterVehicleId) {
                        v.filterByIsActive = true;
                        title += ' for ' + v.displayName;
                    }
                    return v;
                }));
                templateData.aside.vehicles = asideVehicles;
                return cacheData.getCheckHistory();  
            })
            .then(function(checks) {
                templateData.aside.checks = checks;
                return generalHelper.setHeaderAndFooter({
                    title,
                    subTitle: 'Configure vehicle supply settings'
                });
            })
            .then(() => {
                return templates.get('supplies');
            })
            .then(function(template) {
                $('#hb-content').html(template(templateData));
                return Promise.resolve();
            });
    }

    return {
        get
    };

}();