export function createExerciseCard(exercise, savedWorkout = []) {
  const isSaved = savedWorkout.includes(exercise.id);

  return `
    <article class="exercise-card">
      <p class="card-label">${exercise.category}</p>
      <h3>${exercise.name}</h3>
      <div class="exercise-meta">
        <p><strong>Muscle Group:</strong> ${exercise.muscleGroup}</p>
        <p><strong>Equipment:</strong> ${exercise.equipment}</p>
        <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
        <p><strong>Duration:</strong> ${exercise.duration} min</p>
      </div>
      <p class="exercise-description">${exercise.description}</p>
      <div class="card-actions">
        <button type="button" class="details-button" data-id="${exercise.id}">
          Learn More
        </button>
        <button
          type="button"
          class="save-button${isSaved ? " saved" : ""}"
          data-id="${exercise.id}"
        >
          ${isSaved ? "Saved" : "Save Workout"}
        </button>
      </div>
    </article>
  `;
}

export function createShowcaseCard(exercise) {
  return `
    <article class="exercise-card">
      <p class="card-label">${exercise.category}</p>
      <h3>${exercise.name}</h3>
      <div class="exercise-meta">
        <p><strong>Muscle Group:</strong> ${exercise.muscleGroup}</p>
        <p><strong>Equipment:</strong> ${exercise.equipment}</p>
        <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
        <p><strong>Duration:</strong> ${exercise.duration} min</p>
      </div>
      <p class="exercise-description">${exercise.description}</p>
      <div class="card-actions">
        <a href="library.html" class="details-button">View In Library</a>
        <a href="my-workout.html" class="secondary-button">My Workout</a>
      </div>
    </article>
  `;
}

export function createSavedExerciseCard(exercise) {
  return `
    <article class="saved-card">
      <h3>${exercise.name}</h3>
      <p><strong>Muscle Group:</strong> ${exercise.muscleGroup}</p>
      <p><strong>Equipment:</strong> ${exercise.equipment}</p>
      <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
      <p><strong>Duration:</strong> ${exercise.duration} min</p>
    </article>
  `;
}
