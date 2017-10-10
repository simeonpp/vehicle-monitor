var mobileNavButtonWrap = document.getElementById('mobileNavButtonWrap');
var mobileNavPopUpCloseBtn = document.getElementById('mobileNavPopUpCloseBtn');
var mobileNavWrap = document.getElementById('mobileNavWrap');
var mobileNavCheckStatusHref = document.getElementById('mobileNavCheckStatusHref');

var closeMobileNavPopUp = function() {
    mobileNavWrap.style.height = '0';
};
var openMobileNavPopUp = function() {
    mobileNavWrap.style.height = '100%';
};

mobileNavButtonWrap.addEventListener('click', function() {
    openMobileNavPopUp();
});
mobileNavPopUpCloseBtn.addEventListener('click', function() {
    closeMobileNavPopUp();
});
mobileNavCheckStatusHref.addEventListener('click', function(e) {
    e.preventDefault();
    closeMobileNavPopUp();
    openStatusCheckPopUp();
});
