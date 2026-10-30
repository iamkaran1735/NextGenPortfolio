// Karan Kumar Soni — portfolio interactions
// Add only your real profile URLs and email below. Phone number is intentionally not shown.

const portfolioConfig = {
  email: "er.karankumarsoni@gmail.com",

  socials: {
    linkedin: "https://www.linkedin.com/in/karan-kumar-soni-814406251",  // Apna asli LinkedIn URL
    github: "https://www.github.com/iamkaran1735",    // Apna asli GitHub URL
    instagram: "https://www.instagram.com/soniji3585", // Apna asli Instagram URL
    // youtube: "https://www.youtube.com/@karan-kumar-soni-814406251"    // Apna asli YouTube channel URL
  }
};

// Make every social icon clickable
document.querySelectorAll("[data-social]").forEach((link) => {
  const platform = link.dataset.social;
  const url = portfolioConfig.socials[platform];

  if (url && /^https?:\/\//i.test(url)) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = `Visit my ${platform} profile`;
  } else {
    // Don't let empty links jump to the top of the page.
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert(`Please add your ${platform} profile URL in script.js`);
    });
  }
});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll(".nav-link, .nav-links .button").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Update year automatically.
document.getElementById("year").textContent = new Date().getFullYear();

// Download a clean, editable text resume from the details currently in this portfolio.
function downloadResume() {
  const resume = `KARAN KUMAR SONI
B.Tech Computer Science & Engineering | Aspiring Data Scientist

PROFILE
Computer Science and Engineering student interested in Data Science, analytics, and web development.
Focused on learning through hands-on projects and building practical technical skills.

EDUCATION
B.Tech — Computer Science & Engineering
B.N. College of Engineering & Technology
Expected graduation: 2027

TECHNICAL SKILLS
Python, SQL, HTML, CSS, JavaScript, Pandas, NumPy, Machine Learning fundamentals,
Streamlit, Plotly, Excel, GitHub

PROJECTS
1. Supply Chain Analytics Dashboard
Interactive analytics dashboard concept for exploring shipping performance, delivery gaps,
shipping modes, and order regions. Technologies: Python, Pandas, Streamlit, Plotly.

2. Coffee Product Optimization & Revenue Dashboard
Dashboard concept for examining sales, product categories, store contribution, hourly patterns,
and top-selling products. Technologies: Python, Pandas, Streamlit, Excel.

CAREER INTERESTS
Data Analytics, Data Science, Machine Learning, and Web Development

CONTACT
Email: ${portfolioConfig.email || "er.karankumarsoni@gmail.com"}
Phone: ${portfolioConfig.phone || "+91 8873741735"}
LinkedIn: ${portfolioConfig.socials.linkedin || "https://www.linkedin.com/in/karan-kumar-soni-814406251"}
GitHub: ${portfolioConfig.socials.github || "https://www.github.com/iamkaran1735"}
Instagram: ${portfolioConfig.socials.instagram || "https://www.instagram.com/iamkaran1735"}

Note: Add accurate school details, dates, certifications, achievements, and project links before
using this resume for job applications. Update the content to reflect your actual experience.`;
  const blob = new Blob([resume], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Karan-Kumar-Soni-Resume.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
document.getElementById("downloadResumeTop")?.addEventListener("click", downloadResume);

// If real social URLs are provided, turn the hero placeholders into working links.
const socialLinkMap = [
  { selector: ".social-row .social-link:nth-child(1)", key: "linkedin", label: "LinkedIn" },
  { selector: ".social-row .social-link:nth-child(2)", key: "github", label: "GitHub" },
  { selector: ".social-row .social-link:nth-child(3)", key: "instagram", label: "Instagram" }
];
socialLinkMap.forEach(({ selector, key, label }) => {
  const el = document.querySelector(selector);
  const url = portfolioConfig.socials[key];
  if (el && url && /^https?:\/\//i.test(url)) {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.title = `Open ${label}`;
    el.setAttribute("aria-label", `Open ${label} profile`);
  }
});

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  formFeedback.textContent = "Sending your message...";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      formFeedback.textContent = "Message sent successfully!";
      contactForm.reset();
    } else {
      formFeedback.textContent =
        "Message could not be sent. Please check your form settings.";
    }
  } catch (error) {
    formFeedback.textContent =
      "Connection error. Please check your internet and try again.";
  }
});

// Reveal cards as they enter the viewport; show everything if observer is unavailable.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Active navigation link based on visible section.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}


// const exploreWorkBtn = document.getElementById("exploreWorkBtn");

// exploreWorkBtn?.addEventListener("click", () => {
//   exploreWorkBtn.classList.add("loading");
//   exploreWorkBtn.disabled = true;

//   exploreWorkBtn.querySelector(".button-text").textContent = "Loading Projects...";

//   setTimeout(() => {
//     window.location.hash = "projects";

