const extensionCards = document.querySelectorAll(".extension");

const themeToggle = document.querySelector(".nav-utility-toggle-container");
const themeIcon = document.querySelector(".nav-utility-toggle-container img");

const allButton = document.querySelector(".all-btn");
const activeButton = document.querySelector(".active-btn");
const inactiveButton = document.querySelector(".inactive-btn");

const extensionToggles = document.querySelectorAll(".switch input");
const removeButtons = document.querySelectorAll(".remove-btn");

const body = document.body;

let isDarkMode = localStorage.getItem("theme") === "dark";

// Apply the saved theme immediately when the page loads
body.classList.toggle("light", !isDarkMode);

if (isDarkMode) {
    themeIcon.src = "./Assets/images/icon-sun.svg";
    themeIcon.alt = "switch to light mode";
} else {
    themeIcon.src = "./Assets/images/icon-moon.svg";
    themeIcon.alt = "switch to dark mode";
}

themeToggle.addEventListener("click", () => {

    isDarkMode = !isDarkMode;

    body.classList.toggle("light", !isDarkMode);

    if (isDarkMode) {
        themeIcon.src = "./Assets/images/icon-sun.svg";
        themeIcon.alt = "switch to light mode";
    } else {
        themeIcon.src = "./Assets/images/icon-moon.svg";
        themeIcon.alt = "switch to dark mode";
    }

    // Save the user's selected theme
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

allButton.addEventListener("click", () => {
    activeButton.classList.remove("active-filter");
    inactiveButton.classList.remove("active-filter");

    allButton.classList.add("active-filter");

    extensionCards.forEach((card) => {
        card.style.display = "block";
    })
});

activeButton.addEventListener("click", () => {
    allButton.classList.remove("active-filter");
    inactiveButton.classList.remove("active-filter");

    activeButton.classList.add("active-filter");

    extensionCards.forEach((card) => {
        if (card.dataset.status === "active") {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

inactiveButton.addEventListener("click", () => {
    activeButton.classList.remove("active-filter");
    allButton.classList.remove("active-filter");

    inactiveButton.classList.add("active-filter");

    extensionCards.forEach((card) => {
        if (card.dataset.status === "inactive") {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    })
});

extensionToggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
        const extensionCard = toggle.closest(".extension");

        if (toggle.checked) {
            extensionCard.dataset.status = "active";
        } else {
            extensionCard.dataset.status = "inactive";
        }

        const extensionId = extensionCard.dataset.id;

        localStorage.setItem(extensionId, extensionCard.dataset.status);

        // Re-run the current filter
        if (activeButton.classList.contains("active-filter")) {
            activeButton.click();
        } else if (inactiveButton.classList.contains("active-filter")) {
            inactiveButton.click();
        } else {
            allButton.click();
        }
    });
});

extensionCards.forEach((card) => {
    const extensionId = card.dataset.id;

    const savedStatus = localStorage.getItem(extensionId);

    if (savedStatus !== null) {

        card.dataset.status = savedStatus;

        const toggle = card.querySelector(".switch-input");

        toggle.checked = savedStatus === "active";
    }
});

removeButtons.forEach((button) => {

    button.addEventListener("click", () => {
        const extensionCard = button.closest(".extension");

        extensionCard.remove();
    });
});