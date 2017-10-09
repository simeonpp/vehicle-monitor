var data = function() {
    var host = 'http://localhost/vehicleMonitor';

    function buildUri(url) {
        return host + url;
    }

    return {
        buildUri
    }

}();