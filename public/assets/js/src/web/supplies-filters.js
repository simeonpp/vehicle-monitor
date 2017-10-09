var suppliesFilterByVehicleSelect = document.getElementById('suppliesFilterByVehicleSelect');

suppliesFilterByVehicleSelect.addEventListener('change', function(e) {
    var selectedVehicleId = parseInt(suppliesFilterByVehicleSelect.options[suppliesFilterByVehicleSelect.selectedIndex].value);
    window.location.href = "#/supplies?vehicleId=" + selectedVehicleId;
});
