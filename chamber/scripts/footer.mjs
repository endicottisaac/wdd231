// Sandy Utah Chamber of Commerce - Footer Module

export function setFooter() {
  const currentYear = new Date().getFullYear();
  document.getElementById("current-year").textContent = currentYear;
  document.getElementById("last-modified").textContent =
    `Last Modified: ${document.lastModified}`;
}

// Auto-initialize when module loads
document.addEventListener("DOMContentLoaded", () => {
  setFooter();
});
