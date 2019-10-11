/**************/
/****IMPORT****/
/**************/
import {dateFR} from './date.js';
import {horloge} from './horloge.js';
import {weatherTabText} from './weatherTabText.js';
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
        
        let urlWeatherNextDays = "https://api.meteo-concept.com/api/forecast/daily?token=7a3ff296cc4f8f85d1fff02508d8202c4749a6c31016921290bb0c5bacf07027&insee="+insee+"";

        $.get(urlWeatherNextDays, callBackGetWeatherNextDays).done(function() {
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
}

// Affichage des infos dans la troisième carte
nextDays();

let callBackGetWeatherNextDays = function(data) {
    console.log("donnees api next days", data);

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

    // Affichage des icones météo des prochains jours
    let weatherNextDay1 = data.forecast[1].weather;
    let weatherNextDay2 = data.forecast[2].weather;
    let weatherNextDay3 = data.forecast[3].weather;
    let weatherNextDay4 = data.forecast[4].weather;
    let weatherNextDay5 = data.forecast[5].weather;
    let weatherNextDay6 = data.forecast[6].weather;

    // if (weather === 0) {
    //     weatherIcon.innerHTML = "<i class='wi wi-day-sunny'></i>";
    // }
    // else if (weather === 1) {
    //     weatherIcon.innerHTML = "<i class='wi wi-day-cloudy'></i>";
    // }
    // else if (weather >= 2 && weather <= 3) {
    //     weatherIcon.innerHTML = "<i class='wi wi-cloud'></i>";
    // }
    // else if (weather >= 4 && weather <= 5) {
    //     weatherIcon.innerHTML = "<i class='wi wi-cloudy'></i>";
    // }
    // else if (weather >= 6 && weather <= 7) {
    //     weatherIcon.innerHTML = "<i class='wi wi-fog'></i>";
    // }
    // else if (weather >= 10 && weather <= 16) {
    //     weatherIcon.innerHTML = "<i class='wi wi-rain'></i>";
    // }
    // else if ((weather >= 20 && weather <= 22) || (weather >= 60 && weather <= 68)) {
    //     weatherIcon.innerHTML = "<i class='wi wi-snow'></i>"
    // }
    // else if ((weather >= 30 && weather <= 32) || (weather >= 70 && weather <= 78) || (weather >= 230 && weather <= 232)) {
    //     weatherIcon.innerHTML = "<i class='wi wi-rain-mix'></i>";
    // }
    // else if (weather >= 40 && weather <= 48) {
    //     weatherIcon.innerHTML = "<i class='wi wi-showers'></i>";
    // }
    // else if  (weather >= 100 && weather <= 108) {
    //     weatherIcon.innerHTML = "<i class='wi wi-thunderstorm'></i>";
    // }
    // else if ((weather >= 120 && weather <= 128) || weather === 142) {
    //     weatherIcon.innerHTML = "<i class='wi wi-night-snow-thunderstorm'></i>";
    // }
    // else if ((weather >= 130 && weather <= 138) || weather === 141) {
    //     weatherIcon.innerHTML = "<i class='wi wi-night-sleet-storm'></i>";
    // }
    // else if (weather === 140) {
    //     weatherIcon.innerHTML = "<i class='wi wi-storm-showers'></i>";
    // }
    // else if (weather >= 210 && weather <= 212) {
    //     weatherIcon.innerHTML = "<i class='wi wi-night-alt-showers'></i>";
    // }
    // else if (weather >= 220 && weather <= 222) {
    //     weatherIcon.innerHTML = "<i class='wi wi-night-alt-snow'></i>";
    // }
    // else if (weather === 235) {
    //     weatherIcon.innerHTML = "<i class='wi wi-hail'></i>";
    // }
};
