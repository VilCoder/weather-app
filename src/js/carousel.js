let timeout;

export default function initCarousel() {
  const WIDTH_CARD = 340; // Card width + gap
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

    timeout = setTimeout(() => {
      currentCard += 1;
      updateCarousel();
    }, 2000);
  }

  prevButton.addEventListener("click", () => {
    clearTimeout(timeout);
    currentCard -= 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    clearTimeout(timeout);
    currentCard += 1;
    updateCarousel();
  });

  cardInner.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
    });

    item.addEventListener("mouseleave", updateCarousel);
  });

  updateCarousel();
}

export function destroyCarousel() {
  const carousel = document.querySelector(".card__content");
  
  if (!carousel) return;

  clearTimeout(timeout);
  carousel.style.transform = "none";
}
