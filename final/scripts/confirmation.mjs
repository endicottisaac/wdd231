function displayConfirmationData() {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("confirm-name").textContent = params.get("name") || "";
  document.getElementById("confirm-email").textContent = params.get("email") || "";
  document.getElementById("confirm-goal").textContent = params.get("goal") || "";
  document.getElementById("confirm-day").textContent = params.get("day") || "";
  document.getElementById("confirm-notes").textContent =
    params.get("notes") || "No notes provided.";
  document.getElementById("confirm-exercises").textContent =
    params.get("selected-exercises") || "No exercises were selected.";
}

document.addEventListener("DOMContentLoaded", () => {
  displayConfirmationData();
});
