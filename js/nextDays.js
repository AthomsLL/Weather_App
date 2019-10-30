// Création d'un tableau avec les jours de la semaine
let daysTab = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

// Affichage des jours dans la troisième carte
let day1 = document.querySelector(".day-1 p");
let day2 = document.querySelector(".day-2 p");
let day3 = document.querySelector(".day-3 p");
let day4 = document.querySelector(".day-4 p");
let day5 = document.querySelector(".day-5 p");
let day6 = document.querySelector(".day-6 p");

export function nextDays() {

    // Récupération du jour actuel
    let today = new Date().getDay();

    day1.innerHTML = daysTab[today + 1 > 6 ? today + 1 - 7 : today + 1] + " : ";
    day2.innerHTML = daysTab[today + 2 > 6 ? today + 2 - 7 : today + 2] + " : ";
    day3.innerHTML = daysTab[today + 3 > 6 ? today + 3 - 7 : today + 3] + " : ";
    day4.innerHTML = daysTab[today + 4 > 6 ? today + 4 - 7 : today + 4] + " : ";
    day5.innerHTML = daysTab[today + 5 > 6 ? today + 5 - 7 : today + 5] + " : ";
    day6.innerHTML = daysTab[today + 6 > 6 ? today + 6 - 7 : today + 6] + " : ";    
}