import { getCurrentWeather, getForecast } from "./weather.mjs";
import { getSpotlightMembers } from "./spotlights.mjs";

const currentWeatherDiv = document.getElementById("current-weather");
const forecastDiv = document.getElementById("forecast");
const spotlightsDiv = document.getElementById("spotlights");

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const html = `
    <img src="${iconUrl}" alt="${description}" loading="lazy" />
    <div class="temperature">${temp}°F</div>
    <p class="description">${description}</p>
  `;
  currentWeatherDiv.innerHTML = html;
}

function displayForecast(dailyForecasts) {
  const html = dailyForecasts
    .map((day) => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(day.main.temp);
      return `
      <div class="forecast-day">
        <p><strong>${dayName}</strong></p>
        <p>${temp}°F</p>
      </div>
    `;
    })
    .join("");

  forecastDiv.innerHTML = html;
}

function displaySpotlights(members) {
  const html = members
    .map((member) => {
      const badgeClass = member.membershipLevel === 3 ? "gold" : "silver";
      const badgeText =
        member.membershipLevel === 3 ? "Gold Member" : "Silver Member";
      return `
      <div class="spotlight-card ${badgeClass}">
        <img src="images/${member.image}" alt="${member.name}" loading="lazy" />
        <h3>${member.name}</h3>
        <p class="tagline">${member.tagline}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <span class="membership-badge badge-${badgeClass}">${badgeText}</span>
      </div>
    `;
    })
    .join("");

  spotlightsDiv.innerHTML = html;
}

async function init() {
  try {
    const currentWeather = await getCurrentWeather();
    displayCurrentWeather(currentWeather);

    const forecast = await getForecast();
    displayForecast(forecast);
  } catch (error) {
    console.error("Error loading weather:", error);
    currentWeatherDiv.innerHTML = "<p>Weather data temporarily unavailable</p>";
    forecastDiv.innerHTML = "";
  }

  try {
    const spotlights = await getSpotlightMembers();
    displaySpotlights(spotlights);
  } catch (error) {
    console.error("Error loading spotlights:", error);
    spotlightsDiv.innerHTML = "<p>Spotlights temporarily unavailable</p>";
  }
}

document.addEventListener("DOMContentLoaded", init);
