import { getExercises } from "./data.mjs";
import { createShowcaseCard } from "./render.mjs";

const featuredWorkout = document.getElementById("featured-workout");
const spotlightGrid = document.getElementById("spotlight-grid");
const statsStrip = document.getElementById("stats-strip");

function displayFeaturedWorkout(exercises) {
  const featuredExercise = exercises.find((exercise) => exercise.featured);

  if (!featuredExercise) {
    featuredWorkout.innerHTML = "<p>Featured workout information is unavailable right now.</p>";
    return;
  }

  featuredWorkout.innerHTML = createShowcaseCard(featuredExercise);
}

function displaySpotlights(exercises) {
  const spotlightExercises = exercises.filter((exercise) => exercise.featured).slice(0, 3);

  spotlightGrid.innerHTML = spotlightExercises
    .map((exercise) => createShowcaseCard(exercise))
    .join("");
}

function displayStats(exercises) {
  const beginnerCount = exercises.filter(
    (exercise) => exercise.difficulty === "Beginner",
  ).length;
  const noEquipmentCount = exercises.filter(
    (exercise) => exercise.equipment === "None",
  ).length;

  statsStrip.innerHTML = `
    <article class="stat-card">
      <h2>${exercises.length}</h2>
      <p>Total Exercises</p>
    </article>
    <article class="stat-card">
      <h2>${beginnerCount}</h2>
      <p>Beginner Friendly</p>
    </article>
    <article class="stat-card">
      <h2>${noEquipmentCount}</h2>
      <p>No Equipment</p>
    </article>
  `;
}

async function initHomePage() {
  try {
    const exercises = await getExercises();
    displayFeaturedWorkout(exercises);
    displaySpotlights(exercises);
    displayStats(exercises);
  } catch (error) {
    featuredWorkout.innerHTML = "<p>We could not load featured workouts at this time.</p>";
    spotlightGrid.innerHTML = "<p>We could not load exercise highlights at this time.</p>";
    statsStrip.innerHTML = "<p>Exercise stats are unavailable right now.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
});
