// Room Filter Functionality
document.querySelectorAll(".filter-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active class from all tabs
    document
      .querySelectorAll(".filter-tab")
      .forEach((t) => t.classList.remove("active"));
    // Add active class to clicked tab
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");
    const roomCards = document.querySelectorAll(".room-card-wrapper");

    roomCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Form step navigation
document.querySelectorAll(".next-step-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const currentStep = document.querySelector(".form-step.active");
    const inputs = currentStep.querySelectorAll(
      "input[required], select[required]"
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ff4444";
        input.style.boxShadow = "0 0 0 3px rgba(255, 68, 68, 0.2)";
      } else {
        input.style.borderColor = "#e0e0e0";
        input.style.boxShadow = "none";
      }
    });

    if (!isValid) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }

    const nextStep = this.getAttribute("data-next");
    document.querySelector(".form-step.active").classList.remove("active");
    document.getElementById(nextStep).classList.add("active");
  });
});

document.querySelectorAll(".prev-step-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const prevStep = this.getAttribute("data-prev");
    document.querySelector(".form-step.active").classList.remove("active");
    document.getElementById(prevStep).classList.add("active");
  });
});

// Guest counter
document
  .querySelector(".guest-btn.plus")
  .addEventListener("click", function () {
    const input = document.getElementById("guests");
    let value = parseInt(input.value);
    if (value < 4) {
      input.value = value + 1;
    }
  });

document
  .querySelector(".guest-btn.minus")
  .addEventListener("click", function () {
    const input = document.getElementById("guests");
    let value = parseInt(input.value);
    if (value > 1) {
      input.value = value - 1;
    }
  });

// Testimonial slider
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");

function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  currentSlide = (n + slides.length) % slides.length;

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}

document.querySelector(".slider-next").addEventListener("click", function () {
  showSlide(currentSlide + 1);
});

document.querySelector(".slider-prev").addEventListener("click", function () {
  showSlide(currentSlide - 1);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    showSlide(index);
  });
});

// Auto slide testimonials
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

// Set minimum date for check-in to today
const today = new Date().toISOString().split("T")[0];
document.getElementById("checkin").min = today;

// Update checkout min date when checkin changes
document.getElementById("checkin").addEventListener("change", function () {
  document.getElementById("checkout").min = this.value;
});

// Form submission to WhatsApp
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate terms checkbox
  const termsChecked = document.getElementById("terms").checked;
  if (!termsChecked) {
    alert("Please agree to the terms and conditions to proceed.");
    return;
  }

  // Get form data
  const roomType = document.getElementById("roomType").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const specialRequests = document.getElementById("specialRequests").value;

  // Format dates for better display
  const formattedCheckin = new Date(checkin).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedCheckout = new Date(checkout).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate number of nights
  const nights = Math.ceil(
    (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
  );

  // Create the WhatsApp message
  const whatsappMessage =
    `*🏨 FAMILY TREE GUEST HOUSE - NEW BOOKING REQUEST*%0A%0A` +
    `*📋 BOOKING DETAILS*%0A` +
    `🏠 Room Type: ${roomType}%0A` +
    `📅 Check-in: ${formattedCheckin}%0A` +
    `📅 Check-out: ${formattedCheckout}%0A` +
    `🌙 Number of Nights: ${nights}%0A` +
    `👥 Number of Guests: ${guests}%0A%0A` +
    `*👤 GUEST INFORMATION*%0A` +
    `👤 Name: ${firstName} ${lastName}%0A` +
    `📧 Email: ${email}%0A` +
    `📞 Phone: ${phone}%0A%0A` +
    `*💭 SPECIAL REQUESTS*%0A` +
    `${specialRequests || "No special requests"}%0A%0A` +
    `*📅 SUBMITTED ON*%0A` +
    `${new Date().toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}%0A%0A` +
    `_This booking request was submitted via the Family Tree Guest House website_`;

  // WhatsApp phone number
  const whatsappNumber = "9345112978";

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Open WhatsApp in new tab
  window.open(whatsappURL, "_blank");

  // Show confirmation message
  showBookingConfirmation(firstName);

  // Reset form after 1 second
  setTimeout(() => {
    resetForm();
  }, 1000);
});

