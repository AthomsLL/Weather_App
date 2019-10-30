/**************/
/****IMPORT****/
/**************/
import {dateFR} from './date.js';
import {horloge} from './horloge.js';
import {weatherTabText} from './weatherTabText.js';
import {nextHours} from './nextHours.js';
import {nextDays} from './nextDays.js';

/***************************************************/
/***APPEL DES FONCTIONS DE LA DATE ET DE L'HEURE****/
/***************************************************/
dateFR();
horloge();

// Récupération de la ville, de son code INSEE et des infos météo
let button = document.getElementById("button");
button.addEventListener("click", buttonClickGET, false);

function buttonClickGET() {
    let cityLocation = document.getElementById("cityLocation").value;
    let urlCityLocation = "https://api.meteo-concept.com/api/location/cities?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&search="+cityLocation+"";

    // Récupération de la ville
    fetch(urlCityLocation)
        .then(response => response.json())
        .then(callBackGetCitySuccess);
    
    
    setTimeout(function getWeather() {
        let insee = document.getElementById("insee").textContent;

        let urlEphemeride = "https://api.meteo-concept.com/api/ephemeride/0?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&insee="+insee+"";
    
        // Récupération de l'éphéméride du jour
        fetch(urlEphemeride)
            .then(response => response.json())
            .then(callBackGetEphemerideSuccess);
        
        let urlWeatherTemp = "https://api.meteo-concept.com/api/forecast/nextHours?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&insee="+insee+"";
        
        // Récupération des infos en temps réel du jour, et des prochaines heures
        fetch(urlWeatherTemp)
            .then(response => response.json())
            .then(callBackGetWeatherTempSuccess);
        
        let urlWeatherNextDays = "https://api.meteo-concept.com/api/forecast/daily?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&insee="+insee+"";

        // Récupération des infos des prochains jours
        fetch(urlWeatherNextDays)
            .then(response => response.json())
            .then(callBackGetWeatherNextDays);

        // Affichage des 3 cartes avec animation
        let cardsAnimated = document.getElementById("cards");
        cardsAnimated.classList.add("cards-animated");

        setTimeout(function() {
            cardsAnimated.style.opacity = 1;
        }, 1500)

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

/*****************************************************************************/
/****AFFICHAGE DES INFOS DES TROIS CARTES (DAILY, NEXT-HOURS ET NEXT-DAYS)****/
/*****************************************************************************/

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
    let weather = data.forecast[0].weather;

    // Sélection de l'icone et affichage
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

    // Affichage du texte en dessous de weatherIcon
    switch (weather) {
        case 0:
            weatherText.innerHTML = weatherTabText[0];
            break;
        case 1:
            weatherText.innerHTML = weatherTabText[1];
            break;
        case 2:
            weatherText.innerHTML = weatherTabText[2];
            break;
        case 3:
            weatherText.innerHTML = weatherTabText[3];
            break;
        case 4:
            weatherText.innerHTML = weatherTabText[4];
            break;
        case 5:
            weatherText.innerHTML = weatherTabText[5];
            break;
        case 6:
            weatherText.innerHTML = weatherTabText[6];
            break;
        case 7:
            weatherText.innerHTML = weatherTabText[7];
            break;
        case 10:
            weatherText.innerHTML = weatherTabText[8];
            break;
        case 11:
            weatherText.innerHTML = weatherTabText[9];
            break;
        case 12:
            weatherText.innerHTML = weatherTabText[10];
            break;
        case 13:
            weatherText.innerHTML = weatherTabText[11];
            break;
        case 14:
            weatherText.innerHTML = weatherTabText[12];
            break;
        case 15:
            weatherText.innerHTML = weatherTabText[13];
            break;
        case 16:
            weatherText.innerHTML = weatherTabText[14];
            break;
        case 20:
            weatherText.innerHTML = weatherTabText[15];
            break;
        case 21:
            weatherText.innerHTML = weatherTabText[16];
            break;
        case 22:
            weatherText.innerHTML = weatherTabText[17];
            break;
        case 30:
            weatherText.innerHTML = weatherTabText[18];
            break;
        case 31:
            weatherText.innerHTML = weatherTabText[19];
            break;
        case 32:
            weatherText.innerHTML = weatherTabText[20];
            break;
        case 40:
            weatherText.innerHTML = weatherTabText[21];
            break;
        case 41:
            weatherText.innerHTML = weatherTabText[22];
            break;
        case 42:
            weatherText.innerHTML = weatherTabText[23];
            break;
        case 43:
            weatherText.innerHTML = weatherTabText[24];
            break;
        case 44:
            weatherText.innerHTML = weatherTabText[25];
            break;
        case 45:
            weatherText.innerHTML = weatherTabText[26];
            break;
        case 46:
            weatherText.innerHTML = weatherTabText[27];
            break;
        case 47:
            weatherText.innerHTML = weatherTabText[28];
            break;
        case 48:
            weatherText.innerHTML = weatherTabText[29];
            break;
        case 60:
            weatherText.innerHTML = weatherTabText[30];
            break;
        case 61:
            weatherText.innerHTML = weatherTabText[31];
            break;
        case 62:
            weatherText.innerHTML = weatherTabText[32];
            break;
        case 63:
            weatherText.innerHTML = weatherTabText[33];
            break;
        case 64:
            weatherText.innerHTML = weatherTabText[34];
            break;
        case 65:
            weatherText.innerHTML = weatherTabText[35];
            break;
        case 66:
            weatherText.innerHTML = weatherTabText[36];
            break;
        case 67:
            weatherText.innerHTML = weatherTabText[37];
            break;
        case 68:
            weatherText.innerHTML = weatherTabText[38];
            break;
        case 70:
            weatherText.innerHTML = weatherTabText[39];
            break;
        case 71:
            weatherText.innerHTML = weatherTabText[40];
            break;
        case 72:
            weatherText.innerHTML = weatherTabText[41];
            break;
        case 73:
            weatherText.innerHTML = weatherTabText[42];
            break;
        case 74:
            weatherText.innerHTML = weatherTabText[43];
            break;
        case 75:
            weatherText.innerHTML = weatherTabText[44];
            break;
        case 76:
            weatherText.innerHTML = weatherTabText[45];
            break;
        case 77:
            weatherText.innerHTML = weatherTabText[46];
            break;
        case 78:
            weatherText.innerHTML = weatherTabText[47];
            break;
        case 100:
            weatherText.innerHTML = weatherTabText[48];
            break;
        case 101:
            weatherText.innerHTML = weatherTabText[49];
            break;
        case 102:
            weatherText.innerHTML = weatherTabText[50];
            break;
        case 103:
            weatherText.innerHTML = weatherTabText[51];
            break;
        case 104:
            weatherText.innerHTML = weatherTabText[52];
            break;
        case 105:
            weatherText.innerHTML = weatherTabText[53];
            break;
        case 106:
            weatherText.innerHTML = weatherTabText[54];
            break;
        case 107:
            weatherText.innerHTML = weatherTabText[55];
            break;
        case 108:
            weatherText.innerHTML = weatherTabText[56];
            break;
        case 120:
            weatherText.innerHTML = weatherTabText[57];
            break;
        case 121:
            weatherText.innerHTML = weatherTabText[58];
            break;
        case 122:
            weatherText.innerHTML = weatherTabText[59];
            break;
        case 123:
            weatherText.innerHTML = weatherTabText[60];
            break;
        case 124:
            weatherText.innerHTML = weatherTabText[61];
            break;
        case 125:
            weatherText.innerHTML = weatherTabText[62];
            break;
        case 126:
            weatherText.innerHTML = weatherTabText[63];
            break;
        case 127:
            weatherText.innerHTML = weatherTabText[64];
            break;
        case 128:
            weatherText.innerHTML = weatherTabText[65];
            break;
        case 130:
            weatherText.innerHTML = weatherTabText[66];
            break;
        case 131:
            weatherText.innerHTML = weatherTabText[67];
            break;
        case 132:
            weatherText.innerHTML = weatherTabText[68];
            break;
        case 133:
            weatherText.innerHTML = weatherTabText[69];
            break;
        case 134:
            weatherText.innerHTML = weatherTabText[70];
            break;
        case 135:
            weatherText.innerHTML = weatherTabText[71];
            break;
        case 136:
            weatherText.innerHTML = weatherTabText[72];
            break;
        case 137:
            weatherText.innerHTML = weatherTabText[73];
            break;
        case 138:
            weatherText.innerHTML = weatherTabText[74];
            break;
        case 140:
            weatherText.innerHTML = weatherTabText[75];
            break;
        case 141:
            weatherText.innerHTML = weatherTabText[76];
            break;
        case 142:
            weatherText.innerHTML = weatherTabText[77];
            break;
        case 210:
            weatherText.innerHTML = weatherTabText[78];
            break;
        case 211:
            weatherText.innerHTML = weatherTabText[79];
            break;
        case 212:
            weatherText.innerHTML = weatherTabText[80];
            break;
        case 220:
            weatherText.innerHTML = weatherTabText[81];
            break;
        case 221:
            weatherText.innerHTML = weatherTabText[82];
            break;
        case 222:
            weatherText.innerHTML = weatherTabText[83];
            break;
        case 230:
            weatherText.innerHTML = weatherTabText[84];
            break;
        case 231:
            weatherText.innerHTML = weatherTabText[85];
            break;
        case 232:
            weatherText.innerHTML = weatherTabText[86];
            break;
        case 235:
            weatherText.innerHTML = weatherTabText[87];
        default:
            "ERREUR : CODE METEO INCONNU !";
    }

    // Affichage de la température, de l'humidité, de la pluie et du vent
    let temperature = document.getElementById("temperature");
    let humidity = document.getElementById("humidity");
    let rain = document.getElementById("rain");
    let wind = document.getElementById("wind");

    temperature.innerHTML = data.forecast[0].temp2m + " °C";
    humidity.innerHTML = data.forecast[0].rh2m + "%";
    rain.innerHTML = data.forecast[0].probarain + "%";
    wind.innerHTML = data.forecast[0].wind10m + " km/h";

    // Affichage des infos dans la deuxième carte
    nextHours();

    // Affichage des icones météo des prochaines heures
    let weatherNextHour1 = data.forecast[0].weather;
    let weatherNextHour2 = data.forecast[1].weather;
    let weatherNextHour3 = data.forecast[2].weather;
    let weatherNextHour4 = data.forecast[3].weather;

    let weatherNextHourIcon1 = document.getElementById("weather-icon-hour1");
    let weatherNextHourIcon2 = document.getElementById("weather-icon-hour2");
    let weatherNextHourIcon3 = document.getElementById("weather-icon-hour3");
    let weatherNextHourIcon4 = document.getElementById("weather-icon-hour4");

    // Affichage icone Prochaine Heure 1
    if (weatherNextHour1 === 0) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextHour1 === 1) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextHour1 >= 2 && weatherNextHour1 <= 3) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextHour1 >= 4 && weatherNextHour1 <= 5) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextHour1 >= 6 && weatherNextHour1 <= 7) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextHour1 >= 10 && weatherNextHour1 <= 16) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextHour1 >= 20 && weatherNextHour1 <= 22) || (weatherNextHour1 >= 60 && weatherNextHour1 <= 68)) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextHour1 >= 30 && weatherNextHour1 <= 32) || (weatherNextHour1 >= 70 && weatherNextHour1 <= 78) || (weatherNextHour1 >= 230 && weatherNextHour1 <= 232)) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextHour1 >= 40 && weatherNextHour1 <= 48) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextHour1 >= 100 && weatherNextHour1 <= 108) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextHour1 >= 120 && weatherNextHour1 <= 128) || weatherNextHour1 === 142) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextHour1 >= 130 && weatherNextHour1 <= 138) || weatherNextHour1 === 141) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextHour1 === 140) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextHour1 >= 210 && weatherNextHour1 <= 212) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextHour1 >= 220 && weatherNextHour1 <= 222) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextHour1 === 235) {
        weatherNextHourIcon1.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochaine Heure 2
    if (weatherNextHour2 === 0) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextHour2 === 1) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextHour2 >= 2 && weatherNextHour2 <= 3) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextHour2 >= 4 && weatherNextHour2 <= 5) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextHour2 >= 6 && weatherNextHour2 <= 7) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextHour2 >= 10 && weatherNextHour2 <= 16) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextHour2 >= 20 && weatherNextHour2 <= 22) || (weatherNextHour2 >= 60 && weatherNextHour2 <= 68)) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextHour2 >= 30 && weatherNextHour2 <= 32) || (weatherNextHour2 >= 70 && weatherNextHour2 <= 78) || (weatherNextHour2 >= 230 && weatherNextHour2 <= 232)) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextHour2 >= 40 && weatherNextHour2 <= 48) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextHour2 >= 100 && weatherNextHour2 <= 108) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextHour2 >= 120 && weatherNextHour2 <= 128) || weatherNextHour2 === 142) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextHour2 >= 130 && weatherNextHour2 <= 138) || weatherNextHour2 === 141) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextHour2 === 140) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextHour2 >= 210 && weatherNextHour2 <= 212) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextHour2 >= 220 && weatherNextHour2 <= 222) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextHour2 === 235) {
        weatherNextHourIcon2.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochaine Heure 3
    if (weatherNextHour3 === 0) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextHour3 === 1) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextHour3 >= 2 && weatherNextHour3 <= 3) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextHour3 >= 4 && weatherNextHour3 <= 5) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextHour3 >= 6 && weatherNextHour3 <= 7) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextHour3 >= 10 && weatherNextHour3 <= 16) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextHour3 >= 20 && weatherNextHour3 <= 22) || (weatherNextHour3 >= 60 && weatherNextHour3 <= 68)) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextHour3 >= 30 && weatherNextHour3 <= 32) || (weatherNextHour3 >= 70 && weatherNextHour3 <= 78) || (weatherNextHour3 >= 230 && weatherNextHour3 <= 232)) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextHour3 >= 40 && weatherNextHour3 <= 48) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextHour3 >= 100 && weatherNextHour3 <= 108) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextHour3 >= 120 && weatherNextHour3 <= 128) || weatherNextHour3 === 142) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextHour3 >= 130 && weatherNextHour3 <= 138) || weatherNextHour3 === 141) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextHour3 === 140) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextHour3 >= 210 && weatherNextHour3 <= 212) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextHour3 >= 220 && weatherNextHour3 <= 222) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextHour3 === 235) {
        weatherNextHourIcon3.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochaine Heure 4
    if (weatherNextHour4 === 0) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextHour4 === 1) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextHour4 >= 2 && weatherNextHour4 <= 3) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextHour4 >= 4 && weatherNextHour4 <= 5) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextHour4 >= 6 && weatherNextHour4 <= 7) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextHour4 >= 10 && weatherNextHour4 <= 16) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextHour4 >= 20 && weatherNextHour4 <= 22) || (weatherNextHour4 >= 60 && weatherNextHour4 <= 68)) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextHour4 >= 30 && weatherNextHour4 <= 32) || (weatherNextHour4 >= 70 && weatherNextHour4 <= 78) || (weatherNextHour4 >= 230 && weatherNextHour4 <= 232)) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextHour4 >= 40 && weatherNextHour4 <= 48) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextHour4 >= 100 && weatherNextHour4 <= 108) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextHour4 >= 120 && weatherNextHour4 <= 128) || weatherNextHour4 === 142) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextHour4 >= 130 && weatherNextHour4 <= 138) || weatherNextHour4 === 141) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextHour4 === 140) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextHour4 >= 210 && weatherNextHour4 <= 212) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextHour4 >= 220 && weatherNextHour4 <= 222) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextHour4 === 235) {
        weatherNextHourIcon4.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage des températures des prochaines heures
    let tempHour1 = document.getElementById("temp-hour1");
    let tempHour2 = document.getElementById("temp-hour2");
    let tempHour3 = document.getElementById("temp-hour3");
    let tempHour4 = document.getElementById("temp-hour4");

    tempHour1.innerHTML = data.forecast[0].temp2m + " °C";
    tempHour2.innerHTML = data.forecast[1].temp2m + " °C";
    tempHour3.innerHTML = data.forecast[2].temp2m + " °C";
    tempHour4.innerHTML = data.forecast[3].temp2m + " °C";
}

