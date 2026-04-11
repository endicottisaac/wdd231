import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.getElementById("discover-grid");
const visitMessage = document.getElementById("visit-message");

function displayVisitMessage() {
  const lastVisit = Number(localStorage.getItem("lastVisit"));
  const now = Date.now();
  let message = "Welcome! Let us know if you have any questions.";

  if (lastVisit) {
    const timeDifference = now - lastVisit;
    const daysBetweenVisits = Math.floor(timeDifference / 86400000);

    if (daysBetweenVisits < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysBetweenVisits} days ago.`;
    }
  }

  visitMessage.textContent = message;
  localStorage.setItem("lastVisit", now);
}

function displayDiscoverItems(items) {
  const html = items
    .map((item) => {
      return `
        <article class="discover-card card-${item.id}">
          <h2>${item.name}</h2>
          <figure class="discover-figure">
            <img
              src="images/${item.image}"
              alt="${item.imageAlt}"
              width="300"
              height="200"
              loading="lazy"
            />
            <figcaption>${item.name}</figcaption>
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button type="button" class="learn-more-button">Learn More</button>
        </article>
      `;
    })
    .join("");

  discoverGrid.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  displayVisitMessage();
  displayDiscoverItems(discoverItems);
});
