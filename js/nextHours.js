// Création d'un tableau avec les heures de la journée
let hoursTab = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

// Affichage des heures dans la seconde carte 
const hour1 = document.querySelector(".hour-1 p");
const hour2 = document.querySelector(".hour-2 p");
const hour3 = document.querySelector(".hour-3 p");
const hour4 = document.querySelector(".hour-4 p");

export function nextHours() {

    // Récupération de l'heure actuelle
    let hour = new Date().getHours();

    hour1.innerHTML = hoursTab[hour + 1 > 23 ? hour + 1 - 24 : hour + 1] + "h :";
    hour2.innerHTML = hoursTab[hour + 4 > 23 ? hour + 4 - 24 : hour + 4] + "h :";
    hour3.innerHTML = hoursTab[hour + 7 > 23 ? hour + 7 - 24 : hour + 7] + "h :";
    hour4.innerHTML = hoursTab[hour + 10 > 23 ? hour + 10 - 24 : hour + 10] + "h :";
}