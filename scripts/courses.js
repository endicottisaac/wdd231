const courses = [
  {
    name: "WDD 130",
    description: "Web Fundamentals",
    type: "wdd",
    credits: 2,
    completed: true,
  },
  {
    name: "WDD 131",
    description: "Dynamic Web Fundamentals",
    type: "wdd",
    credits: 2,
    completed: true,
  },
  {
    name: "WDD 231",
    description: "Web Frontend Development I",
    type: "wdd",
    credits: 2,
    completed: false,
  },
  {
    name: "CSE 110",
    description: "Introduction to Programming",
    type: "cse",
    credits: 2,
    completed: true,
  },
  {
    name: "CSE 111",
    description: "Programming with Functions",
    type: "cse",
    credits: 2,
    completed: true,
  },
  {
    name: "CSE 210",
    description: "Programming with Classes",
    type: "cse",
    credits: 2,
    completed: false,
  },
];

const courseList = document.getElementById("course-list");

function displayCourses(courseArray) {
  const html = courseArray
    .map((course) => {
      const courseName = `${course.name}`;
      const statusClass = course.completed ? "completed" : "not-completed";
      const completionMark = course.completed
        ? '<span class="checkmark" aria-label="completed">✓</span> '
        : "";
      return `<li class="course-item ${statusClass}">${completionMark}${courseName}</li>`;
    })
    .join("");
  courseList.innerHTML = html;
}

function calculateTotalCredits(courseArray) {
  const totalCredits = courseArray.reduce((total, course) => {
    return total + course.credits;
  }, 0);
  const totalCreditsElement = document.getElementById("total-credits");
  totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

function eventListeners() {
  document.getElementById("all-courses").addEventListener("click", (e) => {
    e.preventDefault();
    showAllCourses();
  });

  document.getElementById("wdd-courses").addEventListener("click", (e) => {
    e.preventDefault();
    filterWDDCourses();
  });

  document.getElementById("cse-courses").addEventListener("click", (e) => {
    e.preventDefault();
    filterCSECourses();
  });
}

function filterWDDCourses() {
  const wddCourses = courses.filter((course) => course.type === "wdd");
  displayCourses(wddCourses);
  calculateTotalCredits(wddCourses);
}

function filterCSECourses() {
  const cseCourses = courses.filter((course) => course.type === "cse");
  displayCourses(cseCourses);
  calculateTotalCredits(cseCourses);
}

function showAllCourses() {
  displayCourses(courses);
  calculateTotalCredits(courses);
}

document.addEventListener("DOMContentLoaded", () => {
  showAllCourses();
  eventListeners();
});
