// initialize slideshow
const slideshow_container = document.querySelector(".testimonial-slider");
const slider = new Flickity(slideshow_container, {
	// options
	cellAlign: "center",
	wrapAround: true,
	autoPlay: 2000,
	pageDots: false,
	fullscreen: true
});
// config:
// assume there is just one single slider on the page
// navigation dots should be disabled
// no autoplay
// infinite loop
// the slides or cells should be aligned to the left side on initialization.
// pauseAutoPlayOnHover: false
