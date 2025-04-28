let interval;
let prevButtonListener;
let nextButtonListener;
let mouseEnterListeners = [];
let mouseLeaveListeners = [];

export default function initCarousel() {
  destroyCarousel();

  const WIDTH_CARD = 340; // Width + gap
  const carousel = document.querySelector(".card__content");
  const prevButton = document.querySelector(".card__prev");
  const nextButton = document.querySelector(".card__next");
  const cards = document.querySelectorAll(".card__item");
  const cardInner = document.querySelectorAll(".card__inner");
  let currentCard = 1;

  function updateCarousel() {
    if (currentCard > cards.length - 2) {
      currentCard = 1;
    } else if (currentCard < 1) {
      currentCard = cards.length - 2;
    }

    carousel.style.transform = `translateX(-${(currentCard - 1) * WIDTH_CARD}px)`;
  }

  function startAutoCarousel() {
    interval = setInterval(() => {
      currentCard += 1;
      updateCarousel();
    }, 2000);
  }

  prevButtonListener = () => {
    clearInterval(interval);
    currentCard -= 1;
    updateCarousel();
    startAutoCarousel();
  };

  nextButtonListener = () => {
    clearInterval(interval);
    currentCard += 1;
    updateCarousel();
    startAutoCarousel();
  };

  prevButton.addEventListener("click", prevButtonListener);
  nextButton.addEventListener("click", nextButtonListener);

  cardInner.forEach((item) => {
    const mouseEnter = () => clearInterval(interval);
    const mouseLeave = () => startAutoCarousel();

    item.addEventListener("mouseenter", mouseEnter);
    item.addEventListener("mouseleave", mouseLeave);

    mouseEnterListeners.push({ item, listener: mouseEnter });
    mouseLeaveListeners.push({ item, listener: mouseLeave });
  });

  updateCarousel();
  startAutoCarousel();
}

export function destroyCarousel() {
  const carousel = document.querySelector(".card__content");
  const prevButton = document.querySelector(".card__prev");
  const nextButton = document.querySelector(".card__next");

  if (carousel) {
    clearInterval(interval);
    carousel.style.transform = "none";
  }

  if (prevButton && prevButtonListener) {
    prevButton.removeEventListener("click", prevButtonListener);
  }

  if (nextButton && nextButtonListener) {
    nextButton.removeEventListener("click", nextButtonListener);
  }

  mouseEnterListeners.forEach(({ item, listener }) => {
    item.removeEventListener("mouseenter", listener);
  });

  mouseLeaveListeners.forEach(({ item, listener }) => {
    item.removeEventListener("mouseleave", listener);
  });

  mouseEnterListeners = [];
  mouseLeaveListeners = [];
}
