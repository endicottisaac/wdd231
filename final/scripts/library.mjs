import { getExercises } from "./data.mjs";
import { createExerciseCard } from "./render.mjs";
import {
  getSavedWorkout,
  getSavedFilters,
  saveFilters,
  toggleSavedExercise,
} from "./storage.mjs";

const libraryGrid = document.getElementById("library-grid");
const filterForm = document.getElementById("filter-form");
const muscleGroupSelect = document.getElementById("muscle-group");
const equipmentSelect = document.getElementById("equipment");
const difficultySelect = document.getElementById("difficulty");
const exerciseModal = document.getElementById("exercise-modal");
const modalContent = document.getElementById("modal-content");
const closeModalButton = document.getElementById("close-modal");
const resultsCount = document.getElementById("results-count");

let allExercises = [];

function populateFilters(exercises) {
  const muscleGroups = exercises
    .map((exercise) => exercise.muscleGroup)
    .filter((group, index, array) => array.indexOf(group) === index);
  const equipmentTypes = exercises
    .map((exercise) => exercise.equipment)
    .filter((equipment, index, array) => array.indexOf(equipment) === index);
  const difficultyLevels = exercises
    .map((exercise) => exercise.difficulty)
    .filter((difficulty, index, array) => array.indexOf(difficulty) === index);

  muscleGroups.forEach((group) => {
    muscleGroupSelect.innerHTML += `<option value="${group}">${group}</option>`;
  });

  equipmentTypes.forEach((equipment) => {
    equipmentSelect.innerHTML += `<option value="${equipment}">${equipment}</option>`;
  });

  difficultyLevels.forEach((difficulty) => {
    difficultySelect.innerHTML += `<option value="${difficulty}">${difficulty}</option>`;
  });
}

function applySavedFilters() {
  const savedFilters = getSavedFilters();
  muscleGroupSelect.value = savedFilters.muscleGroup;
  equipmentSelect.value = savedFilters.equipment;
  difficultySelect.value = savedFilters.difficulty;
}

function getFilteredExercises() {
  const filters = {
    muscleGroup: muscleGroupSelect.value,
    equipment: equipmentSelect.value,
    difficulty: difficultySelect.value,
  };

  saveFilters(filters);

  return allExercises.filter((exercise) => {
    const matchesMuscleGroup =
      filters.muscleGroup === "all" || exercise.muscleGroup === filters.muscleGroup;
    const matchesEquipment =
      filters.equipment === "all" || exercise.equipment === filters.equipment;
    const matchesDifficulty =
      filters.difficulty === "all" || exercise.difficulty === filters.difficulty;

    return matchesMuscleGroup && matchesEquipment && matchesDifficulty;
  });
}

function renderLibrary() {
  const filteredExercises = getFilteredExercises();
  const savedWorkout = getSavedWorkout();

  resultsCount.textContent = `${filteredExercises.length} exercises shown`;

  libraryGrid.innerHTML = filteredExercises
    .map((exercise) => createExerciseCard(exercise, savedWorkout))
    .join("");

  if (filteredExercises.length === 0) {
    libraryGrid.innerHTML = "<p>No exercises match the current filters.</p>";
  }
}

function openModal(exerciseId) {
  const exercise = allExercises.find((item) => item.id === exerciseId);

  if (!exercise) {
    return;
  }

  modalContent.innerHTML = `
    <h2>${exercise.name}</h2>
    <p><strong>Category:</strong> ${exercise.category}</p>
    <p><strong>Muscle Group:</strong> ${exercise.muscleGroup}</p>
    <p><strong>Equipment:</strong> ${exercise.equipment}</p>
    <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
    <p><strong>Duration:</strong> ${exercise.duration} minutes</p>
    <p>${exercise.description}</p>
  `;

  exerciseModal.showModal();
}

function setupLibraryEvents() {
  filterForm.addEventListener("change", () => {
    renderLibrary();
  });

  libraryGrid.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".details-button");
    const saveButton = event.target.closest(".save-button");

    if (detailsButton) {
      openModal(detailsButton.dataset.id);
    }

    if (saveButton) {
      toggleSavedExercise(saveButton.dataset.id);
      renderLibrary();
    }
  });

  closeModalButton.addEventListener("click", () => {
    exerciseModal.close();
  });

  exerciseModal.addEventListener("click", (event) => {
    const rect = exerciseModal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) {
      exerciseModal.close();
    }
  });
}

async function initLibraryPage() {
  try {
    allExercises = await getExercises();
    populateFilters(allExercises);
    applySavedFilters();
    renderLibrary();
    setupLibraryEvents();
  } catch (error) {
    libraryGrid.innerHTML =
      "<p>Sorry, we could not load the exercise library right now.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initLibraryPage();
});
