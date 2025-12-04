// About Page Specific JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Animate statistics counter
  animateStats();

  // Initialize flip cards
  initFlipCards();

  // Animate amenities on scroll
  initScrollAnimations();

  // Add click functionality to value cards (optional click in addition to hover)
  initValueCards();

  // Add parallax effect to hero section
  initParallax();
});

// Animate statistics counter
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          const target = parseInt(statNumber.getAttribute("data-count"));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            statNumber.textContent = Math.floor(current);
          }, 16);

          observer.unobserve(statNumber);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => observer.observe(stat));
}

// Initialize flip cards with click functionality
function initFlipCards() {
  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    // Add click functionality for mobile (optional)
    card.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        const inner = this.querySelector(".flip-card-inner");
        inner.style.transform =
          inner.style.transform === "rotateY(180deg)" ? "" : "rotateY(180deg)";
      }
    });
  });
}

// Initialize value cards with click functionality
function initValueCards() {
  const valueCards = document.querySelectorAll(".value-card");

  valueCards.forEach((card) => {
    card.addEventListener("click", function () {
      const inner = this.querySelector(".value-card-inner");
      inner.style.transform =
        inner.style.transform === "rotateY(180deg)" ? "" : "rotateY(180deg)";
    });
  });
}

// Animate elements on scroll
function initScrollAnimations() {
  const animateElements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.getAttribute("data-animate");
          const delay = element.getAttribute("data-delay") || 0;

          setTimeout(() => {
            element.classList.add("animate");
            element.style.animationDelay = delay;
          }, parseFloat(delay) * 1000);

          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.2 }
  );

  animateElements.forEach((element) => observer.observe(element));
}

// Parallax effect for hero section
function initParallax() {
  const hero = document.querySelector(".about-hero");

  if (hero && window.innerWidth > 768) {
    window.addEventListener("scroll", function () {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.backgroundPosition = `center ${rate}px`;
    });
  }
}

// Add smooth scroll to timeline items
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    if (item.classList.contains("timeline-item:nth-child(odd)")) {
      item.style.transform = "translateX(-50px)";
    } else {
      item.style.transform = "translateX(50px)";
    }

    observer.observe(item);
  });
}

// Initialize everything when DOM is loaded
window.addEventListener("load", function () {
  initTimelineAnimation();

  // Add loading animation to page
  document.body.classList.add("loaded");
});
