var sammyApp = new Sammy('#hb-content', function() {
    
        var isUserLogged = function() {
            return authenticationHelper.validateSession();
        }

        this.get('#/', function(context) {
            context.redirect('#/home');
        });

        this.get('#/login', loginController.get);

        this.get('#/home', function(context) {
            if (isUserLogged()) {
                homeController.get(context);
            } else {
                context.redirect('#/login');
            }
        });

        this.get('#/vehicles', function(context) {
            if (isUserLogged()) {
                vehiclesController.get(context);
            } else {
                context.redirect('#/login');
            }
        });

        this.get('#/vehicles/:id', function(context) {
            if (isUserLogged()) {
                vehiclesController.getById(context);
            } else {
                context.redirect('#/login');
            }
        });

        this.get('#/maintenances', function(context) {
            if (isUserLogged()) {
                maintenancesController.get(context);
            } else {
                context.redirect('#/login');
            }
        });

        this.get('#/maintenances/:id', function(context) {
            if (isUserLogged()) {
                maintenancesController.getById(context);
            } else {
                context.redirect('#/login');
            }
        });

        this.get('#/supplies', function(context) {
            if (isUserLogged()) {
                suppliesController.get(context);
            } else {
                context.redirect('#/login');
            }
        });

        this.get('#/check-status/:id', function(context) {
            if (isUserLogged()) {
                checkStatusController.get(context);
            } else {
                context.redirect('#/login');
            }
        });
        
        // this.get(/.*/, function() { 
        //     ...
        //   });
    });
    