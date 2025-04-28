import "../css/reset.css";
import "../css/scroll.css";
import "../css/styles.css";
import "../css/loader.css";
import "../css/responsive.css";

import { format } from "date-fns";

import getLocationData from "./app";
import {
  displayNextDaysLocationData,
  displayTodayLocationData,
} from "./render";
import initCarousel, { destroyCarousel } from "./carousel";

document.addEventListener("DOMContentLoaded", () => {
  const query = document.querySelector("#search");
  const searchButton = document.querySelector(".search__button");
  const degreeButton = document.querySelector(".header__degree");

  const aside = document.querySelector(".layout__aside");
  aside.classList.add("layout__aside-active");

  const menuToggle = document.querySelector(".layout__menu-toggle");
  menuToggle.classList.add("layout__menu-toggle-active");

  let currentLocation = "Barranquilla";
  let currentUnit = "us";
  let currentDegree = "F";

  async function loadData(location, unit, degree) {
    try {
      const currentDate = new Date();
      const headerDate = document.querySelectorAll(".header__text");
      headerDate[0].textContent = format(currentDate, "MMMM yyyy");
      headerDate[1].textContent = format(currentDate, "eeee, dd MMM yyyy");

      const locationManager = await getLocationData(location, unit);
      const locationData = locationManager.getToday();
      const nextDaysLocationData = locationManager.getNextDays();

      await displayTodayLocationData(locationData, degree);
      await displayNextDaysLocationData(nextDaysLocationData, degree);
      applyCarouselIfWideScreen();
    } catch (error) {
      throw new Error(`Error getting data: ${error.message}`);
    }
  }

  async function handleSearchSubmit() {
    const locationInput = query.value.trim();
    try {
      await loadData(locationInput, currentUnit, currentDegree);
      currentLocation = locationInput;
      
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Unable to get weather for that location. Try another location.");
    } finally {
      query.value = "";
      query.dispatchEvent(new Event("input")); // Fires the input event
    }
  }

  function applyCarouselIfWideScreen() {
    const size = parseInt(document.body.clientWidth, 10);
    if (size >= 1064) {
      initCarousel();
    }

    window.addEventListener("resize", () => {
      const newSize = parseInt(document.body.clientWidth, 10);
      if (newSize >= 1064) {
        initCarousel();
      } else {
        destroyCarousel();
      }
    });
  }

  loadData(currentLocation, currentUnit, currentDegree);

  searchButton.addEventListener("click", async (event) => {
    if (!event.currentTarget.disabled) {
      await handleSearchSubmit();
    }
  });

  query.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      await handleSearchSubmit();
    }
  });

  // Enables and disables the button when the input content changes
  query.addEventListener("input", () => {
    if (query.value) {
      searchButton.disabled = false;
      searchButton.classList.add("search__button-active");
    } else {
      searchButton.disabled = true;
      searchButton.classList.remove("search__button-active");
    }
  });

  degreeButton.addEventListener("click", async () => {
    currentUnit = currentUnit === "us" ? "metric" : "us";
    currentDegree = currentDegree === "F" ? "C" : "F";
    degreeButton.textContent = degreeButton.textContent === "C" ? "F" : "C";

    await loadData(currentLocation, currentUnit, currentDegree);
  });

  menuToggle.addEventListener("click", () => {
    aside.classList.toggle("layout__aside-active");
    menuToggle.classList.toggle("layout__menu-toggle-active");
  });
});
