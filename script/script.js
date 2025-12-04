// Mobile Navigation Toggle
const mobileToggle = document.querySelector(".mobile-toggle");
const mainNav = document.querySelector(".main-nav");
const dropdowns = document.querySelectorAll(".dropdown");

// Toggle mobile menu
mobileToggle.addEventListener("click", () => {
  mobileToggle.classList.toggle("active");
  mainNav.classList.toggle("active");

  // Close all dropdowns when mobile menu closes
  if (!mainNav.classList.contains("active")) {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

// Handle dropdowns on mobile
dropdowns.forEach((dropdown) => {
  const dropbtn = dropdown.querySelector(".dropbtn");

  dropbtn.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("active");

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove("active");
        }
      });
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!e.target.closest(".dropdown") && !e.target.closest(".mobile-toggle")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  }
});

// Navbar scroll effect
const navbar = document.querySelector(".fixed-navbar");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add/remove scrolled class based on scroll position
  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide/show navbar on scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    // Reset mobile menu
    mobileToggle.classList.remove("active");
    mainNav.classList.remove("active");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      mobileToggle.classList.remove("active");
      mainNav.classList.remove("active");
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    if (email) {
      // Show success message
      alert("Thank you for subscribing to our newsletter!");
      newsletterForm.reset();
    }
  });
}

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else if (
      currentPage === "" &&
      link.getAttribute("href") === "index.html"
    ) {
      // For home page
      link.classList.add("active");
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink();

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
