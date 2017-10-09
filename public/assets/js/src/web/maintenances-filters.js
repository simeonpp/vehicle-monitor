var filterByVehicleSelect = document.getElementById('filterByVehicleSelect');

filterByVehicleSelect.addEventListener('change', function(e) {
    var selectedVehicleId = parseInt(filterByVehicleSelect.options[filterByVehicleSelect.selectedIndex].value);
    window.location.href = "#/maintenances?vehicleId=" + selectedVehicleId;
});
