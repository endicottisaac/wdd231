function setFooter() {
  const currentYear = new Date().getFullYear();
  document.getElementById("current-year").textContent = currentYear;
  const lastModified = new Date(document.lastModified);
  document.getElementById("last-modified").textContent =
    `Last Modified: ${document.lastModified}`;
}

document.addEventListener("DOMContentLoaded", () => {
  setFooter();
});
