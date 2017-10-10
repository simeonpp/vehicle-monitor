// Open & Close pop up logic

var addMaintenancePopUp = document.getElementById('addMaintenancePopUp');
var addNewMaintenanceButton = document.getElementById('addNewMaintenanceButton');
var addMaintenancePopUpCloseBtn = document.getElementById('addMaintenancePopUpCloseBtn');

var closeAddMaintenancePopUp = function() {
    addMaintenancePopUp.style.height = '0';
};
var openAddMaintenancePopUp = function() {
    addMaintenancePopUp.style.height = '100%';
};

addNewMaintenanceButton.addEventListener('click', function() {
    openAddMaintenancePopUp();
});
addMaintenancePopUpCloseBtn.addEventListener('click', function() {
    closeAddMaintenancePopUp();
});

// Supplies box logic
var templateDataSupplies = document.getElementById('suppliesData');
templateDataSupplies = JSON.parse(templateDataSupplies.attributes['data-supplies'].value);

var addMaintenanceAddedSupplies = 0;
var addMaintenanceAddSupplyBtn = document.getElementById('addMaintenanceAddSupplyBtn');
var addMaintenanceDivToAppend = document.getElementById('addMaintenanceDivToAppend');
var addMaintenanceSubmitButton = document.getElementById('addMaintenanceSubmitButton');

addMaintenanceAddSupplyBtn.addEventListener('click', function() {
    templates.get('add-maintenance-pop-up-supply-template')
        .then(function(template) {
            addMaintenanceAddedSupplies += 1;
            var templateData = { 
                maintenanceNumber: addMaintenanceAddedSupplies,
                supplies: templateDataSupplies
            };
            var supplyDiv = template(templateData);
            addMaintenanceDivToAppend.innerHTML += supplyDiv;

            if (addMaintenanceAddedSupplies === templateDataSupplies.length) {
                addMaintenanceAddSupplyBtn.style.display = 'none';
            } else {
                addMaintenanceAddSupplyBtn.style.display = 'inline';
            }
        });
});

document.addEventListener('click',function(e){
    if(e.target && e.target.classList && Array.from(e.target.classList).indexOf('addMaintenanceSupplyDelete') >= 0) {
        var countNumber = parseInt(e.target.attributes['data-number'].value);
        var divToDelete = document.getElementById('addMaintenanceSupply-' + countNumber);
        if (divToDelete) {
            divToDelete.outerHTML = '';

            addMaintenanceAddedSupplies -= 1;
            if (addMaintenanceAddedSupplies === templateDataSupplies.length) {
                addMaintenanceAddSupplyBtn.style.display = 'none';
            } else {
                addMaintenanceAddSupplyBtn.style.display = 'inline';
            }
        }
    }
 });

 var addMaintenanceVehicleSelect = document.getElementById('addMaintenanceVehicleSelect');
 var addMaintenancePrice = document.getElementById('addMaintenancePrice');
 var addMaintenanceMileage = document.getElementById('addMaintenanceMileage');
 var addMaintenanceService = document.getElementById('addMaintenanceService');
 var addMaintenanceDescription = document.getElementById('addMaintenanceDescription');
 addMaintenanceSubmitButton.addEventListener('click', function() {
     var postData = {
        vehicleId: parseInt(addMaintenanceVehicleSelect.options[addMaintenanceVehicleSelect.selectedIndex].value),
        price: parseInt(addMaintenancePrice.value),
        mileage: parseInt(addMaintenanceMileage.value),
        service: addMaintenanceService.value,
        description: addMaintenanceDescription.value,
        supplies: []
     };

     for (var i = 1; i <= addMaintenanceAddedSupplies; i++) {
        var addMaintenanceSupplySupplyIdSelect = document.getElementById('addMaintenanceSupplySupplyIdSelect-' + i);
        var addMaintenanceSupplySupplyName = document.getElementById('addMaintenanceSupplySupplyName-' + i);
        var addMaintenanceSupplyQuantity = document.getElementById('addMaintenanceSupplyQuantity-' + i);
        var addMaintenanceSupplyPrice = document.getElementById('addMaintenanceSupplyPrice-' + i);

        var currentSupplyObj = {
            supplyId: parseInt(addMaintenanceSupplySupplyIdSelect.options[addMaintenanceSupplySupplyIdSelect.selectedIndex].value),
            supplyName: addMaintenanceSupplySupplyName.value,
            quantity: parseInt(addMaintenanceSupplyQuantity.value),
            price: parseInt(addMaintenanceSupplyPrice.value)
        };
        postData.supplies.push(currentSupplyObj);
     }
     
     var options = {
        headers: authenticationHelper.getAuthenticationHeaders(),
        data: postData
    };
    var addMaintenanceUri = data.buildUri('/api/maintenances.php');
    jsonRequester.post(addMaintenanceUri, options)
        .then(function(checkStatus) {
            closeAddMaintenancePopUp();
            window.location.href = '#/maintenances';
        });
 });
