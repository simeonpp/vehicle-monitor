/*jshint esversion: 6 */

var cacheData = function() {
    var cache = {};
    const expireCacheMinutes = 15;

    var getVehicles = function() {
        var promise = new Promise(function(resolve, reject) {
            if (!cache.vehicles || (cache.vehicles && cache.vehicles.cacheExpireDate < new Date() )) {
                return vehiclesData.getAll(6) 
                    .then(function(vehiclesResult) {
                        cache.vehicles = vehiclesResult;
                        var now = new Date();
                        var cacheExpireDate = new Date(now.getTime() + expireCacheMinutes * 60000);
                        cache.vehicles.cacheExpireDate = cacheExpireDate;
                        return resolve(cache.vehicles.results);
                    });
            } else {
                return resolve(cache.vehicles.results);
            }
        });

        return promise;
    };

    var getMaintenances = function() {
        var promise = new Promise(function(resolve, reject) {
            if (!cache.maintenances || (cache.maintenances && cache.maintenances.cacheExpireDate < new Date() )) {
                return maintenancesData.getAll(6)    
                    .then(function(maintenancesResult) {
                        cache.maintenances = maintenancesResult;
                        var now = new Date();
                        var cacheExpireDate = new Date(now.getTime() + expireCacheMinutes * 60000);
                        cache.maintenances.cacheExpireDate = cacheExpireDate;
                        return resolve(cache.maintenances.results);
                    });
            } else {
                return resolve(cache.maintenances.results);
            }
        });

        return promise;
    };

    var getSupplies = function() {
        var promise = new Promise(function(resolve, reject) {
            if (!cache.supplies || (cache.supplies && cache.supplies.cacheExpireDate < new Date() )) {
                return suppliesData.getAll(5)    
                    .then(function(suppliesResult) {
                        cache.supplies = suppliesResult;
                        var now = new Date();
                        var cacheExpireDate = new Date(now.getTime() + expireCacheMinutes * 60000);
                        cache.supplies.cacheExpireDate = cacheExpireDate;
                        return resolve(cache.supplies.results);
                    });
            } else {
                return resolve(cache.supplies.results);
            }
        });

        return promise;
    };

    var getCheckHistory = function() {
        var mapChecks = function(check) {
            if (parseInt(check.checkStatus) === 1) {
                check.checkStatus = true;
            } else {
                check.checkStatus = false;
            }
            return check;
        };

        var promise = new Promise(function(resolve, reject) {
            if (!cache.checks || (cache.checks && cache.checks.cacheExpireDate < new Date() )) {
                return checksData.getAll(5)    
                    .then(function(checkHistoryResult) {
                        cache.checks = checkHistoryResult;
                        var now = new Date();
                        var cacheExpireDate = new Date(now.getTime() + expireCacheMinutes * 60000);
                        cache.checks.cacheExpireDate = cacheExpireDate;
                        return resolve(cache.checks.map(mapChecks));
                    }); 
            } else {
                return resolve(cache.checks);
            }
        });

        return promise;
    };

    // const cacheKeyGetterMapper = {
    //     vehicles: getVehicles,
    //     maintenances: getMaintenances
    // }
    // var get = function(cacheKeys = []) {
    //     var cachePromises = [];
    //     cacheKeys.forEach(cacheKey => {
    //         debugger;
    //         if (cacheKeyGetterMapper[cacheKey]) {
    //             cachePromises.push(cacheKeyGetterMapper[cacheKey]);
    //         } else {
    //             cachePromises.push(Promise.resolve());
    //         }
    //     });});

    //     return Promise.all(cachePromises)
    //         .then(cacheResults => {
    //             var cacheResultObject = {};
    //             cacheKeys.forEach((cacheKey, index) => {
    //                 debugger;
    //                 cacheResultObject[cacheKey] = cachePromises[index];
    //             });
    //             return cacheResultObject;
    //         });
    // }

    return {
        // get
        getVehicles,
        getMaintenances,
        getSupplies,
        getCheckHistory
    };

}();