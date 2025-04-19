import locationIcon from "../icon/map-pin.svg";
import arrowLeftIcon from "../icon/arrow-left.svg";
import arrowRightIcon from "../icon/arrow-right.svg";

import cloudyImg from "../image/cloudy.png";
import partlyCloudyImg from "../image/partly-cloudy.png";
import rainImg from "../image/rain.png";
import snowyImg from "../image/snowy.png";
import stormImg from "../image/storm.png";
import sunImg from "../image/sun.png";
import cloudImg from "../image/cloud.png";

import { format, parseISO } from "date-fns";

import getLocationData from "./app";
import initCarousel from "./carousel";

export default async function DOM() {
  try {
    const currentDate = new Date();
    const headerDate = document.querySelectorAll(".header__text");
    headerDate[0].textContent = format(currentDate, "MMMM yyyy");
    headerDate[1].textContent = format(currentDate, "eeee, dd MMM yyyy");

    let locationManager = await getLocationData();
    let locationData = locationManager.getToday();
    let nextDaysLocationData = locationManager.getNextDays();

    const query = document.querySelector("#search");
    query.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        locationManager = await getLocationData(query.value);
        locationData = locationManager.getToday();
        nextDaysLocationData = locationManager.getNextDays();

        displayTodayLocationData(locationData);
        displayNextDaysLocationData(nextDaysLocationData);
        initCarousel();
      }
    });

    // Enables and disables the button when the input content changes
    query.addEventListener("input", () => {
      const searchButton = document.querySelector(".search__button");

      if (query.value) {
        searchButton.disabled = false;
        searchButton.classList.add("search__button-active");
      } else {
        searchButton.disabled = true;
        searchButton.classList.remove("search__button-active");
      }
    });

    const degreeButton = document.querySelector(".header__degree");
    degreeButton.addEventListener("click", () => {
      const degreeSymbol = degreeButton.textContent;
      const { temp } = locationData.currentConditions;

      if (degreeSymbol === "C") {
        locationData.currentConditions.temp =
          locationManager.convertToCelsius(temp);

        nextDaysLocationData.map((nextDay) => {
          const tempNextDay = nextDay.temp;
          nextDay.temp = locationManager.convertToCelsius(tempNextDay);
        });
      }

      if (degreeSymbol === "F") {
        locationData.currentConditions.temp =
          locationManager.convertToFahrenheit(temp);

        nextDaysLocationData.map((nextDay) => {
          const tempNextDay = nextDay.temp;
          nextDay.temp = locationManager.convertToFahrenheit(tempNextDay);
        });
      }

      displayTodayLocationData(locationData, degreeSymbol);
      displayNextDaysLocationData(nextDaysLocationData, degreeSymbol);
      initCarousel();

      if (degreeSymbol === "C") {
        degreeButton.textContent = "F";
      } else {
        degreeButton.textContent = "C";
      }
    });

    displayTodayLocationData(locationData);
    displayNextDaysLocationData(nextDaysLocationData);
    initCarousel();
  } catch (error) {
    return `Error getting data: ${error.message}`;
  }
}

function displayTodayLocationData(locationData, degreeSymbol = "F") {
  const currentConditions = locationData.currentConditions.icon;
  const image = displayImage(currentConditions);

  const locationInfo = document.querySelector(".aside__info");
  locationInfo.textContent = "";
  locationInfo.insertAdjacentHTML(
    "beforeend",
    `
    <p class="aside__text">
      <svg class="icon-tabler-map-pin">${locationIcon}</svg>
      ${locationData.resolvedAddress}
    </p>
    <p class="aside__text">Today, ${format(new Date(), "dd MMM yyyy")}</p>
    <figure class="aside__image">
      ${image.outerHTML}
      <span class="image__overlay">${locationData.currentConditions.conditions}</span>
      <figcaption class="image__text">${locationData.description}</figcaption>
    </figure>
    <span class="aside__temp">${locationData.currentConditions.temp}°${degreeSymbol}</span>
    <div class="aside__statistics">
      <p class="statistics__info">
        <span>Precipitation:</span>
        <span>${locationData.days[0].precip}%</span>
      </p>
      <p class="statistics__info">
        <span>Humidity:</span>
        <span>${locationData.currentConditions.humidity}%</span>
      </p>
      <p class="statistics__info">
        <span>Visibility:</span>
        <span>${locationData.currentConditions.visibility}%</span>
      </p>
      <p class="statistics__info">
        <span>Wind:</span>
        <span>${locationData.currentConditions.windspeed}km/h</span>
      </p>
    </div>
    `,
  );
}

function displayNextDaysLocationData(nextDaysLocationData, degreeSymbol = "F") {
  const mainContent = document.querySelector(".main__card");
  mainContent.textContent = "";
  mainContent.insertAdjacentHTML(
    "beforeend",
    `
    <svg class="card__prev">${arrowLeftIcon}</svg>
    <svg class="card__next">${arrowRightIcon}</svg>
    `,
  );

  const carrousel = document.createElement("div");
  carrousel.classList.add("card__content");
  Object.values(nextDaysLocationData).map((nextDay) => {
    const date = parseISO(nextDay.datetime);

    const currentConditions = nextDay.icon;
    const image = displayImage(currentConditions);

    carrousel.insertAdjacentHTML(
      "beforeend",
      `    
      <div class="card__item">
        <div class="card__inner">
          <div class="card__front">
            <p class="card__day">${format(date, "eee")}</p>
            <figure class="card__image">
              ${image.outerHTML}
              <figcaption class="card__text">
                ${nextDay.conditions}
              </figcaption>
            </figure>
            <span class="card__temp">${nextDay.temp}°${degreeSymbol}</span>
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
  });

  mainContent.appendChild(carrousel);
}

function displayImage(currentConditions) {
  const image = document.createElement("img");

  if (currentConditions === "partly-cloudy-day") {
    image.src = partlyCloudyImg;
  } else if (currentConditions === "clear-day") {
    image.src = sunImg;
  } else if (currentConditions === "rain") {
    image.src = rainImg;
  } else if (currentConditions === "cloudy") {
    image.src = cloudyImg;
  } else if (currentConditions === "snow") {
    image.src = snowyImg;
  } else if (currentConditions === "storm") {
    image.src = stormImg;
  } else {
    image.src = cloudImg;
  }

  return image;
}
