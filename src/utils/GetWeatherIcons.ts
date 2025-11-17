import ClearDay from "../../public/assets/svg/clear-day.svg";
import ClearNight from "../../public/assets/svg/clear-night.svg";
import PartlyCloudy from "../../public/assets/svg/partly-cloudy-day.svg";
import PartlyCloudyNight from "../../public/assets/svg/partly-cloudy-night.svg";
import Cloudy from "../../public/assets/svg/cloudy.svg";
import Rain from "../../public/assets/svg/overcast-day-drizzle.svg";
import RainNight from "../../public/assets/svg/overcast-night-drizzle.svg";
import HeavyRain from "../../public/assets/svg/rain.svg";
import Mist from "../../public/assets/svg/mist.svg";
import Snow from "../../public/assets/svg/snow.svg";
import Thunderstorm from "../../public/assets/svg/thunderstorms-day-overcast.svg";
import ThunderstormNight from "../../public/assets/svg/thunderstorms-day-overcast.svg";

import Rainbow from "../../public/assets/svg/rainbow.svg";




// const weatherIcons = {
//      "0": ClearDay,
//      "1": PartlyCloudy,
//      "2": PartlyCloudy,
//      "3": Cloudy,
//      "61": Rain,
//      "63": Rain,
//      "53": Rain,
//      "51": Rain,
//      "80": Rain,
//      "65": HeavyRain,
//      "55": HeavyRain,
//      "81": HeavyRain,
//      "82": HeavyRain,
//      "45": Mist,
//      "48": Mist,
//      "71": Snow,
//      "73": Snow,
//      "75": Snow,
//      "85": Snow,
//      "86": Snow,
//      "95": Thunderstorm,
//      "96": Thunderstorm,
//      "99": Thunderstorm,

// }

// const weatherIconsNight = {
//      "0": ClearNight,
//      "1": PartlyCloudyNight,
//      "2": PartlyCloudyNight,
//      "3": Cloudy,
//      "61": RainNight,
//      "63": RainNight,
//      "53": RainNight,
//      "51": RainNight,
//      "80": RainNight,
//      "65": HeavyRain,
//      "55": HeavyRain,
//      "81": HeavyRain,
//      "82": HeavyRain,
//      "45": Mist,
//      "48": Mist,
//      "71": Snow,
//      "73": Snow,
//      "75": Snow,
//      "85": Snow,
//      "86": Snow,
//      "95": ThunderstormNight,
//      "96": ThunderstormNight,
//      "99": ThunderstormNight,

// }


//      "61": Rain,
//      "63": Rain,
//      "53": Rain,
//      "51": Rain,
//      "80": Rain,

export const weatherIconsDay: Record<string, string> = {
  "0": "clear-day",
  "1": "partly-cloudy-day",
  "2": "partly-cloudy-day",
  "3": "cloudy",

  "45": "mist",
  "48": "mist",

  "51": "overcast-day-drizzle",
  "53": "overcast-day-drizzle",
  "55": "overcast-day-drizzle",
  "61": "overcast-day-drizzle",
  "63": "overcast-day-drizzle",
  "80": "overcast-day-drizzle",

  "66": "overcast-day-sleet",
  "67": "overcast-day-sleet",

  "65": "rain",
  "81": "rain",
  "82": "rain",

  "71": "snow",
  "73": "snow",
  "75": "snow",
  "85": "snow",
  "86": "snow",

  "95": "thunderstorms-day-overcast",
  "96": "thunderstorms-day-overcast",
  "99": "thunderstorms-day-overcast",
};

export const weatherIconsNight: Record<string, string> = {
  "0": "clear-night",
  "1": "partly-cloudy-night",
  "2": "partly-cloudy-night",
  "3": "cloudy",

  "45": "mist",
  "48": "mist",

  "51": "overcast-night-drizzle",
  "53": "overcast-night-drizzle",
  "55": "overcast-night-drizzle",
  "61": "overcast-night-drizzle",
  "63": "overcast-night-drizzle",
  "80": "overcast-night-drizzle",

  "66": "overcast-night-sleet",
  "67": "overcast-night-sleet",

  "65": "rain",
  "81": "rain",
  "82": "rain",

  "71": "snow",
  "73": "snow",
  "75": "snow",
  "85": "snow",
  "86": "snow",

  "95": "thunderstorms-night-overcast",
  "96": "thunderstorms-night-overcast",
  "99": "thunderstorms-night-overcast",
};

const weatherDescription = {
     "0": "Ясно",
     "1": "Переменная облачность",
     "2": "Облачно с прояснениями",
     "3": "Пасмурно",
     "61": "Небольшой дождь",
     "63": "Дождь",
     "53": "Дождь",
     "51": "Небольшой дождь",
     "80": "Дождь",
     "65": "Сильный дождь",
     "55": "Сильный дождь",
     "66": "Снег с дождем",
     "67": "Мокрый снег",
     "81": "Ливень",
     "82": "Сильный ливень",
     "45": "Туман",
     "48": "Туман",
     "71": "Небольшой снег",
     "73": "Снег",
     "75": "Метель",
     "85": "Метель",
     "86": "Метель",
     "95": "Гроза",
     "96": "Гроза",
     "99": "Гроза",
}

const unsplashDescription = {
     "0": "Clear+sky",
     "1": "Clear+sky",
     "2": "Partly+Cloudy",
     "3": "Overcast",
     "61": "Slight+Rain",
     "63": "Rain",
     "53": "Rain",
     "51": "Slight+Rain",
     "80": "Rain",
     "65": "Heavy+Rain",
     "66": "Sleet",
     "67": "Sleet",
     "55": "Heavy+Rain",
     "81": "Heavy+Rain",
     "82": "Heavy+Rain",
     "45": "Mist",
     "48": "Mist",
     "71": "Slight+Snow",
     "73": "Snow",
     "75": "Blizzard",
     "85": "Blizzard",
     "86": "Blizzard",
     "95": "Thunderstorm",
     "96": "Thunderstorm",
     "99": "Thunderstorm",
}

export function preloadIcons() {

     const preloaded = new Set<string>();


     [weatherIconsDay, weatherIconsNight].forEach(obj => {
     Object.values(obj).forEach(iconName => {
          const path = `/assets/svg/${iconName}.svg`;
          if (!preloaded.has(path)) {
          preloaded.add(path);
          const img = new Image();
          img.src = path;
          }
     });
     });


     const preloadArrow = new Image();
     preloadArrow.src = "/assets/ChartIcons/UpArrow.png";
  
}

export function getWeatherIconSvg(code: number | string, currentTime?: string): string {

     const hour = currentTime ? +currentTime.split("T")[1].slice(0, 2) : 12;
     const isNight = hour < 6 || hour > 18;

     const dict = isNight ? weatherIconsNight : weatherIconsDay;

     return dict[String(code)] || "rainbow";
}

export function getWeatherDescr(code: number | string): string {
     return weatherDescription[code as keyof typeof weatherDescription] || "Возможны осадки в виде фрикаделек";
}

export function getUnsplashDescr(code: number | string, time: string): string {
     const hour = +time.split("T")[1].slice(0, 2);
     const descrCode = unsplashDescription[code as keyof typeof unsplashDescription] || "Sky";
     let timeOfDay = "";

     if(hour < 4 || hour >= 20) timeOfDay = "night";
     else if(hour >= 4 && hour < 8) timeOfDay = "dawn";
     else if(hour >= 17 && hour <= 19) timeOfDay = "sunset"
     else timeOfDay = "day";

     const finalDescr = `${timeOfDay}+${descrCode}`;

     return finalDescr;
}

