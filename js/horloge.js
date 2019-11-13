// Récupération et affichage de l'heure
export function horloge() {
    const temps = new Date().toLocaleTimeString();

    document.getElementById('horloge').innerHTML = temps;
    setTimeout(horloge, 1000);
};