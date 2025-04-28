import locationIcon from "../icon/map-pin.svg";
import arrowLeftIcon from "../icon/arrow-left.svg";
import arrowRightIcon from "../icon/arrow-right.svg";

import { format, parseISO } from "date-fns";

import { getWeatherImage } from "./app";

export async function displayTodayLocationData(data, degree) {
  // eslint-disable-next-line prefer-destructuring
  const { icon } = data.days[0];
  
  const imageSrc = await getWeatherImage(icon);

  const locationInfo = document.querySelector(".aside__info");
  locationInfo.textContent = "";
  locationInfo.insertAdjacentHTML(
    "beforeend",
    `
    <p class="aside__text">
      <svg class="icon-tabler-map-pin">${locationIcon}</svg>
      ${data.resolvedAddress}
    </p>
    <p class="aside__text">Today, ${format(new Date(), "dd MMM yyyy")}</p>
    <figure class="aside__image">
      <img src="${imageSrc}" alt="${data.days[0].conditions}" />
      <span class="image__overlay">${data.days[0].conditions}</span>
      <figcaption class="image__text">${data.days[0].description}</figcaption>
    </figure>
    <span class="aside__temp">${data.currentConditions.temp} °${degree}</span>
    <div class="aside__statistics">
      <p class="statistics__info">
        <span>Precipitation:</span>
        <span>${data.days[0].precip}%</span>
      </p>
      <p class="statistics__info">
        <span>Humidity:</span>
        <span>${data.currentConditions.humidity}%</span>
      </p>
      <p class="statistics__info">
        <span>Visibility:</span>
        <span>${data.currentConditions.visibility}%</span>
      </p>
      <p class="statistics__info">
        <span>Wind:</span>
        <span>${data.currentConditions.windspeed}km/h</span>
      </p>
    </div>
    `,
  );
}

export async function displayNextDaysLocationData(data, degree) {
  const mainContainer = document.querySelector(".layout__main");
  mainContainer.textContent = "";

  const mainContent = document.createElement("div");
  mainContent.classList.add("main__card");
  mainContent.insertAdjacentHTML(
    "beforeend",
    `
    <svg class="card__prev">${arrowLeftIcon}</svg>
    <svg class="card__next">${arrowRightIcon}</svg>
    `,
  );

  const carrousel = document.createElement("div");
  carrousel.classList.add("card__content");

  for (const nextDay of data) {
    const date = parseISO(nextDay.datetime);
    const imageSrc = await getWeatherImage(nextDay.icon);

    carrousel.insertAdjacentHTML(
      "beforeend",
      `    
      <div class="card__item">
        <div class="card__inner">
          <div class="card__front">
            <p class="card__day">${format(date, "eee")}</p>
            <figure class="card__image">
              <img src="${imageSrc}" alt="${nextDay.conditions}" />
              <figcaption class="card__text">
                ${nextDay.conditions}
              </figcaption>
            </figure>
            <span class="card__temp">${nextDay.temp} °${degree}</span>
          </div>
          <div class="card__back">
            <p class="card__back-description">${nextDay.description}</p>
            <p class="statistics__info">
              <span>Precipitation:</span>
              <span>${nextDay.precip}%</span>
            </p>
            <p class="statistics__info">
              <span>Humidity:</span>
              <span>${nextDay.humidity}%</span>
            </p>
            <p class="statistics__info">
              <span>Visibility:</span>
              <span>${nextDay.visibility}%</span>
            </p>
            <p class="statistics__info">
              <span>Wind:</span>
              <span>${nextDay.windspeed}km/h</span>
            </p>
          </div>
        </div>
      </div>
      `,
    );
  }

  mainContent.appendChild(carrousel);
  mainContainer.appendChild(mainContent);
}
