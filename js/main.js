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

// Récupération et affichage de la ville
const callBackGetSuccess = function(data) {
    console.log("donnees api", data);

    let cityName = document.getElementById("city");
    cityName.innerHTML = data.cities[0].name;
}

function buttonClickGET() {
    let cityLocation = document.getElementById("cityLocation").value;
    let urlCityLocation = "https://api.meteo-concept.com/api/location/cities?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&search="+cityLocation+"";

    $.get(urlCityLocation, callBackGetSuccess).done(function() {
            //alert( "second success" );
        })
        .fail(function() {
            alert( "error" );
        })
        .always(function() {
            //alert( "finished" );
        });
};
