/*jshint esversion: 6 */

var suppliesData = function() {
    var url = '/api/supplies.php';

    function getAll(pageSize = 10, page = 1, vehicleId = null) {
        var options = {headers: authenticationHelper.getAuthenticationHeaders()};
        let pageSizedUrl = `${url}?pageSize=${pageSize}&page=${page}`;
        if (vehicleId) {
            pageSizedUrl += `&vehicleId=${vehicleId}`;
        }

        return jsonRequester.get(data.buildUri(pageSizedUrl), options)
            .then(function(supplies) {
                return supplies;
            })
            .catch(function(error) {
                generalHelper.handleError(error);
            });
    }

    return {
        getAll
    };

}();