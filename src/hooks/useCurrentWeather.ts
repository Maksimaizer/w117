import { WeatherData } from "@/interfaces/weatherData";
import { useEffect, useState } from "react";

export interface WeatherItem {
     label: string;
     value: string | number;
     unit?: string;
     icon?: string; 
   };




export function useCurrentWeather(weatherData: WeatherData) {

     const [currentWeatherData, setCurrentWeaherData] = useState<WeatherItem[]>([
          { label: "Температура", value: 23, unit: "°C", icon: "/assets/BtnImages/CurrentWeatherIcons/temperature.png" },
          { label: "По ощущениям", value: 18, unit: "°C", icon: "/assets/BtnImages/CurrentWeatherIcons/feelsLike.png" },
          { label: "Облачность", value: 89, unit: "%", icon: "/assets/BtnImages/CurrentWeatherIcons/clouds.png" },
          { label: "Ветер", value: "6", unit: "m/s", icon: "/assets/BtnImages/CurrentWeatherIcons/wind.png" },
          { label: "Давление", value: 764, unit: "mmHg", icon: "/assets/BtnImages/CurrentWeatherIcons/pressure.png" },
          { label: "Влажность", value: 42, unit: "%", icon: "/assets/BtnImages/CurrentWeatherIcons/humidity.png" },         
     ]);

     useEffect(() => {
          setCurrentWeaherData(prev =>
               prev.map(item => {
                 switch (item.label) {
                   case "Температура":
                     return { ...item, value: Math.trunc(weatherData.current.temperature_2m) };
                   case "По ощущениям":
                     return { ...item, value: Math.trunc(weatherData.current.apparent_temperature) };
                   case "Облачность":
                     return { ...item, value: weatherData.current.cloud_cover };
                   case "Ветер":
                     return { ...item, value: Math.trunc(weatherData.current.wind_speed_10m) };
                   case "Давление":
                     return { ...item, value: Math.trunc(weatherData.current.pressure_msl / 1.333) }; // hPa → мм рт. ст.
                   case "Влажность":
                     return { ...item, value: weatherData.current.relative_humidity_2m };
                   default:
                     return item;
                 }
               })
             );
     }, [weatherData]);



     return {currentWeatherData};

}