/*jshint esversion: 6 */

var vehiclesData = function() {
    var url = '/api/vehicles.php';

    // maintenances.php?pageSize=3&page=1&vehicleId=1
    function getAll(pageSize = 10, page = 1) {
        const options = {headers: authenticationHelper.getAuthenticationHeaders()};
        const pageSizedUrl = `${url}?pageSize=${pageSize}&page=${page}`;
        return jsonRequester.get(data.buildUri(pageSizedUrl), options)
            .then(function(vehicles) {
                return vehicles;
            })
            .catch(function(error) {
                generalHelper.handleError(error);
            });
    }

    function getById(vehicleId) {
        const options = {headers: authenticationHelper.getAuthenticationHeaders()};
        const vehicleByIdUrl = `${url}/${vehicleId}`;
        return jsonRequester.get(data.buildUri(vehicleByIdUrl), options)
            .then(function(vehicleDetails) {
                return vehicleDetails;
            })
            .catch(function(error) {
                generalHelper.handleError(error);
            });
    }

    return {
        getAll,
        getById
    };

}();