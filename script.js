// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll animations
ScrollReveal().reveal('.reveal', {
  duration: 1000,
  origin: 'bottom',
  distance: '50px',
  easing: 'ease-in-out',
  reset: false
});

// Theme color customization
function setThemeColor(color) {
  let bgColor = "#121212"; // default

  switch (color) {
    case "#F39C12": bgColor = "#14213D"; break;            // Oxford Blue
    case "#00ADB5": bgColor = "#1F1F1F"; break;            // Charcoal
    case "#1DB954": bgColor = "#0A192F"; break;            // Royal Navy
    case "#7F00FF": bgColor = "#2A2A2A"; break;            // Gunmetal
    case "#6C63FF": bgColor = "#1E1E2F"; break;            // Graphite
    case "#FF5733": bgColor = "#014421"; break;            // British Racing Green
    case "#00B894": bgColor = "#121212"; break;            // Dark Teal
    case "#6C5CE7": bgColor = "#121212"; break;            // Default
  }

  document.documentElement.style.setProperty('--accent-color', color);
  document.documentElement.style.setProperty('--bg-color', bgColor);

  localStorage.setItem('themeColor', color);
  localStorage.setItem('themeBgColor', bgColor);

  if (tsParticles?.domItem(0)) {
    tsParticles.domItem(0).options.particles.color.value = color;
    tsParticles.domItem(0).options.particles.links.color = color;
    tsParticles.domItem(0).refresh();
  }
}

function initTheme() {
  const savedColor = localStorage.getItem("themeColor");
  const savedBg = localStorage.getItem("themeBgColor");

  if (savedColor) {
    document.documentElement.style.setProperty('--accent-color', savedColor);
    const picker = document.querySelector('.color-picker');
    if (picker) picker.value = savedColor;
  }

  if (savedBg) {
    document.documentElement.style.setProperty('--bg-color', savedBg);
  }
}



// Typing animation for multiple targets
const typingTargets = [
  {
    elementId: "typed-text",
    phrases: ["Aspiring Web Developer", "Python Enthusiast", "Creative Thinker"]
  },
  {
    elementId: "about-typed-text",
    phrases: ["I develop responsive UIs with clean code and real-world solutions across multiple domains."]
  }
];

function startTyping({ elementId, phrases }) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let wordIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < phrases[wordIndex].length) {
      element.textContent += phrases[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 50);
    } else {
      setTimeout(() => {
        element.textContent = "";
        charIndex = 0;
        type(); // loop same phrase
      }, 3000);
    }
  }

  type();
}

// Project filtering
function filterProjects(tag) {
  document.querySelectorAll(".project-card").forEach(card => {
    const tags = card.getAttribute("data-tags");
    card.style.display = (tag === "all" || tags.includes(tag)) ? "block" : "none";
  });
}

// Toast logic
const form = document.querySelector(".contact-form");
const toast = document.getElementById("toast");

if (form && toast) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
      .then(response => {
        if (response.ok) {
          showToast("Message sent successfully!");
          form.reset();
        } else {
          showToast("Something went wrong.");
        }
      })
      .catch(() => showToast("Network error. Please try again."));
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}

// Init
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
  initTheme();
  typingTargets.forEach(startTyping);
});

// Mobile menu
function toggleMobileMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}
tsParticles.load("tsparticles", {
  background: { color: { value: "#00000000" } },
  particles: {
    number: { value: 60 },
    color: { value: "#6C5CE7" }, // matches accent
    shape: { type: "circle" },
    opacity: { value: 0.4 },
    size: { value: 3 },
    links: { enable: true, color: "#6C5CE7" },
    move: { enable: true, speed: 1 }
  },
  fullScreen: { enable: false }
});
