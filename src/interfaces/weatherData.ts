import { UnsplashPhoto } from "@/data/getWeatherData";

export interface WeatherData {
     dt: number;
     timezone: number;
     weather: [
     {
          description: string;
          main: string;
     }
     ];
    current: {
          time: string,
          temperature_2m: number,
          apparent_temperature: number,
          weather_code: number,
          cloud_cover: number,
          wind_speed_10m: number,
          pressure_msl: number,
          relative_humidity_2m: number,
     }
     name: string;
     hourly: {
          time: string[];
          temperature_2m: number[];
          weather_code: number[];
          precipitation: number[];
          wind_speed_10m: number[];
     };
     daily: {
          time: string[];
          temperature_2m_max: number[];
          temperature_2m_min: number[];
          apparent_temperature_max: number[];
          apparent_temperature_min: number[];
          wind_speed_10m_max: number[];
          pressure_msl_mean: number[];
          weather_code: number[];
          precipitation_sum: number[];
          winddirection_10m_dominant: number[];
     };
     imgBG: {
          pic: string;
          username: string;
     };
     weekImgs: UnsplashPhoto[];

}