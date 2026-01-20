/* ================================
   COURSE CONFIGURATION
================================ */
const courses = {
  frontend: "Frontend Development",
  uiux: "UI / UX Design",
  backend: "Backend Development",
  fullstack: "Full Stack Development",
  database: "Database & SQL",
  media: "Media & Digital Design"
};

/* ================================
   DASHBOARD LOGIC
================================ */
function loadDashboard() {
  let completed = 0;
  let inProgress = 0;

  Object.keys(courses).forEach(course => {
    const progress = parseInt(localStorage.getItem(course)) || 0;
    if (progress === 100) completed++;
    else if (progress > 0) inProgress++;
  });

  const completedEl = document.getElementById("completedCount");
  const progressEl = document.getElementById("progressCount");

  if (completedEl) completedEl.innerText = completed;
  if (progressEl) progressEl.innerText = inProgress;
}

/* ================================
   COURSE PAGE TITLE
================================ */
function loadCourseTitle() {
  const params = new URLSearchParams(window.location.search);
  const courseKey = params.get("course");

  const titleEl = document.getElementById("courseTitle");
  if (courseKey && courses[courseKey] && titleEl) {
    titleEl.innerText = courses[courseKey];
  }
}

/* ================================
   LESSON COMPLETION
================================ */
function markComplete() {
  const params = new URLSearchParams(window.location.search);
  const courseKey = params.get("course");

  if (!courseKey) {
    alert("Course not found!");
    return;
  }

  // Mark course as completed
  localStorage.setItem(courseKey, 100);

  alert("Lesson completed! Course progress updated.");

  // Redirect back to dashboard
  window.location.href = "index.html";
}

/* ================================
   AUTO LOAD BASED ON PAGE
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  loadCourseTitle();
});
