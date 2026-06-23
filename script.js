const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = document.querySelectorAll('a[href^="#"]');
const faqItems = document.querySelectorAll(".faq-item");
const ctaButtons = document.querySelectorAll(".cta-button");
const countdownHours = document.querySelector("[data-countdown-hours]");
const countdownMinutes = document.querySelector("[data-countdown-minutes]");
const countdownSeconds = document.querySelector("[data-countdown-seconds]");
const stickyOffer = document.querySelector("[data-sticky-offer]");
let lastScrollY = window.scrollY;

// Mobile navigation state.
function closeMenu() {
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function setStickyOfferState() {
  if (!stickyOffer) {
    return;
  }

  const currentScrollY = window.scrollY;
  const isScrollingUp = currentScrollY < lastScrollY;
  const shouldFixOffer = isScrollingUp && currentScrollY > 320;

  stickyOffer.classList.toggle("is-fixed", shouldFixOffer);
  document.body.classList.toggle("offer-is-fixed", shouldFixOffer);
  lastScrollY = Math.max(currentScrollY, 0);
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("is-active");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navMenu.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
});

// Smooth in-page scrolling for header, footer, and CTA links.
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId && targetId.startsWith("#") && targetId.length > 1) {
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// FAQ accordion. Only one answer stays open at a time.
faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    faqItems.forEach((otherItem) => {
      const otherButton = otherItem.querySelector(".faq-question");
      const otherAnswer = otherItem.querySelector(".faq-answer");

      otherItem.classList.remove("is-open");
      otherButton.setAttribute("aria-expanded", "false");
      otherAnswer.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

// Small tactile feedback for primary action clicks.
ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("is-pressed");
    window.setTimeout(() => button.classList.remove("is-pressed"), 180);
  });
});

function startOfferCountdown() {
  if (!countdownHours || !countdownMinutes || !countdownSeconds) {
    return;
  }

  const offerDuration = 60 * 60 * 1000;
  let offerEndsAt = Number(localStorage.getItem("kidsWorksheetOfferEndsAt"));

  if (!offerEndsAt || offerEndsAt <= Date.now()) {
    offerEndsAt = Date.now() + offerDuration;
    localStorage.setItem("kidsWorksheetOfferEndsAt", String(offerEndsAt));
  }

  function updateCountdown() {
    let remaining = offerEndsAt - Date.now();

    if (remaining <= 0) {
      offerEndsAt = Date.now() + offerDuration;
      localStorage.setItem("kidsWorksheetOfferEndsAt", String(offerEndsAt));
      remaining = offerDuration;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownHours.textContent = String(hours).padStart(2, "0");
    countdownMinutes.textContent = String(minutes).padStart(2, "0");
    countdownSeconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}

window.addEventListener("scroll", () => {
  setHeaderState();
  setStickyOfferState();
}, { passive: true });
window.addEventListener("resize", () => {
  const openAnswer = document.querySelector(".faq-item.is-open .faq-answer");

  if (openAnswer) {
    openAnswer.style.maxHeight = `${openAnswer.scrollHeight}px`;
  }
});

setHeaderState();
setStickyOfferState();
startOfferCountdown();
