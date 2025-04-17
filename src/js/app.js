import { format, addDays } from "date-fns";

export default async function getLocationData(location = "United States") {
  try {
    const currentDate = new Date();
    const today = format(currentDate, "yyyy-MM-dd");
    const nextSevenDays = format(addDays(currentDate, 6), "yyyy-MM-dd");

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${nextSevenDays}?key=WLZUW7VWSMA62LC9S2N4RZ2DX`,
      { mode: "cors" },
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const locationData = await response.json();

    function toCelsius(fahrenheit) {
      return Math.round(((fahrenheit - 32) * 5 / 9) * 100) / 100;
    }

    function toFahrenheit(celsius) {
      return Math.round(((celsius * 9 / 5) + 32) * 100) / 100;
    }

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
    return `Error al obtener los datos: ${error.message}`;
  }
}
