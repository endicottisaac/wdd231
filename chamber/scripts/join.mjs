// Sandy Utah Chamber of Commerce - Join Page Script

function setTimestamp() {
  const timestampField = document.getElementById("timestamp");
  const now = new Date();
  timestampField.value = now.toISOString();
}

function setupModals() {
  const modalButtons = document.querySelectorAll(".info-button");

  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      modal.showModal();
    });
  });

  const closeButtons = document.querySelectorAll(".close-modal");

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog").close();
    });
  });

  const modals = document.querySelectorAll(".membership-modal");

  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      const rect = modal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        modal.close();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setTimestamp();
  setupModals();
});

export { setTimestamp, setupModals };
