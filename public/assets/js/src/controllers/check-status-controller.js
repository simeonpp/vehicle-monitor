/*jshint esversion: 6 */

var checkStatusController = function() {
    const breadcrumbs = {
        detailed: [
            {name: 'Home', link: '#/home', isActive: false},
            {name: 'Check status', isActive: true}
        ],
    };

    var mapChecks = function(checks) {
        var result = {
            checkStatus: checks.checkStatus,
            recommendationStatus: checks.recommendationStatus,
            checks: []
        };

        result.checks = checks.checks.map(check => {
            var status = 'Good';
            if (check.checkStatus && !check.recommendationStatus) {
                status = 'Warning';
            }
            if (!check.checkStatus && !check.recommendationStatus) {
                status = 'Bad';
            }

            check.status = status;
            return check;
        });

        return result;
    };

    function get(context) {
        var templateData = { 
            breadcrumbs: breadcrumbs.detailed
        };

        var vehicleId = parseInt(context.params.id);
        var mileage = context.params.mileage || 1;

        return vehiclesData.getById(vehicleId)
            .then((vehicleDetails) => {
                templateData.vehicle = vehicleDetails;

                return generalHelper.setHeaderAndFooter({
                    title: `Check status for ${vehicleDetails.displayName}`,
                    subTitle: `Make ${vehicleDetails.make}, model ${vehicleDetails.model}, ${vehicleDetails.mileage} km`
                });
            })
            .then(() => {
                return checksData.check(vehicleId, mileage);
            })
            .then((checkStatus) => {
                templateData.checkStatus = mapChecks(checkStatus);
                let statusTitle = 'Your vehicle is good to go';
                let imageIconName = 'success';
                if (checkStatus.checkStatus && !checkStatus.recommendationStatus) {
                    statusTitle = 'Your vehicle might be better';
                    imageIconName = 'warning';
                }
                if (!checkStatus.checkStatus && !checkStatus.recommendationStatus) {
                    statusTitle = 'Your vehicle is running bad';
                    imageIconName = 'bad';
                }

                templateData.checkStatus.statusTitle = statusTitle;
                templateData.checkStatus.imageIconName = imageIconName;

                return templates.get('check-status');
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
