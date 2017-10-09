var maintenancesData = function() {
    var url = '/api/maintenances.php';

    function getAll(pageSize = 10, vehicleId, noPaging) {
        var options = {headers: authenticationHelper.getAuthenticationHeaders()};
        var pageSizedUrl = url + '?pageSize=' + pageSize;
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

    return {
        getAll
    }

}();