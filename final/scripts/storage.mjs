const SAVED_WORKOUT_KEY = "ptf-saved-workout";
const FILTERS_KEY = "ptf-library-filters";

export function getSavedWorkout() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_WORKOUT_KEY)) || [];
  } catch (error) {
    console.error("Error reading saved workout:", error);
    return [];
  }
}

export function saveWorkout(items) {
  localStorage.setItem(SAVED_WORKOUT_KEY, JSON.stringify(items));
}

export function toggleSavedExercise(exerciseId) {
  const savedWorkout = getSavedWorkout();
  const updatedWorkout = savedWorkout.includes(exerciseId)
    ? savedWorkout.filter((id) => id !== exerciseId)
    : [...savedWorkout, exerciseId];

  saveWorkout(updatedWorkout);
  return updatedWorkout;
}

export function getSavedFilters() {
  try {
    return (
      JSON.parse(localStorage.getItem(FILTERS_KEY)) || {
        muscleGroup: "all",
        equipment: "all",
        difficulty: "all",
      }
    );
  } catch (error) {
    console.error("Error reading filters:", error);
    return {
      muscleGroup: "all",
      equipment: "all",
      difficulty: "all",
    };
  }
}

export function saveFilters(filters) {
  localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
}
