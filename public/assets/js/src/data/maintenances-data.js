var maintenancesData = function() {
    var url = '/api/maintenances.php';

    function getAll(pageSize = 10, page = 1, vehicleId, noPaging) {
        var options = {headers: authenticationHelper.getAuthenticationHeaders()};
        let pageSizedUrl = `${url}?pageSize=${pageSize}&page=${page}`;
        if (vehicleId) {
            pageSizedUrl += `&vehicleId=${vehicleId}`;
        }
        if (noPaging) {
            pageSizedUrl += `&noPaging=true`;
        }

        return jsonRequester.get(data.buildUri(pageSizedUrl), options)
            .then(function(maintenances) {
                return maintenances;
            })
            .catch(function(error) {
                generalHelper.handleError(error);
            });
    }

    function getById(maintenanceId) {
        const options = {headers: authenticationHelper.getAuthenticationHeaders()};
        const maintenanceByIdUrl = `${url}/${maintenanceId}`;
        return jsonRequester.get(data.buildUri(maintenanceByIdUrl), options)
            .then(function(maintenanceDetails) {
                return maintenanceDetails;
            })
            .catch(function(error) {
                generalHelper.handleError(error);
            });
    }

    return {
        getAll,
        getById
    }

}();