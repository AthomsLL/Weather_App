// Récupération de l'heure actuelle
let hour = new Date().getHours();

// Création d'un tableau avec les heures de la journée
let hoursTab = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

// Affichage des heures dans la seconde carte 
let hour1 = document.querySelector(".hour-1 p");
let hour2 = document.querySelector(".hour-2 p");
let hour3 = document.querySelector(".hour-3 p");
let hour4 = document.querySelector(".hour-4 p");

export function nextHours() {
    switch (hour) {
        case 0:
            hour1.innerHTML = hoursTab[2] + "h :";
            hour2.innerHTML = hoursTab[5] + "h :";
            hour3.innerHTML = hoursTab[8] + "h :";
            hour4.innerHTML = hoursTab[11] + "h :";
            break;
        case 1:
            hour1.innerHTML = hoursTab[3] + "h :";
            hour2.innerHTML = hoursTab[6] + "h :";
            hour3.innerHTML = hoursTab[9] + "h :";
            hour4.innerHTML = hoursTab[12] + "h :";
            break;
        case 2:
            hour1.innerHTML = hoursTab[4] + "h :";
            hour2.innerHTML = hoursTab[7] + "h :";
            hour3.innerHTML = hoursTab[10] + "h :";
            hour4.innerHTML = hoursTab[13] + "h :";
            break;
        case 3:
            hour1.innerHTML = hoursTab[5] + "h :";
            hour2.innerHTML = hoursTab[8] + "h :";
            hour3.innerHTML = hoursTab[11] + "h :";
            hour4.innerHTML = hoursTab[14] + "h :";
            break;
        case 4:
            hour1.innerHTML = hoursTab[6] + "h :";
            hour2.innerHTML = hoursTab[9] + "h :";
            hour3.innerHTML = hoursTab[12] + "h :";
            hour4.innerHTML = hoursTab[15] + "h :";
            break;
        case 5:
            hour1.innerHTML = hoursTab[7] + "h :";
            hour2.innerHTML = hoursTab[10] + "h :";
            hour3.innerHTML = hoursTab[13] + "h :";
            hour4.innerHTML = hoursTab[16] + "h :";
            break;
        case 6:
            hour1.innerHTML = hoursTab[8] + "h :";
            hour2.innerHTML = hoursTab[11] + "h :";
            hour3.innerHTML = hoursTab[14] + "h :";
            hour4.innerHTML = hoursTab[17] + "h :";
            break;
        case 7:
            hour1.innerHTML = hoursTab[9] + "h :";
            hour2.innerHTML = hoursTab[12] + "h :";
            hour3.innerHTML = hoursTab[15] + "h :";
            hour4.innerHTML = hoursTab[18] + "h :";
            break;
        case 8:
            hour1.innerHTML = hoursTab[10] + "h :";
            hour2.innerHTML = hoursTab[13] + "h :";
            hour3.innerHTML = hoursTab[16] + "h :";
            hour4.innerHTML = hoursTab[19] + "h :";
            break;
        case 9:
            hour1.innerHTML = hoursTab[11] + "h :";
            hour2.innerHTML = hoursTab[14] + "h :";
            hour3.innerHTML = hoursTab[17] + "h :";
            hour4.innerHTML = hoursTab[20] + "h :";
            break;
        case 10:
            hour1.innerHTML = hoursTab[12] + "h :";
            hour2.innerHTML = hoursTab[15] + "h :";
            hour3.innerHTML = hoursTab[18] + "h :";
            hour4.innerHTML = hoursTab[21] + "h :";
            break;
        case 11:
            hour1.innerHTML = hoursTab[13] + "h :";
            hour2.innerHTML = hoursTab[16] + "h :";
            hour3.innerHTML = hoursTab[19] + "h :";
            hour4.innerHTML = hoursTab[22] + "h :";
            break;
        case 12:
            hour1.innerHTML = hoursTab[14] + "h :";
            hour2.innerHTML = hoursTab[17] + "h :";
            hour3.innerHTML = hoursTab[20] + "h :";
            hour4.innerHTML = hoursTab[23] + "h :";
            break;
        case 13:
            hour1.innerHTML = hoursTab[15] + "h :";
            hour2.innerHTML = hoursTab[18] + "h :";
            hour3.innerHTML = hoursTab[21] + "h :";
            hour4.innerHTML = hoursTab[0] + "h :";
            break;
        case 14:
            hour1.innerHTML = hoursTab[16] + "h :";
            hour2.innerHTML = hoursTab[19] + "h :";
            hour3.innerHTML = hoursTab[22] + "h :";
            hour4.innerHTML = hoursTab[1] + "h :";
            break;
        case 15:
            hour1.innerHTML = hoursTab[17] + "h :";
            hour2.innerHTML = hoursTab[20] + "h :";
            hour3.innerHTML = hoursTab[23] + "h :";
            hour4.innerHTML = hoursTab[2] + "h :";
            break;
        case 16:
            hour1.innerHTML = hoursTab[18] + "h :";
            hour2.innerHTML = hoursTab[21] + "h :";
            hour3.innerHTML = hoursTab[0] + "h :";
            hour4.innerHTML = hoursTab[3] + "h :";
            break;
        case 17:
            hour1.innerHTML = hoursTab[19] + "h :";
            hour2.innerHTML = hoursTab[22] + "h :";
            hour3.innerHTML = hoursTab[1] + "h :";
            hour4.innerHTML = hoursTab[4] + "h :";
            break;
        case 18:
            hour1.innerHTML = hoursTab[20] + "h :";
            hour2.innerHTML = hoursTab[23] + "h :";
            hour3.innerHTML = hoursTab[2] + "h :";
            hour4.innerHTML = hoursTab[5] + "h :";
            break;
        case 19:
            hour1.innerHTML = hoursTab[21] + "h :";
            hour2.innerHTML = hoursTab[0] + "h :";
            hour3.innerHTML = hoursTab[3] + "h :";
            hour4.innerHTML = hoursTab[6] + "h :";
            break;
        case 20:
            hour1.innerHTML = hoursTab[22] + "h :";
            hour2.innerHTML = hoursTab[1] + "h :";
            hour3.innerHTML = hoursTab[4] + "h :";
            hour4.innerHTML = hoursTab[7] + "h :";
            break;
        case 21:
            hour1.innerHTML = hoursTab[23] + "h :";
            hour2.innerHTML = hoursTab[2] + "h :";
            hour3.innerHTML = hoursTab[5] + "h :";
            hour4.innerHTML = hoursTab[8] + "h :";
            break;
        case 22:
            hour1.innerHTML = hoursTab[0] + "h :";
            hour2.innerHTML = hoursTab[3] + "h :";
            hour3.innerHTML = hoursTab[6] + "h :";
            hour4.innerHTML = hoursTab[9] + "h :";
            break;
        case 23:
            hour1.innerHTML = hoursTab[1] + "h :";
            hour2.innerHTML = hoursTab[4] + "h :";
            hour3.innerHTML = hoursTab[7] + "h :";
            hour4.innerHTML = hoursTab[10] + "h :";
            break;
        default :
            "ERREUR : HEURE NON VALIDE !";
    }
}