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
        
        // this.get(/.*/, function() { 
        //     ...
        //   });
    });
    