var vehiclesController = function() {
    const breadcrumbs = {
        list: [
            {name: 'Home', link: '#/home', isActive: false},
            {name: 'Vehicles list', isActive: true}
        ],
        detailed: [
            {name: 'Home', link: '#/home', isActive: false},
            {name: 'Vehicles list', link: '#/vehicles', isActive: false},
            {name: 'Vehicle details', isActive: true}
        ],
    };

    function get(context) {
        var templateData = { breadcrumbs: breadcrumbs.list };
        var page = context.params.page || 1;

        generalHelper.setHeaderAndFooter({
            title: 'Vehicles list',
            subTitle: 'Keep your vehicles in good driving conditions'
        })
        .then(() => {
            return vehiclesData.getAll(5, page)
        })
        .then((vehiclesResult) => {
            templateData.vehicles = vehiclesResult.results;
            templateData.pagination = vehiclesResult.pagination;
            return cacheData.getMaintenances()
        })
        .then(function(maintenances) {
            templateData.aside = { maintenances };
            return cacheData.getSupplies();            
        })
        .then(function(supplies) {
            templateData.aside.supplies = supplies.supplies;
            return cacheData.getCheckHistory();  
        })
        .then(function(checks) {
            templateData.aside.checks = checks;
            return templates.get('vehicles');
        })
        .then(function(template) {
            $('#hb-content').html(template(templateData));
            return Promise.resolve();
        });
    };

    function getById(context) {
        var templateData = { 
            breadcrumbs: breadcrumbs.detailed,
            aside: {}
        };
        var vehicleId = parseInt(context.params.id);

        return vehiclesData.getById(vehicleId)
            .then((vehicleDetails) => {
                templateData.vehicle = vehicleDetails;
                return maintenancesData.getAll(1, 1, vehicleId, true);
            })
            .then((vehicleMaintenances) => {
                templateData.maintenances = vehicleMaintenances.results;
                return generalHelper.setHeaderAndFooter({
                    title: templateData.vehicle.displayName,
                    subTitle: `Make ${templateData.vehicle.make}, model ${templateData.vehicle.model}, ${templateData.vehicle.mileage} km`
                });
            })
            .then(() => {
                return cacheData.getMaintenances();
            })
            .then((maintenances) => {
                templateData.aside.maintenances = maintenances;
                return suppliesData.getAll(6, 1, vehicleId);
            })
            .then((supplies) => {
                templateData.aside.supplies = supplies.results.supplies;
                return checksData.getAll(6, vehicleId);
            })
            .then((checkHistory) => {
                templateData.aside.checks = checkHistory;
                return templates.get('vehicle-detailed');
            })
            .then(function(template) {
                $('#hb-content').html(template(templateData));
                return Promise.resolve();
            });
    };

    return {
        get,
        getById
    }

}();