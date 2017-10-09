/*jshint esversion: 6 */

var checksData = function() {
    var url = '/api/checks.php';

    function getAll(pageSize = 10, vehicleId = null) {
        var options = {headers: authenticationHelper.getAuthenticationHeaders()};
        var pageSizedUrl = url + '?pageSize=' + pageSize;
        if (vehicleId) {
            pageSizedUrl += `&vehicleId=${vehicleId}`;
        }

        return jsonRequester.get(data.buildUri(pageSizedUrl), options)
            .then(function(checkHistory) {
                return checkHistory;
            })
            .catch(function(error) {
                generalHelper.handleError(error);
            });
    }

    function check(vehicleId, mileage = 1) {
        var options = {
            headers: authenticationHelper.getAuthenticationHeaders(),
            data: {
                vehicleId: parseInt(vehicleId),
                mileage: parseInt(mileage)
            }
        };
        return jsonRequester.post(data.buildUri(url), options)
            .then(function(checkStatus) {
                return checkStatus;
            })
            .catch(function(error) {
                generalHelper.handleError(error);
            });
    }

    return {
        getAll,
        check
    };

}();