let callBackGetWeatherNextDays = function(data) {
    console.log("donnees api next days", data);

    // Affichage des infos dans la troisième carte
    nextDays();

    // Affichage des icones météo des prochains jours
    let weatherNextDay1 = data.forecast[1].weather;
    let weatherNextDay2 = data.forecast[2].weather;
    let weatherNextDay3 = data.forecast[3].weather;
    let weatherNextDay4 = data.forecast[4].weather;
    let weatherNextDay5 = data.forecast[5].weather;
    let weatherNextDay6 = data.forecast[6].weather;

    let weatherNextDayIcon1 = document.getElementById("weather-icon-day1");
    let weatherNextDayIcon2 = document.getElementById("weather-icon-day2");
    let weatherNextDayIcon3 = document.getElementById("weather-icon-day3");
    let weatherNextDayIcon4 = document.getElementById("weather-icon-day4");
    let weatherNextDayIcon5 = document.getElementById("weather-icon-day5");
    let weatherNextDayIcon6 = document.getElementById("weather-icon-day6");

    // Affichage icone Prochain Jour 1
    if (weatherNextDay1 === 0) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextDay1 === 1) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextDay1 >= 2 && weatherNextDay1 <= 3) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextDay1 >= 4 && weatherNextDay1 <= 5) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextDay1 >= 6 && weatherNextDay1 <= 7) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextDay1 >= 10 && weatherNextDay1 <= 16) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextDay1 >= 20 && weatherNextDay1 <= 22) || (weatherNextDay1 >= 60 && weatherNextDay1 <= 68)) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextDay1 >= 30 && weatherNextDay1 <= 32) || (weatherNextDay1 >= 70 && weatherNextDay1 <= 78) || (weatherNextDay1 >= 230 && weatherNextDay1 <= 232)) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextDay1 >= 40 && weatherNextDay1 <= 48) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextDay1 >= 100 && weatherNextDay1 <= 108) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextDay1 >= 120 && weatherNextDay1 <= 128) || weatherNextDay1 === 142) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextDay1 >= 130 && weatherNextDay1 <= 138) || weatherNextDay1 === 141) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextDay1 === 140) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextDay1 >= 210 && weatherNextDay1 <= 212) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextDay1 >= 220 && weatherNextDay1 <= 222) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextDay1 === 235) {
        weatherNextDayIcon1.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochain Jour 2
    if (weatherNextDay2 === 0) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextDay2 === 1) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextDay2 >= 2 && weatherNextDay2 <= 3) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextDay2 >= 4 && weatherNextDay2 <= 5) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextDay2 >= 6 && weatherNextDay2 <= 7) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextDay2 >= 10 && weatherNextDay2 <= 16) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextDay2 >= 20 && weatherNextDay2 <= 22) || (weatherNextDay2 >= 60 && weatherNextDay2 <= 68)) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextDay2 >= 30 && weatherNextDay2 <= 32) || (weatherNextDay2 >= 70 && weatherNextDay2 <= 78) || (weatherNextDay2 >= 230 && weatherNextDay2 <= 232)) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextDay2 >= 40 && weatherNextDay2 <= 48) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextDay2 >= 100 && weatherNextDay2 <= 108) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextDay2 >= 120 && weatherNextDay2 <= 128) || weatherNextDay2 === 142) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextDay2 >= 130 && weatherNextDay2 <= 138) || weatherNextDay2 === 141) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextDay2 === 140) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextDay2 >= 210 && weatherNextDay2 <= 212) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextDay2 >= 220 && weatherNextDay2 <= 222) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextDay2 === 235) {
        weatherNextDayIcon2.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochain Jour 3
    if (weatherNextDay3 === 0) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextDay3 === 1) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextDay3 >= 2 && weatherNextDay3 <= 3) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextDay3 >= 4 && weatherNextDay3 <= 5) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextDay3 >= 6 && weatherNextDay3 <= 7) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextDay3 >= 10 && weatherNextDay3 <= 16) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextDay3 >= 20 && weatherNextDay3 <= 22) || (weatherNextDay3 >= 60 && weatherNextDay3 <= 68)) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextDay3 >= 30 && weatherNextDay3 <= 32) || (weatherNextDay3 >= 70 && weatherNextDay3 <= 78) || (weatherNextDay3 >= 230 && weatherNextDay3 <= 232)) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextDay3 >= 40 && weatherNextDay3 <= 48) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextDay3 >= 100 && weatherNextDay3 <= 108) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextDay3 >= 120 && weatherNextDay3 <= 128) || weatherNextDay3 === 142) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextDay3 >= 130 && weatherNextDay3 <= 138) || weatherNextDay3 === 141) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextDay3 === 140) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextDay3 >= 210 && weatherNextDay3 <= 212) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextDay3 >= 220 && weatherNextDay3 <= 222) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextDay3 === 235) {
        weatherNextDayIcon3.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochain Jour 4
    if (weatherNextDay4 === 0) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextDay4 === 1) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextDay4 >= 2 && weatherNextDay4 <= 3) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextDay4 >= 4 && weatherNextDay4 <= 5) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextDay4 >= 6 && weatherNextDay4 <= 7) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextDay4 >= 10 && weatherNextDay4 <= 16) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextDay4 >= 20 && weatherNextDay4 <= 22) || (weatherNextDay4 >= 60 && weatherNextDay4 <= 68)) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextDay4 >= 30 && weatherNextDay4 <= 32) || (weatherNextDay4 >= 70 && weatherNextDay4 <= 78) || (weatherNextDay4 >= 230 && weatherNextDay4 <= 232)) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextDay4 >= 40 && weatherNextDay4 <= 48) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextDay4 >= 100 && weatherNextDay4 <= 108) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextDay4 >= 120 && weatherNextDay4 <= 128) || weatherNextDay4 === 142) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextDay4 >= 130 && weatherNextDay4 <= 138) || weatherNextDay4 === 141) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextDay4 === 140) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextDay4 >= 210 && weatherNextDay4 <= 212) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextDay4 >= 220 && weatherNextDay4 <= 222) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextDay4 === 235) {
        weatherNextDayIcon4.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochain Jour 5
    if (weatherNextDay5 === 0) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextDay5 === 1) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextDay5 >= 2 && weatherNextDay5 <= 3) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextDay5 >= 4 && weatherNextDay5 <= 5) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextDay5 >= 6 && weatherNextDay5 <= 7) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextDay5 >= 10 && weatherNextDay5 <= 16) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextDay5 >= 20 && weatherNextDay5 <= 22) || (weatherNextDay5 >= 60 && weatherNextDay5 <= 68)) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextDay5 >= 30 && weatherNextDay5 <= 32) || (weatherNextDay5 >= 70 && weatherNextDay5 <= 78) || (weatherNextDay5 >= 230 && weatherNextDay5 <= 232)) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextDay5 >= 40 && weatherNextDay5 <= 48) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextDay5 >= 100 && weatherNextDay5 <= 108) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextDay5 >= 120 && weatherNextDay5 <= 128) || weatherNextDay5 === 142) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextDay5 >= 130 && weatherNextDay5 <= 138) || weatherNextDay5 === 141) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextDay5 === 140) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextDay5 >= 210 && weatherNextDay5 <= 212) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextDay5 >= 220 && weatherNextDay5 <= 222) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextDay5 === 235) {
        weatherNextDayIcon5.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage icone Prochain Jour 6
    if (weatherNextDay6 === 0) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-day-sunny'></i>";
    }
    else if (weatherNextDay6 === 1) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    }
    else if (weatherNextDay6 >= 2 && weatherNextDay6 <= 3) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-cloud'></i>";
    }
    else if (weatherNextDay6 >= 4 && weatherNextDay6 <= 5) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-cloudy'></i>";
    }
    else if (weatherNextDay6 >= 6 && weatherNextDay6 <= 7) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-fog'></i>";
    }
    else if (weatherNextDay6 >= 10 && weatherNextDay6 <= 16) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-rain'></i>";
    }
    else if ((weatherNextDay6 >= 20 && weatherNextDay6 <= 22) || (weatherNextDay6 >= 60 && weatherNextDay6 <= 68)) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-snow'></i>"
    }
    else if ((weatherNextDay6 >= 30 && weatherNextDay6 <= 32) || (weatherNextDay6 >= 70 && weatherNextDay6 <= 78) || (weatherNextDay6 >= 230 && weatherNextDay6 <= 232)) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-rain-mix'></i>";
    }
    else if (weatherNextDay6 >= 40 && weatherNextDay6 <= 48) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-showers'></i>";
    }
    else if  (weatherNextDay6 >= 100 && weatherNextDay6 <= 108) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    }
    else if ((weatherNextDay6 >= 120 && weatherNextDay6 <= 128) || weatherNextDay6 === 142) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    }
    else if ((weatherNextDay6 >= 130 && weatherNextDay6 <= 138) || weatherNextDay6 === 141) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    }
    else if (weatherNextDay6 === 140) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-storm-showers'></i>";
    }
    else if (weatherNextDay6 >= 210 && weatherNextDay6 <= 212) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    }
    else if (weatherNextDay6 >= 220 && weatherNextDay6 <= 222) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    }
    else if (weatherNextDay6 === 235) {
        weatherNextDayIcon6.innerHTML = "<i class='wi wi-hail'></i>";
    }

    // Affichage des températures des prochains jours
    let tempDay1 = document.getElementById("temp-day1");
    let tempDay2 = document.getElementById("temp-day2");
    let tempDay3 = document.getElementById("temp-day3");
    let tempDay4 = document.getElementById("temp-day4");
    let tempDay5 = document.getElementById("temp-day5");
    let tempDay6 = document.getElementById("temp-day6");

    tempDay1.innerHTML = data.forecast[1].tmin + " °C" + " | " + data.forecast[1].tmax + " °C";
    tempDay2.innerHTML = data.forecast[2].tmin + " °C" + " | " + data.forecast[2].tmax + " °C";
    tempDay3.innerHTML = data.forecast[3].tmin + " °C" + " | " + data.forecast[3].tmax + " °C";
    tempDay4.innerHTML = data.forecast[4].tmin + " °C" + " | " + data.forecast[4].tmax + " °C";
    tempDay5.innerHTML = data.forecast[5].tmin + " °C" + " | " + data.forecast[5].tmax + " °C";
    tempDay6.innerHTML = data.forecast[6].tmin + " °C" + " | " + data.forecast[6].tmax + " °C";
};
