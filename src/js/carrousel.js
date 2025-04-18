export default function initCarrousel() {
  const WIDTH_CARD = 340;
  const carrousel = document.querySelector(".card__content");
  const prevButton = document.querySelector(".card__prev");
  const nextButton = document.querySelector(".card__next");
  const cards = document.querySelectorAll(".card__item");
  const cardInner = document.querySelectorAll(".card__inner");
  let currentCard = 1;
  let timeout;

  function updateCarrousel() {
    if (currentCard > cards.length - 2) {
      currentCard = 1;
    } else if (currentCard < 1) {
      currentCard = cards.length - 2;
    }

    carrousel.style.transform = `translateX(-${(currentCard - 1) * WIDTH_CARD}px)`;

    timeout = setTimeout(() => {
      currentCard += 1;
      updateCarrousel();
    }, 2000);
  }

  prevButton.addEventListener("click", () => {
    clearTimeout(timeout);
    currentCard -= 1;
    updateCarrousel();
  });

  nextButton.addEventListener("click", () => {
    clearTimeout(timeout);
    currentCard += 1;
    updateCarrousel();
  });

  cardInner.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
    });
  });

  cardInner.forEach((item) => {
    item.addEventListener("mouseleave", () => {
      updateCarrousel();
    });
  });

  updateCarrousel();
}