// Show booking confirmation modal
function showBookingConfirmation(name) {
  // Create modal HTML
  const modalHTML = `
        <div id="bookingModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        ">
            <div style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: slideUp 0.4s ease;
            ">
                <div style="
                    background: #25D366;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 40px;
                    color: white;
                ">
                    <i class="fab fa-whatsapp"></i>
                </div>
                
                <h3 style="color: #1a252f; margin-bottom: 15px; font-size: 24px;">
                    WhatsApp Opening...
                </h3>
                
                <p style="color: #555; margin-bottom: 25px; line-height: 1.6;">
                    Hi ${name}! Your booking details are ready.<br>
                    We're opening WhatsApp to send your booking request to Family Tree Guest House.
                </p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 25px; text-align: left;">
                    <h4 style="color: #1a252f; margin-bottom: 10px; font-size: 16px;">
                        <i class="fas fa-info-circle" style="color: #25D366; margin-right: 8px;"></i>
                        What happens next?
                    </h4>
                    <ol style="color: #555; margin-left: 20px; font-size: 14px;">
                        <li>WhatsApp will open with your booking details</li>
                        <li>Review the message and click send</li>
                        <li>Our team will confirm your booking within 24 hours</li>
                        <li>You'll receive a confirmation message on WhatsApp</li>
                    </ol>
                </div>
                
                <button onclick="closeModal()" style="
                    background: #25D366;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-check"></i> Got it!
                </button>
                
                <p style="color: #888; font-size: 13px; margin-top: 20px;">
                    If WhatsApp doesn't open, <a href="#" onclick="retryWhatsApp()" style="color: #25D366; text-decoration: underline;">click here to try again</a>
                </p>
            </div>
        </div>
        
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Auto-close modal after 10 seconds
  setTimeout(closeModal, 10000);
}

// Close modal function
function closeModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.remove();
  }
}

// Retry WhatsApp function
function retryWhatsApp() {
  // Collect form data again
  const roomType = document.getElementById("roomType").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const specialRequests = document.getElementById("specialRequests").value;

  // Format dates
  const formattedCheckin = new Date(checkin).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedCheckout = new Date(checkout).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const nights = Math.ceil(
    (new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
  );

  // Format message (same as above)
  const whatsappMessage =
    `*🏨 FAMILY TREE GUEST HOUSE - NEW BOOKING REQUEST*%0A%0A` +
    `*📋 BOOKING DETAILS*%0A` +
    `🏠 Room Type: ${roomType}%0A` +
    `📅 Check-in: ${formattedCheckin}%0A` +
    `📅 Check-out: ${formattedCheckout}%0A` +
    `🌙 Number of Nights: ${nights}%0A` +
    `👥 Number of Guests: ${guests}%0A%0A` +
    `*👤 GUEST INFORMATION*%0A` +
    `👤 Name: ${firstName} ${lastName}%0A` +
    `📧 Email: ${email}%0A` +
    `📞 Phone: ${phone}%0A%0A` +
    `*💭 SPECIAL REQUESTS*%0A` +
    `${specialRequests || "No special requests"}%0A%0A` +
    `*📅 SUBMITTED ON*%0A` +
    `${new Date().toLocaleString("en-IN")}`;

  const whatsappNumber = "9345112978";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  window.open(whatsappURL, "_blank");
}

// Reset form after successful submission
function resetForm() {
  document.getElementById("bookingForm").reset();
  document.getElementById("guests").value = 1;

  // Reset to step 1
  document.querySelectorAll(".form-step").forEach((step) => {
    step.classList.remove("active");
  });
  document.getElementById("step1").classList.add("active");

  // Reset dates
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("checkin").value = "";
  document.getElementById("checkout").value = "";
  document.getElementById("checkin").min = today;
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Set current page as active in navigation
  setActiveNavLink();

  // Make sure check-in date is set to today or later
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("checkin").min = today;

  // Set check-out date to check-in + 1 day
  document.getElementById("checkin").addEventListener("change", function () {
    const checkinDate = new Date(this.value);
    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);
    document.getElementById("checkout").min = nextDay
      .toISOString()
      .split("T")[0];
  });
});

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}
