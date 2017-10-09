var loginController = function() {
    
    function get(context) {
        templates.get('login')
        .then(function(template) {
            $('#hb-content').height('100%');

            $('#hb-content').html(template());
            $('#hb-header').html('');
            $('#hb-footer').html('');
            return Promise.resolve();
        });
    }

    return {
        get: get
    };

}();