//     document.getElementById("projects")?.scrollIntoView({
//       behavior: "smooth"
//     });

//     exploreWorkBtn.classList.remove("loading");
//     exploreWorkBtn.disabled = false;
//     exploreWorkBtn.querySelector(".button-text").textContent = "Explore My Work";
//   }, 1000);
// });



// Single-page section navigation
const pageSections = document.querySelectorAll(".page-section");




let pageTransitionRunning = false;

function showPage(pageId) {
    const selectedPage = document.getElementById(pageId);

    if (!selectedPage ||
        !selectedPage.classList.contains("page-section")) {
        return;
    }

    if (pageTransitionRunning) return;

    const loader = document.getElementById("navPageLoader");

    // Home page: open directly, without loading
if (pageId === "home") {

    document.body.classList.add("home-page");
    document.body.classList.remove("projects-page");
    document.body.classList.remove("about-page");

    document.querySelectorAll(".page-section").forEach(section => {
        section.classList.remove("active-page");
    });

    selectedPage.classList.add("active-page");

    if (loader) {
        loader.classList.remove("show");
    }

    window.scrollTo(0, 0);
    return;
}

    // Internal navigation only
    pageTransitionRunning = true;

    if (loader) {
        loader.classList.add("show");
    }

    setTimeout(() => {

        document.querySelectorAll(".page-section").forEach(section => {
            section.classList.remove("active-page");
        });

        document.body.classList.toggle("projects-page", pageId === "projects");
        document.body.classList.toggle("home-page", pageId === "home");
        document.body.classList.toggle("about-page", pageId === "about");

        selectedPage.classList.add("active-page");

        window.scrollTo(0, 0);

        setTimeout(() => {
            if (loader) {
                loader.classList.remove("show");
            }

            pageTransitionRunning = false;
        }, 300);

    }, 700);
}




// Handle navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.getAttribute("href").slice(1);
    const targetPage = document.getElementById(pageId);

    if (targetPage && targetPage.classList.contains("page-section")) {
      event.preventDefault();
      showPage(pageId);
      history.replaceState(null, "", `#${pageId}`);
    }
  });
});

// Explore My Work button
const exploreWorkBtn = document.getElementById("exploreWorkBtn");

exploreWorkBtn?.addEventListener("click", () => {
  exploreWorkBtn.classList.add("loading");
  exploreWorkBtn.disabled = true;

  const buttonText = exploreWorkBtn.querySelector(".button-text");

  if (buttonText) {
    buttonText.textContent = "Loading Projects...";
  }

  setTimeout(() => {
    showPage("projects");
    history.replaceState(null, "", "#projects");

    exploreWorkBtn.classList.remove("loading");
    exploreWorkBtn.disabled = false;

    if (buttonText) {
      buttonText.textContent = "Explore My Work";
    }
  }, 1000);
});

const initialPage = window.location.hash.slice(1) || "home";

if (document.getElementById(initialPage)?.classList.contains("page-section")) {
    showPage(initialPage);
} else {
    showPage("home");
}

// Make project cards clickable
document.querySelectorAll(".clickable-project").forEach((card) => {
  const openProject = () => {
    const url = card.dataset.projectUrl;

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  card.addEventListener("click", (event) => {
    // Allow the existing links inside the card to work normally
    if (event.target.closest("a, button")) return;

    openProject();
  });

  card.addEventListener("keydown", (event) => {
    if (event.target !== card) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  });
});



// Welcome screen -> visitor form -> email -> portfolio
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjyyrqgd";

const welcomeGate = document.getElementById("welcomeGate");
const visitorGate = document.getElementById("visitorGate");
const enterPortfolioBtn = document.getElementById("enterPortfolio");
const backToWelcomeBtn = document.getElementById("backToWelcome");
const visitorForm = document.getElementById("visitorForm");
const visitorSubmit = document.getElementById("visitorSubmit");
const visitorFeedback = document.getElementById("visitorFeedback");

enterPortfolioBtn?.addEventListener("click", () => {
  welcomeGate.hidden = true;
  visitorGate.hidden = false;
  document.getElementById("visitorName")?.focus();
});

backToWelcomeBtn?.addEventListener("click", () => {
  visitorGate.hidden = true;
  welcomeGate.hidden = false;
});

visitorForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (
    !FORMSPREE_ENDPOINT.startsWith("https://formspree.io/f/mjyyrqgd") ||
    FORMSPREE_ENDPOINT.includes("PASTE_YOUR")
  ) {
    visitorFeedback.textContent =
      "Please add your real Formspree endpoint in script.js first.";
    return;
  }

  visitorSubmit.disabled = true;
  visitorSubmit.textContent = "Submitting... Please wait";
  visitorFeedback.textContent = "Submitting your details securely...";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(visitorForm),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    visitorFeedback.textContent =
      "Thank you! Your details were submitted successfully.";

    visitorForm.reset();

    setTimeout(() => {
      visitorGate.hidden = true;
      welcomeGate.hidden = true;
      document.body.classList.remove("onboarding-required");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  } catch (error) {
    visitorFeedback.textContent =
      "Submission failed. Please check your internet and Formspree endpoint, then try again.";
  } finally {
    visitorSubmit.disabled = false;
    visitorSubmit.innerHTML = 'Submit &amp; Explore <span>→</span>';
  }
});



