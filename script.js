// ======================================================
// Browser Extension Manager
// Handles theme switching, extension filtering,
// status persistence, and extension removal.
// ======================================================


// ======================================================
// DOM ELEMENTS
// Cache frequently used elements for better readability
// and to avoid querying the DOM repeatedly.
// ======================================================

const extensionCards = document.querySelectorAll(".extension");

const themeToggle = document.querySelector(".nav-utility-toggle-container");
const themeIcon = document.querySelector(".nav-utility-toggle-container img");

const allButton = document.querySelector(".all-btn");
const activeButton = document.querySelector(".active-btn");
const inactiveButton = document.querySelector(".inactive-btn");

const extensionToggles = document.querySelectorAll(".switch input");
const removeButtons = document.querySelectorAll(".remove-btn");

const body = document.body;


// ======================================================
// THEME MANAGEMENT
// Restores the user's preferred theme and allows
// switching between light and dark mode.
// ======================================================

// Retrieve the previously selected theme from localStorage
let isDarkMode = localStorage.getItem("theme") === "dark";

// Apply the saved theme immediately when the page loads
body.classList.toggle("light", !isDarkMode);

// Update the theme toggle icon to match the current theme
if (isDarkMode) {
    themeIcon.src = "./Assets/images/icon-sun.svg";
    themeIcon.alt = "Switch to light mode";
} else {
    themeIcon.src = "./Assets/images/icon-moon.svg";
    themeIcon.alt = "Switch to dark mode";
}

// Toggle between light and dark mode
themeToggle.addEventListener("click", () => {

    isDarkMode = !isDarkMode;

    body.classList.toggle("light", !isDarkMode);

    if (isDarkMode) {
        themeIcon.src = "./Assets/images/icon-sun.svg";
        themeIcon.alt = "Switch to light mode";
    } else {
        themeIcon.src = "./Assets/images/icon-moon.svg";
        themeIcon.alt = "Switch to dark mode";
    }

    // Persist the user's preferred theme across browser sessions
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});


// ======================================================
// EXTENSION FILTERING
// Controls which extension cards are displayed based
// on the selected filter.
// ======================================================

// Display every extension
allButton.addEventListener("click", () => {

    activeButton.classList.remove("active-filter");
    inactiveButton.classList.remove("active-filter");
    allButton.classList.add("active-filter");

    extensionCards.forEach((card) => {
        card.style.display = "block";
    });

});

// Display only active extensions
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

// Display only inactive extensions
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

    });

});


// ======================================================
// EXTENSION STATUS
// Updates each extension's active/inactive state and
// stores the status in localStorage.
// ======================================================

extensionToggles.forEach((toggle) => {

    toggle.addEventListener("change", () => {

        const extensionCard = toggle.closest(".extension");

        // Update the card's status based on the toggle state
        if (toggle.checked) {
            extensionCard.dataset.status = "active";
        } else {
            extensionCard.dataset.status = "inactive";
        }

        // Save the current status using the extension's unique ID
        const extensionId = extensionCard.dataset.id;

        localStorage.setItem(extensionId, extensionCard.dataset.status);

        // Refresh the currently selected filter so the UI
        // immediately reflects the new status.
        if (activeButton.classList.contains("active-filter")) {
            activeButton.click();
        } else if (inactiveButton.classList.contains("active-filter")) {
            inactiveButton.click();
        } else {
            allButton.click();
        }

    });

});


// ======================================================
// RESTORE SAVED EXTENSION STATES
// Reapply each extension's saved status whenever
// the page reloads.
// ======================================================

extensionCards.forEach((card) => {

    const extensionId = card.dataset.id;

    const savedStatus = localStorage.getItem(extensionId);

    if (savedStatus !== null) {

        card.dataset.status = savedStatus;

        const toggle = card.querySelector(".switch-input");

        toggle.checked = savedStatus === "active";

    }

});


// ======================================================
// REMOVE EXTENSIONS
// Removes an extension card from the page.
// (Version 1 behaviour only - removal is not persisted.)
// ======================================================

removeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const extensionCard = button.closest(".extension");

        extensionCard.remove();

    });

});