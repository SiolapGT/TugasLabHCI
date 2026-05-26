// Transisi Header saat Scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 20) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

// Logika Navigasi SPA
function navigate(pageId) {
  const pages = document.querySelectorAll(".section");
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.remove("section--active");
  }

  document.getElementById(pageId).classList.add("section--active");

  const links = document.querySelectorAll(".header__link");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("header__link--active");
    if (links[i].getAttribute("data-target") === pageId) {
      links[i].classList.add("header__link--active");
    }
  }

  const navLinks = document.querySelector(".header__menu");
  const header = document.querySelector(".header");
  if (navLinks.classList.contains("header__menu--show")) {
    navLinks.classList.remove("header__menu--show");
    header.classList.remove("header--menu-open");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Toggle Menu Mobile
function toggleMenu() {
  const navLinks = document.querySelector(".header__menu");
  const header = document.querySelector(".header");
  navLinks.classList.toggle("header__menu--show");
  header.classList.toggle("header--menu-open");
}

// Validasi Formulir Buletin
document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("emailAddr").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const topic = document.getElementById("interestTopic").value;
    const frequencyRadios = document.getElementsByName("frequency");

    let errors = [];

    if (name === "") {
      errors.push("Full Name is required.");
    } else if (name.length < 3) {
      errors.push("Full Name must be at least 3 characters.");
    }

    let atSymbolIndex = email.indexOf("@");
    let dotIndex = email.lastIndexOf(".");
    if (email === "") {
      errors.push("Email Address is required.");
    } else if (
      atSymbolIndex < 1 ||
      dotIndex <= atSymbolIndex + 1 ||
      dotIndex === email.length - 1
    ) {
      errors.push("Please enter a valid Email Address.");
    }

    let isPhoneNumeric = true;
    for (let i = 0; i < phone.length; i++) {
      if (phone[i] < "0" || phone[i] > "9") {
        isPhoneNumeric = false;
        break;
      }
    }

    if (phone === "") {
      errors.push("Phone Number is required.");
    } else if (!isPhoneNumeric) {
      errors.push("Phone Number can only contain numbers.");
    } else if (phone.length < 8 || phone.length > 15) {
      errors.push("Phone Number must be between 8 and 15 digits.");
    }

    if (topic === "") {
      errors.push("Please select your Topic of Interest.");
    }

    let isFrequencySelected = false;
    for (let i = 0; i < frequencyRadios.length; i++) {
      if (frequencyRadios[i].checked) {
        isFrequencySelected = true;
        break;
      }
    }

    if (!isFrequencySelected) {
      errors.push("Please select your preferred Update Frequency.");
    }

    const msgBox = document.getElementById("form-messages");

    if (errors.length > 0) {
      msgBox.className = "message message--error";
      msgBox.innerHTML =
        "<strong>Please correct the following errors:</strong><br><br>" +
        errors.join("<br>");
    } else {
      msgBox.className = "message message--success";
      msgBox.innerHTML =
        "<strong>Success!</strong> Welcome to the FontDale newsletter. Your preferences have been saved.";
      document.getElementById("newsletter-form").reset();
    }
  });
