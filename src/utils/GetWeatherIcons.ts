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

export const weatherIconsDay: Record<string, string> = {
  "0": "clear-day",
  "1": "partly-cloudy-day",
  "2": "partly-cloudy-day",
  "3": "cloudy",

  "45": "mist",
  "48": "mist",

  "51": "rain",
  "53": "rain",
  "55": "rain",
  "61": "rain",
  "63": "rain",
  "80": "rain",
  "65": "rain-heavy",
  "81": "rain-heavy",
  "82": "rain-heavy",

  "71": "snow",
  "73": "snow",
  "75": "snow",
  "85": "snow",
  "86": "snow",

  "95": "thunderstorm",
  "96": "thunderstorm",
  "99": "thunderstorm",
};

export const weatherIconsNight: Record<string, string> = {
  "0": "clear-night",
  "1": "partly-cloudy-night",
  "2": "partly-cloudy-night",
  "3": "cloudy",

  "45": "mist",
  "48": "mist",

  "51": "rain-night",
  "53": "rain-night",
  "55": "rain-night",
  "61": "rain-night",
  "63": "rain-night",
  "80": "rain-night",

  "65": "rain-heavy",
  "81": "rain-heavy",
  "82": "rain-heavy",

  "71": "snow",
  "73": "snow",
  "75": "snow",
  "85": "snow",
  "86": "snow",

  "95": "thunderstorm-night",
  "96": "thunderstorm-night",
  "99": "thunderstorm-night",
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

export function getWeatherIconSvg(code: number | string, currentTime?: string): string {
     // let dayOrNight: "day" | "night" | undefined;

     // if(currentTime) {
     //      const hour = +currentTime.split("T")[1].slice(0, 2);
     //      dayOrNight = hour < 6 || hour > 18 ? "night" : "day";
     // }

     // if (!dayOrNight || dayOrNight === "day") {
     //      return weatherIcons[code as keyof typeof weatherIcons] || Rainbow;
     // }

     // return weatherIconsNight[code as keyof typeof weatherIconsNight] || Rainbow;

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



// export function getWeatherIconArr(weatherCode: number[], timeOffset: number) {

//         //  const code = weatherData.hourly.weather_code[+hours[0].slice(0, 2) + pos];
//           let code = 0;
//           let icon = "01d";
//           const codesArr = []

//           for(let i = 0; i <= 11; i++) {

//                code = weatherCode[timeOffset + i];

//                if(code == 0) icon = "01d";
//                else if(code == 1 || code == 2) icon = "02d";
//                else if(code == 3) icon = "03d";
//                else if(code == 61 || code == 63 || code == 53 || code == 51) icon = "10d";
//                else if(code == 65 || code == 55) icon = "09d";
//                else if(code == 45 || code == 48) icon = "50d";
//                else if(code == 71 || code == 73 || code == 75) icon = "13d";
               
//                codesArr.push(icon);
//           }

          

//           console.log(codesArr);

//           return codesArr

//      }


//      export function getWeatherIcon(weatherCode: number) {

//                let icon = "";

//                if(weatherCode == 0) icon = "01d";
//                else if(weatherCode == 1 || weatherCode == 2) icon = "02d";
//                else if(weatherCode == 3) icon = "03d";
//                else if(weatherCode == 61 || weatherCode == 63 || weatherCode == 53 || weatherCode == 51 || weatherCode == 80) icon = "10d";
//                else if(weatherCode == 65 || weatherCode == 55 || weatherCode == 81 || weatherCode == 82) icon = "09d";
//                else if(weatherCode == 45 || weatherCode == 48) icon = "50d";
//                else if(weatherCode == 71 || weatherCode == 73 || weatherCode == 75) icon = "13d";

//                console.log("I am daily icon: " + weatherCode);

//                return icon;
//      }