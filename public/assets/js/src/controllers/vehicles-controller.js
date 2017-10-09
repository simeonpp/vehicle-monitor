var vehiclesController = function() {
    const breadcrumbs = [
        {name: 'Home', link: '#/home', isActive: false},
        {name: 'Vehicles list', isActive: true}
    ];

    function get(context) {
        var templateData = { breadcrumbs };
        var page = context.params.page || 1;

        generalHelper.setHeaderAndFooter({
            title: 'Vehicles list',
            subTitle: 'Keep your vehicles in good driving conditions'
        })
        .then(() => {
            return vehiclesData.getAll(2, page)
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
            templateData.aside.checks = checks.map(check => {
                if (parseInt(check.checkStatus) === 1) {
                    check.checkStatus = true;
                } else {
                    check.checkStatus = false;
                }
                return check;
            });
            return templates.get('vehicles');
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