import { WeatherData } from "@/interfaces/weatherData";
import { useState } from "react";



export function useWeatherData() {

     const [weatherData, setWeatherData] = useState<WeatherData>({
          dt: 0,
          timezone: 0,
          weather: [{
               description: "",
               main: "",
          }],
         current: {
               time: "",
               temperature_2m: 0,
               apparent_temperature: 0,
               weather_code: 0,
               cloud_cover: 0,
               wind_speed_10m: 0,
               pressure_msl: 0,
               relative_humidity_2m: 0,
          },
          name: "",
          hourly: {
               time: [],
               temperature_2m: [],
               weather_code: [],
               precipitation: [],
               wind_speed_10m: [],
          },
          daily: {
               time: [],
               temperature_2m_max: [],
               temperature_2m_min: [],
               apparent_temperature_max: [],
               apparent_temperature_min: [],
               wind_speed_10m_max: [],
               pressure_msl_mean: [],
               weather_code: [],
               precipitation_sum: [],
               winddirection_10m_dominant: []
          },
          imgBG: {
               pic: "/assets/Day.jpg",
               username: "Maksimaizer"
          },
          weekImgs: [],
     });

     return { weatherData, setWeatherData };
}