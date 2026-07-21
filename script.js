const extensionCards = document.querySelectorAll(".extension");

const themeToggle = document.querySelector(".nav-utility-toggle-container");
const themeIcon = document.querySelector(".nav-utility-toggle-container img");

const allButton = document.querySelector(".all-btn");
const activeButton = document.querySelector(".active-btn");
const inactiveButton = document.querySelector(".inactive-btn");

const body = document.querySelector("body");

let isDarkMode = true
themeToggle.addEventListener("click", () => {

    isDarkMode = !isDarkMode;

    body.classList.toggle("light", !isDarkMode);

    if(isDarkMode) {
        themeIcon.src = "./Assets/images/icon-sun.svg";
        themeIcon.alt = "switch to light mode";
    } else {
        themeIcon.src = "./Assets/images/icon-moon.svg";
        themeIcon.alt = "switch to dark mode";
    }
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

