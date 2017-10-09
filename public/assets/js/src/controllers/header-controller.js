var headerController = function() {
    
    function set({setFullHeader = false, title = '', subTitle = ''}) {
        var templateData = {
            showSlider: setFullHeader,
            showSmallHeaderHeight: !setFullHeader,
            title,
            subTitle
        };

        return cacheData.getVehicles()
            .then((vehicles) => {
                let mappedVehicles = vehicles.map((v, index) => {
                    v.isFirst = false;
                    if (index === vehicles.length) {
                        v.isFirst = true;
                    }
                    return v;
                });
                let newVehicles = [].concat(mappedVehicles);
                templateData.vehicles = newVehicles;
                return templates.get('header');
            })
            .then(function(template) {
                $('#hb-header').html(template(templateData));
                return Promise.resolve();
            });
    }

    return {
        set: set
    }

}();
