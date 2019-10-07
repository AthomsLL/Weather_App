/**************/
/****IMPORT****/
/**************/
import {dateFR} from './date.js';
import {horloge} from './horloge.js';
import {weatherTab} from './weatherTab.js';

/**************************/
/***APPEL DES FONCTIONS****/
/**************************/
dateFR();
horloge();


// Récupération de la ville, de son code INSEE et des infos météo
let button = document.getElementById("button");
button.addEventListener("click", buttonClickGET, false);

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
    let inseeCode = document.getElementById("insee");

    cityName.innerHTML = data.cities[0].name;
    inseeCode.innerHTML = data.cities[0].insee;
}

/**************************************************************/
/****AFFICHAGE DES INFOS DE LA PREMIERE CARTE (DAILY-METEO)****/
/**************************************************************/

// Affichage de l'éphéméride du jour
let callBackGetEphemerideSuccess = function(data) {
    console.log("donnees api ephemeride", data);

    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");

    sunrise.innerHTML = data.ephemeride.sunrise;
    sunset.innerHTML = data.ephemeride.sunset;
}

// Affichage des infos en temps réel (weather, temp, humidité, pluie, vent)
let callBackGetWeatherTempSuccess = function(data) {
    console.log("donnees api weather et temp", data);

    let weatherIcon = document.getElementById("weather-icon");
    let weatherText = document.getElementById("weather-text");
    let temperature = document.getElementById("temperature");
    let humidity = document.getElementById("humidity");
    let rain = document.getElementById("rain");
    let wind = document.getElementById("wind");

    // Sélection de l'icone et affichage
    let weather = data.forecast[0].weather;
    if (weather === 0) {
        weatherIcon.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weather === 1) {
        weatherIcon.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weather >= 2 && weather <= 3) {
        weatherIcon.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weather >= 4 && weather <= 5) {
        weatherIcon.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weather >= 6 && weather <= 7) {
        weatherIcon.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weather >= 10 && weather <= 16) {
        weatherIcon.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weather >= 20 && weather <= 22) || (weather >= 60 && weather <= 68)) {
        weatherIcon.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weather >= 30 && weather <= 32) || (weather >= 70 && weather <= 78) || (weather >= 230 && weather <= 232)) {
        weatherIcon.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weather >= 40 && weather <= 48) {
        weatherIcon.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weather >= 100 && weather <= 108) {
        weatherIcon.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weather >= 120 && weather <= 128) || weather === 142) {
        weatherIcon.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weather >= 130 && weather <= 138) || weather === 141) {
        weatherIcon.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weather === 140) {
        weatherIcon.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weather >= 210 && weather <= 212) {
        weatherIcon.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weather >= 220 && weather <= 222) {
        weatherIcon.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weather === 235) {
        weatherIcon.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage de la température, de l'humidité, de la pluie et du vent
    temperature.innerHTML = data.forecast[0].temp2m + " °C";
    humidity.innerHTML = data.forecast[0].rh2m + "%";
    rain.innerHTML = data.forecast[0].probarain + "%";
    wind.innerHTML = data.forecast[0].wind10m + " km/h";
}

/******************************************************************/
/****AFFICHAGE DES INFOS DE LA SECONDE CARTE (NEXT-HOURS-METEO)****/
/******************************************************************/



/*******************************************************************/
/****AFFICHAGE DES INFOS DE LA TROISIEME CARTE (NEXT-DAYS-METEO)****/
/*******************************************************************/

