// Récupération du jour actuel
let today = new Date().getDay();

// Création d'un tableau avec les jours de la semaine
let daysTab = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
];

// Affichage des jours dans la troisième carte
let day1 = document.querySelector(".day-1 p");
let day2 = document.querySelector(".day-2 p");
let day3 = document.querySelector(".day-3 p");
let day4 = document.querySelector(".day-4 p");
let day5 = document.querySelector(".day-5 p");
let day6 = document.querySelector(".day-6 p");

export function nextDays() {
    switch (today) {
        case 0:
            day1.innerHTML = daysTab[1] + " :";
            day2.innerHTML = daysTab[2] + " :";
            day3.innerHTML = daysTab[3] + " :";
            day4.innerHTML = daysTab[4] + " :";
            day5.innerHTML = daysTab[5] + " :";
            day6.innerHTML = daysTab[6] + " :";
            break;
        case 1:
            day1.innerHTML = daysTab[2] + " :";
            day2.innerHTML = daysTab[3] + " :";
            day3.innerHTML = daysTab[4] + " :";
            day4.innerHTML = daysTab[5] + " :";
            day5.innerHTML = daysTab[6] + " :";
            day6.innerHTML = daysTab[0] + " :";
            break;
        case 2:
            day1.innerHTML = daysTab[3] + " :";
            day2.innerHTML = daysTab[4] + " :";
            day3.innerHTML = daysTab[5] + " :";
            day4.innerHTML = daysTab[6] + " :";
            day5.innerHTML = daysTab[0] + " :";
            day6.innerHTML = daysTab[1] + " :";
            break;
        case 3:
            day1.innerHTML = daysTab[4] + " :";
            day2.innerHTML = daysTab[5] + " :";
            day3.innerHTML = daysTab[6] + " :";
            day4.innerHTML = daysTab[0] + " :";
            day5.innerHTML = daysTab[1] + " :";
            day6.innerHTML = daysTab[2] + " :";
            break;
        case 4:
            day1.innerHTML = daysTab[5] + " :";
            day2.innerHTML = daysTab[6] + " :";
            day3.innerHTML = daysTab[0] + " :";
            day4.innerHTML = daysTab[1] + " :";
            day5.innerHTML = daysTab[2] + " :";
            day6.innerHTML = daysTab[3] + " :";
            break;
        case 5:
            day1.innerHTML = daysTab[6] + " :";
            day2.innerHTML = daysTab[0] + " :";
            day3.innerHTML = daysTab[1] + " :";
            day4.innerHTML = daysTab[2] + " :";
            day5.innerHTML = daysTab[3] + " :";
            day6.innerHTML = daysTab[4] + " :";
            break;
        case 6:
            day1.innerHTML = daysTab[0] + " :";
            day2.innerHTML = daysTab[1] + " :";
            day3.innerHTML = daysTab[2] + " :";
            day4.innerHTML = daysTab[3] + " :";
            day5.innerHTML = daysTab[4] + " :";
            day6.innerHTML = daysTab[5] + " :";
            break;
        default :
            "ERREUR : JOUR NON VALIDE !";
    }
}