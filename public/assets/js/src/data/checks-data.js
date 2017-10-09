var checksData = function() {
    var url = '/api/checks.php';

    function getAll(pageSize = 10, vehicleId) {
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

    return {
        getAll
    }

}();