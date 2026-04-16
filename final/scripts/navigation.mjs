const navButton = document.getElementById("ham-btn");
const navBar = document.getElementById("nav-bar");

export function setupNavigation() {
  if (!navButton || !navBar) {
    return;
  }

  navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navBar.classList.toggle("show");
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("#nav-bar a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.parentElement.classList.add("current");
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
});
