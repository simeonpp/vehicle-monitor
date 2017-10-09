var templates = function() {
    
    var Handlebars = window.handlebars || window.Handlebars,
        handlebars = window.handlebars || window.Handlebars;

    Handlebars.registerHelper('formatShortDate', function(date) {
        var jsDate = new Date(date);
        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[jsDate.getMonth()] + ' ' + jsDate.getDate() + ', ' + jsDate.getFullYear();
    });

    Handlebars.registerHelper('accountNumber', function(date) {
        return date.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';
        for(var i = 1; i < n + 1; ++i)
            accum += block.fn(i);
        return accum;
    });

    function get(templateName) {
        var promise = new Promise(function(resolve, reject) {
            var url = "templates/" + templateName + '.handlebars';

            jsonRequester.get(url)
                .then(function(html) {
                    var template = Handlebars.compile(html);
                    resolve(template);
                })
        });

        return promise;
    }

    return {
        get: get
    }

}();
    