// Smooth scroll to section by id
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Dark mode toggle
const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Animate elements on scroll (fade, slide, zoom)
const fadeElems = document.querySelectorAll('.fade-in');
const slideElems = document.querySelectorAll('.slide-in');
const zoomElems = document.querySelectorAll('.zoom-in');

function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  fadeElems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.style.animationPlayState = 'running';
  });
  slideElems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.style.animationPlayState = 'running';
  });
  zoomElems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerBottom) el.style.animationPlayState = 'running';
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Count-up animation for stats numbers
const stats = document.querySelectorAll('.stat-number');
const speed = 200; // lower is faster

function countUp(el) {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const increment = target / speed;

  function update() {
    count += increment;
    if (count < target) {
      el.textContent = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }
  update();
}

function handleStatsAnimation() {
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom >= 0) {
    stats.forEach(el => {
      if (!el.classList.contains('counted')) {
        countUp(el);
        el.classList.add('counted');
      }
    });
  }
}

window.addEventListener('scroll', handleStatsAnimation);
window.addEventListener('load', handleStatsAnimation);

// Contact form handling with validation & fake async submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();
  const responseDiv = document.getElementById("formResponse");

  if (!name || !email || !service || !message) {
    responseDiv.textContent = "Please fill out all fields.";
    responseDiv.style.color = "red";
    return;
  }

  if (!validateEmail(email)) {
    responseDiv.textContent = "Please enter a valid email address.";
    responseDiv.style.color = "red";
    return;
  }

  responseDiv.textContent = "Sending...";
  responseDiv.style.color = "#333";

  setTimeout(() => {
    responseDiv.textContent = `Thank you for contacting us, ${name}! We'll get back to you soon about ${service}.`;
    responseDiv.style.color = "green";
    e.target.reset();
  }, 1500);
});

function validateEmail(email) {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email.toLowerCase());
}

// Menu toggle for mobile (if you add hamburger/menu icon)
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Close menu when clicking a nav link
function closeMenu() {
  if(navMenu) navMenu.classList.remove('open');
}



