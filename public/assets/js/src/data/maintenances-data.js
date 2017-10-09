var maintenancesData = function() {
    var url = '/api/maintenances.php';

    function getAll(pageSize = 10) {
        var options = {headers: authenticationHelper.getAuthenticationHeaders()};
        var pageSizedUrl = url + '?pageSize=' + pageSize;
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