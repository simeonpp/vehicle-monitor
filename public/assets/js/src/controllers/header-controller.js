var headerController = function() {
    
    function set({setFullHeader = false, title = '', subTitle = ''}) {
        return templates.get('header')
            .then(function(template) {
                var data = {
                    showSlider: setFullHeader,
                    showSmallHeaderHeight: !setFullHeader,
                    title,
                    subTitle
                };
                $('#hb-header').html(template(data));
                return Promise.resolve();
            });
    }

    return {
        set: set
    }

}();
