// Check status pop up
var statusCheckPopUp = document.getElementById('statusCheckPopUp');
var statusCheckPopUpCloseBtn = document.getElementById('statusCheckPopUpCloseBtn');
var navCheckStatusHref = document.getElementById('navCheckStatusHref');
var navFooterCheckStatusHref = document.getElementById('navFooterCheckStatusHref');
var closeStatusCheckPopUp = function() {
    statusCheckPopUp.style.height = '0';
}
var openStatusCheckPopUp = function() {
    statusCheckPopUp.style.height = '100%';
}

navCheckStatusHref.addEventListener('click', function(e) {
    e.preventDefault();
    openStatusCheckPopUp();
});
navFooterCheckStatusHref.addEventListener('click', function(e) {
    e.preventDefault();
    openStatusCheckPopUp();
});
statusCheckPopUpCloseBtn.addEventListener('click', function() {
    closeStatusCheckPopUp();
});
statusCheckPopUpCloseBtn2.addEventListener('click', function() {
    closeStatusCheckPopUp();
});