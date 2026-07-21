const extensionCards = document.querySelectorAll(".extension");
const themeToggle = document.querySelector(".nav-utility-toggle-container");
const themeIcon = document.querySelector(".nav-utility-toggle-container img");

const activeButton = document.querySelector(".active-btn");
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

activeButton.addEventListener("click", () => {
    console.log("Active Button clicked!");
})
// extensionCards.forEach((card, index) => {
//     card.style.border = "2px solid red";
// });


// console.log(themeIcon);



















// let listOfStudent = ['Adaeze', 'Okechukwu', 'Emmanuel', 'Prosper']

// listOfStudent = 

// [{
//     name: 'Adaeze',
//     age: 19,
//     course: 'computer science',
//     isEnrolled: true
// }, 

// {
//     name : 'Okechukwu',
//     age : 20,
//     course: 'Agriculture',
//     isEnrolled: false
// },

// {
//     name: 'Emmanuel',
//     age: 17,
//     course: 'Economics',
//     isEnrolled: true
// },

// {
//     name : 'Prosper',
//     age: 22 ,
//     course: 'social analogy',
//     isErolled: false
// }]


// console.log(listOfStudent);