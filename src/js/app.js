import { format, addDays } from "date-fns";

function toCelsius(fahrenheit) {
  return Math.round((((fahrenheit - 32) * 5) / 9) * 10) / 10;
}

function toFahrenheit(celsius) {
  return Math.round(((celsius * 9) / 5 + 32) * 10) / 10;
}

export default async function getLocationData(location = "Barranquilla") {
  try {
    const currentDate = new Date();
    const today = format(currentDate, "yyyy-MM-dd");
    const nextSevenDays = format(addDays(currentDate, 6), "yyyy-MM-dd");
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${nextSevenDays}?key=WLZUW7VWSMA62LC9S2N4RZ2DX`;

    const response = await fetch(URL, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const locationData = await response.json();

    const locationManager = {
      convertToCelsius: toCelsius,
      convertToFahrenheit: toFahrenheit,

      getToday() {
        return locationData;
      },

      getNextDays() {
        return locationData.days.slice(1);
      },
    };

    return locationManager;
  } catch (error) {
    console.log(`Error getting data: ${error.message}`);
    throw error;
  }
}

export async function getWeatherImage(condition) {
  try {
    const imageModule = await import(`../image/${condition}.png`);
    return imageModule.default; // get the real URL
  } catch (error) {
    console.log(`Icon for ${condition} not found, ${error}`);
    const fallback = await import("../image/partly-cloudy-day.png");
    return fallback.default;
  }
}
