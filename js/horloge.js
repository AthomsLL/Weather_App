// Récupération et affichage de l'heure
export function horloge() {
    let temps = new Date().toLocaleTimeString();

    document.getElementById('horloge').innerHTML = temps;
    setTimeout(horloge, 1000);
};