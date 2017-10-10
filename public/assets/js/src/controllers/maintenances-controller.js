/*jshint esversion: 6 */

var maintenancesController = function() {
    const breadcrumbs = {
        list: [
            {name: 'Home', link: '#/home', isActive: false},
            {name: 'Maintenances list', isActive: true}
        ],
        detailed: [
            {name: 'Home', link: '#/home', isActive: false},
            {name: 'Maintenances list', link: '#/maintenances', isActive: false},
            {name: 'Maintenance details', isActive: true}
        ],
    };

    function get(context) {
        var templateData = { 
            breadcrumbs: breadcrumbs.list,
            aside: {}
        };
        var page = context.params.page || 1;
        var filterVehicleId = context.params.vehicleId;
        if (filterVehicleId === "0") {
            filterVehicleId = null;
        }

        generalHelper.setHeaderAndFooter({
            title: 'Maintenances list',
            subTitle: 'Check your latest maintenances'
        }).then(() => {
            return maintenancesData.getAll(5, page, filterVehicleId);
        })
        .then((maintenancesResult) => {
            templateData.maintenances = maintenancesResult.results;
            templateData.pagination = maintenancesResult.pagination;
            return cacheData.getSupplies();  
        })
        .then(function(supplies) {
            templateData.aside.supplies = supplies.supplies;
            templateData.aside.stringifySupplies = JSON.stringify(templateData.aside.supplies);
            return cacheData.getVehicles();
        })
        .then((vehicles) => {
            let asideVehicles = [].concat(vehicles.map((v) => {
                v.filterByIsActive = false;
                if (v.id === filterVehicleId) {
                    v.filterByIsActive = true;
                }
                return v;
            }));
            templateData.aside.vehicles = asideVehicles;
            return cacheData.getCheckHistory();  
        })
        .then(function(checks) {
            templateData.aside.checks = checks;
            return templates.get('maintenances');
        })
        .then(function(template) {
            $('#hb-content').html(template(templateData));
            return Promise.resolve();
        });
    }

    function getById(context) {
        var templateData = { 
            breadcrumbs: breadcrumbs.detailed,
            aside: {}
        };
        var maintenanceId = parseInt(context.params.id);

        return maintenancesData.getById(maintenanceId)
            .then((maintenanceDetails) => {
                templateData.maintenance = maintenanceDetails.maintenance;
                templateData.supplies = maintenanceDetails.supplies;

                return generalHelper.setHeaderAndFooter({
                    title: templateData.maintenance.service,
                    subTitle: `Price ${templateData.maintenance.price} BGN, mileage ${templateData.maintenance.mileage} km | on ${generalHelper.formatShortDate(templateData.maintenance.dateCreated)}`
                });
            })
            .then(() => {
                return cacheData.getMaintenances();
            })
            .then((maintenances) => {
                templateData.aside.maintenances = maintenances;
                return cacheData.getVehicles();
            })
            .then((vehicles) => {
                templateData.aside.vehicles = vehicles;
                return cacheData.getCheckHistory();  
            })
            .then(function(checks) {
                templateData.aside.checks = checks;
                return templates.get('maintenance-detailed');
            })
            .then(function(template) {
                $('#hb-content').html(template(templateData));
                return Promise.resolve();
            });
    }

    return {
        get,
        getById
    };

}();