// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-mode");
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // Name Input Logic
  const startBtn = document.getElementById("start-btn");
  startBtn?.addEventListener("click", () => {
    const name = document.getElementById("name-input").value.trim();
    if (name) {
      localStorage.setItem("jeeUser", name);
      window.location.href = "dashboard.html";
    }
  });

  const displayName = document.getElementById("user-name-display");
  if (displayName) displayName.textContent = localStorage.getItem("jeeUser") || "Student";

  // Progress Tracker
  const track = (id) => {
    const boxes = document.querySelectorAll(`#${id} input[type='checkbox']`);
    const saved = JSON.parse(localStorage.getItem(id) || "[]");
    boxes.forEach((box, i) => {
      box.checked = saved[i] || false;
      box.addEventListener("change", () => {
        saved[i] = box.checked;
        localStorage.setItem(id, JSON.stringify(saved));
      });
    });
  };

  ["physics-list", "chemistry-list", "maths-list", "bio-list"].forEach(track);

  // Dashboard Progress
  const updateProgress = (id, barId) => {
    const data = JSON.parse(localStorage.getItem(id) || "[]");
    const percent = data.length ? Math.round((data.filter(Boolean).length / data.length) * 100) : 0;
    const bar = document.getElementById(barId);
    if (bar) bar.style.width = bar.textContent = `${percent}%`;
    return percent;
  };

  if (document.getElementById("progress-overall")) {
    const p = updateProgress("physics-list", "progress-physics");
    const c = updateProgress("chemistry-list", "progress-chemistry");
    const m = updateProgress("maths-list", "progress-maths");
    const b = updateProgress("bio-list", "progress-biology");
    const overall = Math.round((p + c + m + b) / 4);
    document.getElementById("progress-overall").style.width = document.getElementById("progress-overall").textContent = `${overall}%`;
  }
});
