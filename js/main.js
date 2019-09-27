// Appel des fonctions
dateFR();
horloge();

// Récupération et affichage de la date
function dateFR() {
    const jours = new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    const mois = new Array("Jan", "Fev", "Mar", "Avr", "Mai", "Jun", "Jui", "Aou", "Sep", "Oct", "Nov", "Dec");

    let date = new Date();

    let message = jours[date.getDay()] + " "; // Nom du jour
    message += date.getDate() + " "; // Numéro du jour
    message += mois[date.getMonth()] + " "; // Mois
    message += date.getFullYear();

    document.getElementById('date').innerHTML = message;
};

// Récupération et affichage de l'heure
function horloge() {
    let temps = new Date().toLocaleTimeString();

    document.getElementById('horloge').innerHTML = temps;
    setTimeout(horloge, 1000);
};
