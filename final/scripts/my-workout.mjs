import { getExercises } from "./data.mjs";
import { createSavedExerciseCard } from "./render.mjs";
import { getSavedWorkout, saveWorkout } from "./storage.mjs";

const savedWorkoutContainer = document.getElementById("saved-workout-list");
const workoutSummary = document.getElementById("workout-summary");
const clearWorkoutButton = document.getElementById("clear-workout");
const hiddenSelectionInput = document.getElementById("selected-exercises");

let allExercises = [];

function displaySavedWorkout() {
  const savedIds = getSavedWorkout();
  const savedExercises = allExercises.filter((exercise) => savedIds.includes(exercise.id));

  hiddenSelectionInput.value = savedExercises.map((exercise) => exercise.name).join(", ");

  if (savedExercises.length === 0) {
    savedWorkoutContainer.innerHTML =
      "<p class=\"empty-message\">You have not saved any exercises yet. Visit the library to build your next workout.</p>";
    workoutSummary.innerHTML = "<p>No workout summary yet.</p>";
    return;
  }

  savedWorkoutContainer.innerHTML = savedExercises
    .map((exercise) => createSavedExerciseCard(exercise))
    .join("");

  const totalDuration = savedExercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);

  workoutSummary.innerHTML = `
    <p><strong>Saved Exercises:</strong> ${savedExercises.length}</p>
    <p><strong>Estimated Duration:</strong> ${totalDuration} minutes</p>
  `;
}

async function initWorkoutPage() {
  try {
    allExercises = await getExercises();
    displaySavedWorkout();
  } catch (error) {
    savedWorkoutContainer.innerHTML =
      "<p>We could not load your saved workout at this time.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initWorkoutPage();

  clearWorkoutButton.addEventListener("click", () => {
    saveWorkout([]);
    displaySavedWorkout();
  });
});
