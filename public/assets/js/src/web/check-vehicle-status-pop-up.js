// Check status pop up
var statusCheckBtn = document.getElementById('statusCheckBtn');
var vehicleStatusVehicleSelect = document.getElementById('vehicleStatusVehicleSelect');
var vehicleStatusMileage = document.getElementById('vehicleStatusMileage');

statusCheckBtn.addEventListener('click', function() {
    var mileage = vehicleStatusMileage.value;
    if (mileage) {
        mileage = parseInt(mileage);
    }
    var selectedVehicleId = parseInt(vehicleStatusVehicleSelect.options[vehicleStatusVehicleSelect.selectedIndex].value);
    window.location.href = `#/check-status/${selectedVehicleId}?mileage=${mileage}`;
});
