// WhatsApp Form Submission
document.addEventListener("DOMContentLoaded", function () {
  // WhatsApp Form Submission
  const form = document.getElementById("whatsappContactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !phone || !subject || !message) {
        alert("Please fill in all required fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Phone validation for WhatsApp
      const phoneRegex = /^[0-9]{10}$/;
      const cleanPhone = phone.replace(/\D/g, "");
      if (!phoneRegex.test(cleanPhone) && cleanPhone.length !== 10) {
        alert("Please enter a valid 10-digit phone number for WhatsApp");
        return;
      }

      // Format the message for WhatsApp
      const whatsappMessage =
        `*NEW CONTACT FORM SUBMISSION - FAMILY TREE GUEST HOUSE*\n\n` +
        `*Name:* ${name}\n` +
        `*Email:* ${email}\n` +
        `*Phone:* ${phone}\n` +
        `*Subject:* ${subject}\n` +
        `*Message:*\n${message}\n\n` +
        `_This message was sent via your website contact form_`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // WhatsApp phone number (remove any spaces, dashes, etc.)
      const whatsappNumber = "9176808873";

      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappURL, "_blank");

      // Show success message
      alert(
        "Opening WhatsApp with your message... Please send the message when WhatsApp opens."
      );

      // Reset form after a short delay
      setTimeout(() => {
        this.reset();

        // Reset all labels
        document.querySelectorAll(".colorful-input").forEach((input) => {
          if (!input.value) {
            const label = input.parentElement.querySelector(".colorful-label");
            if (label) {
              label.style.top = "15px";
              label.style.fontSize = "16px";
              label.style.color = "#999";
            }
          }
        });
      }, 1000);

      // Animate submit button
      const submitBtn = document.querySelector(".whatsapp-submit-button");
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Opening WhatsApp...';
      submitBtn.style.background =
        "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)";

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background =
          "linear-gradient(135deg, #25D366 0%, #128C7E 100%)";
      }, 2000);
    });
  }

  // Format phone number as user types
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "");

      if (value.length > 10) {
        value = value.substring(0, 10);
      }

      // Format as Indian phone number
      if (value.length > 5) {
        value = value.substring(0, 5) + " " + value.substring(5);
      }
      if (value.length > 8) {
        value = value.substring(0, 8) + " " + value.substring(8);
      }

      this.value = value;
    });

    // Set placeholder for phone input
    phoneInput.placeholder = "98XXXXX321";
  }

  // Animate form inputs on focus
  const inputs = document.querySelectorAll(".colorful-input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });
  });

  // Contact button actions
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const action = this.getAttribute("data-action");

      switch (action) {
        case "directions":
          window.open(
            "https://www.google.com/maps/dir//Family+Tree+Guest+house+2,+XRQP%2B64V,+Bommayapalayam,+Puducherry,+Tamil+Nadu+605101/@11.7089254,79.7939542,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3a54c4c2c25fb56d:0x31562a500e8b8f0c!2m2!1d79.7965291!2d11.7089254!3e0",
            "_blank"
          );
          break;

        case "call":
          window.location.href = "tel:9176808873";
          break;

        case "email":
          window.location.href = "mailto:info@familytreeguesthouse.com";
          break;
      }
    });
  });

  // Floating label functionality
  document.querySelectorAll(".colorful-input").forEach((input) => {
    // Check if input has value on page load
    if (input.value) {
      const label = input.parentElement.querySelector(".colorful-label");
      if (label) {
        label.style.top = "-10px";
        label.style.fontSize = "12px";
        label.style.color = "#667eea";
      }
    }

    input.addEventListener("input", function () {
      const label = this.parentElement.querySelector(".colorful-label");
      if (label) {
        if (this.value) {
          label.style.top = "-10px";
          label.style.fontSize = "12px";
          label.style.color = "#667eea";
        } else {
          label.style.top = "15px";
          label.style.fontSize = "16px";
          label.style.color = "#999";
        }
      }
    });
  });

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      document.querySelector("nav").classList.toggle("mobile-visible");
    });
  }

  // Add animation to contact cards
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.animation = "float 0.5s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.animation = "float 3s ease-in-out infinite";
    });
  });
});

// Add dynamic styles for animations
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .whatsapp-submit-button i {
    font-size: 20px;
  }
  
  .whatsapp-direct-button i {
    font-size: 20px;
  }
  
  .whatsapp-chat-icon i {
    font-size: 30px;
  }
`;
document.head.appendChild(style);
