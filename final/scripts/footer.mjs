export function setFooter() {
  document.getElementById("current-year").textContent = new Date().getFullYear();
  document.getElementById("last-modified").textContent =
    `Last Modified: ${document.lastModified}`;
}

document.addEventListener("DOMContentLoaded", () => {
  setFooter();
});
