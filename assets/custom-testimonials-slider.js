// initialize slideshow
const slideshow_containers = document.querySelectorAll(".testimonial-slider");

slideshow_containers.forEach((elem) => {

  const slider = new Flickity(elem, {
    // options
    cellAlign: "center",
    wrapAround: true,
    autoPlay: Number(elem.dataset.autoplay),
    pageDots: false,
    fullscreen: true
  });
});
// config:
// assume there is just one single slider on the page
// navigation dots should be disabled
// no autoplay
// infinite loop
// the slides or cells should be aligned to the left side on initialization.
// pauseAutoPlayOnHover: false
