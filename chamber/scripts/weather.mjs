// Sandy Utah Chamber of Commerce - Weather Module

const API_KEY = "2cdecd7d83c9436e10ede8bb055d9726";
const LAT = 40.56;
const LON = -111.84;

export async function getCurrentWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
}

export async function getForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const dailyForecasts = data.list
      .filter((reading) => reading.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    return dailyForecasts;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
}
