export async function getExercises() {
  try {
    const response = await fetch("data/exercises.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const exercises = await response.json();
    return exercises;
  } catch (error) {
    console.error("Error loading exercises:", error);
    throw error;
  }
}
