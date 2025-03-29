class CountDownTimer extends HTMLElement {
  constructor() {
    super();

    // Grab required elements
    this.daysElement = this.querySelector('.days');
    this.hoursElement = this.querySelector('.hours');
    this.minutesElement = this.querySelector('.minutes');
    this.secondsElement = this.querySelector('.seconds');

    // Set Date
    this.endDateString = this.querySelector('.countdown-timer').dataset.endDate;
    this.endDate = new Date(this.endDateString).getTime();

    // Start timer
    this.timer = setInterval(() => this.handleTick(), 1000);
  }

  handleTick() {
    const now = new Date().getTime();
    const distance = this.endDate - now;

    if (distance < 0) {
      clearInterval(this.timer);
      this.innerHTML = "EXPIRED";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.daysElement.textContent = days + "d ";
    this.hoursElement.textContent = hours + "h ";
    this.minutesElement.textContent = minutes + "m ";
    this.secondsElement.textContent = seconds + "s";
  }
}

customElements.define("countdown-timer", CountDownTimer);
