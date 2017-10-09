var sliderMainTexts = [
    'Checking you car status has never been easier',
    'Keep your vehicle in a good driving condition',
    'Do regular checks and avoid any future problems',
];
var sliderSecondaryTexts = [
    'Just input your vehicle mileage and check your status health',
    'The application will let you know when it is time to change anything',
    'Improve your vehicle safety while driving around'
];
var currentSliderIndex = 0;
var maxSliderIndex = sliderMainTexts.length;

var sliderLeftArrow = document.getElementById('sliderLeftArrow');
var sliderRightArrow = document.getElementById('sliderRightArrow');
var sliderMainText = document.getElementById('sliderMainText');
var sliderSecondaryText = document.getElementById('sliderSecondaryText');

var changeSlide = function(slideIndex) {
    sliderMainText.innerText = sliderMainTexts[slideIndex];
    sliderSecondaryText.innerText = sliderSecondaryTexts[slideIndex];

    sliderLeftArrow.style.display = 'block';
    sliderRightArrow.style.display = 'block';
    if (slideIndex === 0) {
        sliderLeftArrow.style.display = 'none';
    }
    if (slideIndex === maxSliderIndex - 1) {
        sliderRightArrow.style.display = 'none';
    }
};   
sliderLeftArrow.addEventListener('click', function() {
    if (currentSliderIndex - 1 >= 0) {
        currentSliderIndex -= 1;
        changeSlide(currentSliderIndex);
    }
});
sliderRightArrow.addEventListener('click', function() {
    if (currentSliderIndex + 1 < maxSliderIndex) {
        currentSliderIndex += 1;
        changeSlide(currentSliderIndex);
    }
});

changeSlide(0);
