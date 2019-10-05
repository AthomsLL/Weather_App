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

// Récupération de la ville, de son code INSEE et des infos météo
function buttonClickGET() {
    let cityLocation = document.getElementById("cityLocation").value;
    let urlCityLocation = "https://api.meteo-concept.com/api/location/cities?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&search="+cityLocation+"";

    $.get(urlCityLocation, callBackGetCitySuccess).done(function() {
            //alert( "second success" );
        })
        .fail(function() {
            alert( "error" );
        })
        .always(function() {
            //alert( "finished" );
        });
    
    setTimeout(function getWeather() {
        let insee = document.getElementById("insee").textContent;

        let urlEphemeride = "https://api.meteo-concept.com/api/ephemeride/0?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&insee="+insee+"";
    
        $.get(urlEphemeride, callBackGetEphemerideSuccess).done(function() {
                //alert( "second success" );
            })
            .fail(function() {
                alert( "error" );
            })
            .always(function() {
                //alert( "finished" );
            });
        
        let urlWeatherTemp = "https://api.meteo-concept.com/api/forecast/nextHours?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&insee="+insee+"";
            
        $.get(urlWeatherTemp, callBackGetWeatherTempSuccess).done(function() {
                //alert( "second success" );
            })
            .fail(function() {
                alert( "error" );
            })
            .always(function() {
                //alert( "finished" );
            });
    }, 1000)
};

// Affichage de la ville récupérée
let callBackGetCitySuccess = function(data) {
    console.log("donnees api", data);

    let cityName = document.getElementById("city");
    cityName.innerHTML = data.cities[0].name;

    let inseeCode = document.getElementById("insee");
    inseeCode.innerHTML = data.cities[0].insee;
}

/************************************************/
/****AFFICHAGE DES INFOS DE LA PREMIERE CARTE****/
/************************************************/

// Affichage de l'éphéméride du jour
let callBackGetEphemerideSuccess = function(data) {
    console.log("donnees api ephemeride", data);

    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");
    sunrise.innerHTML = data.ephemeride.sunrise;
    sunset.innerHTML = data.ephemeride.sunset;
}

// Affichage des infos en temps réel (weather et temp)
let callBackGetWeatherTempSuccess = function(data) {
    console.log("donnees api weather et temp", data);
}

