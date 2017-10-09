var jsonRequester = function() {
    
    function send(url, method, options) {
        options = options || {};
        // var defaultHeader = {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        //     'Access-Control-Allow-Methods': 'GET, POST, PUT'
        // }
        var headers = options.headers || {},
            data = options.data || undefined;

        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url: url,
                method: method,
                headers: headers,
                data: JSON.stringify(data),
                success: function(response) {
                    if (response.error) {
                        reject(response.error);
                    } else {
                        resolve(response);
                    }
                },
                error: function(error) {
                    reject(error);
                }
            });
        });

        return promise;
    }

    function get(url, options){
        return send(url, 'GET', options);
    }

    function post(url, options){
        return send(url, 'POST', options);
    }

    return {
        get,
        post
    }

}();
    