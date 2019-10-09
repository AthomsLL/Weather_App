// Récupération et affichage de la date
export function dateFR() {
    const jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    const mois = new Array("Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jui", "Aou", "Sep", "Oct", "Nov", "Dec");

    let date = new Date();

    let message = jours[date.getDay()] + " "; // Nom du jour
    message += date.getDate() + " "; // Numéro du jour
    message += mois[date.getMonth()] + " "; // Mois
    message += date.getFullYear();

    document.getElementById('date').innerHTML = message;
};

// Récupération du jour actuel
export let today = new Date().getDay();

// Création d'un tableau avec les jours de la semaine
export let daysTab = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
];