const visitorPhoneInput = document.getElementById("visitorPhone");

visitorPhoneInput?.addEventListener("input", () => {
  // Remove every character except digits
  visitorPhoneInput.value = visitorPhoneInput.value
    .replace(/[^0-9]/g, "")
    .slice(0, 10);
});



const countryCodeSelect = document.getElementById("countryCode");
const countryFlagDisplay = document.getElementById("countryFlag");

function updateCountryFlag() {
  if (!countryCodeSelect || !countryFlagDisplay) return;

  const selectedOption =
    countryCodeSelect.options[countryCodeSelect.selectedIndex];

  const country = selectedOption.dataset.flagCode;

  if (country) {
    countryFlagDisplay.src =
      `https://flagcdn.com/w40/${country}.png`;
    countryFlagDisplay.alt = `${selectedOption.textContent.trim()} flag`;
  }
}

countryCodeSelect?.addEventListener("change", updateCountryFlag);
updateCountryFlag();

// Logout button functionality
const logoutBtn = document.getElementById("logoutBtn");

function updateLogoutButton() {
  const welcomeGate = document.querySelector(".welcome-gate");
  const visitorForm = document.querySelector(".visitor-card");

  const isWelcomeVisible =
    welcomeGate && !welcomeGate.hidden;

  const isVisitorFormVisible =
    visitorForm && !visitorForm.hidden;

  const isHomePage =
  window.location.hash === "#home" ||
  document.body.classList.contains("home-page") ||
  !window.location.hash;

  if (logoutBtn) {
    logoutBtn.style.display =
      !isWelcomeVisible &&
      !isVisitorFormVisible &&
      !isHomePage
        ? "inline-flex"
        : "none";
  }
}

// Update Logout button whenever the page changes
function refreshLogoutButton() {
  updateLogoutButton();
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(refreshLogoutButton, 100);
  });
});

window.addEventListener("hashchange", refreshLogoutButton);
window.addEventListener("load", refreshLogoutButton);

refreshLogoutButton();

logoutBtn?.addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to logout?");

  if (!confirmed) return;

  // Remove saved visitor session, if used
  sessionStorage.removeItem("portfolioVisited");
  localStorage.removeItem("portfolioVisited");

  // Show welcome screen
  const welcomeGate = document.querySelector(".welcome-gate");

  if (welcomeGate) {
    welcomeGate.hidden = false;
    welcomeGate.style.display = "grid";
  }

  // Hide the portfolio
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.remove("active-page");
  });

  document.body.classList.remove("home-page", "projects-page");

  // Return to the welcome UI
  window.location.hash = "";
  window.scrollTo({ top: 0, behavior: "smooth" });

  updateLogoutButton();
});

// Update button visibility on navigation
window.addEventListener("hashchange", updateLogoutButton);
document.addEventListener("DOMContentLoaded", updateLogoutButton);

function updateResumeButton() {
  const aboutSection = document.querySelector("#about");
  const resumeButton = document.querySelector("#downloadResumeBtn");

  if (!aboutSection || !resumeButton) return;

  const currentHash = window.location.hash;

  if (currentHash === "#about") {
    document.body.classList.add("about-page");
  } else {
    document.body.classList.remove("about-page");
  }
}

window.addEventListener("hashchange", updateResumeButton);
window.addEventListener("load", updateResumeButton);

updateResumeButton();

const enterButton = document.getElementById("enterPortfolio");
const welcomeScreen = document.getElementById("welcomeGate");

enterButton?.addEventListener("click", () => {
  if (enterButton.disabled) return;

  enterButton.disabled = true;

  const loader = document.createElement("div");
  loader.className = "portfolio-loader";

  loader.innerHTML = `
    <img src="assets/logo.png" alt="Karan Kumar Soni Logo">
    <div class="loader-spinner"></div>
    <p>LOADING YOUR PORTFOLIO...</p>
  `;

  document.body.appendChild(loader);

  setTimeout(() => {
    welcomeScreen?.remove();
    loader.remove();

    document.body.classList.remove("welcome-open");

    if (typeof showPage === "function") {
      showPage("home");
    } else {
      document.querySelectorAll(".page-section").forEach(section => {
        section.classList.remove("active-page");
      });

      document.getElementById("home")?.classList.add("active-page");
      window.location.hash = "home";
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, 1500);
});

