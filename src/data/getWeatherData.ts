import { WeatherData } from "@/interfaces/weatherData";
import { getUnsplashDescr } from "@/utils/GetWeatherIcons";

const API_KEY_PICS = "jGVXPa7T2myGTpijz0Zd8GY6fypKYKAGhWv2D5hhxcs";

export interface UnsplashPhoto {
    regularUrl: string;
    username: string
}


async function getCachedWeekPics(): Promise<UnsplashPhoto[]> {
  const cacheKey = "weekPicsCache";
  const cacheData = localStorage.getItem(cacheKey);

  if (cacheData) {
    const { timestamp, data } = JSON.parse(cacheData);
    // если кеш моложе 12 часов — вернём его
    if (Date.now() - timestamp < 12 * 60 * 60 * 1000 && Array.isArray(data)) {
      console.log("Используем кешированные фото");
     
      data.forEach(({ regularUrl }) => {
          const img = new Image();
          img.src = regularUrl;
        });

      return data;
    }
  }

  console.log("Загружаем новые фото...");

   const randomPicsArrResponse = await fetch(`https://api.unsplash.com/photos/random?count=14&query=macro+nature&orientation=portrait&client_id=${API_KEY_PICS}`);
   if (!randomPicsArrResponse.ok) {
          console.error("Ошибка сервера:", await randomPicsArrResponse.text());
          return [];
     }
   const randomPicsArr: UnsplashPhoto[] = await randomPicsArrResponse.json();

   const randomPicsUrls = randomPicsArr.map((data: any) => ({
     regularUrl: data.urls?.regular || "",
     username: data.user?.username || "unknown"
   }));

     randomPicsUrls.forEach(({ regularUrl }) => {
          const img = new Image();
          img.src = regularUrl;
     });

  localStorage.setItem(
    cacheKey,
    JSON.stringify({ timestamp: Date.now(), data: randomPicsUrls })
  );

  return randomPicsUrls;
}


function unsplashDescrTime(time: string): string {
     const hour = +time.split("T")[1].slice(0, 2);

     if(hour < 4 || hour > 20) return "night";
     else if(hour > 4 && hour < 8) return "dawn";
     else if(hour > 17 && hour < 19) return "sunset"
     else return "day";
}



export async function getWeatherData(setWeatherData: (weatherData: WeatherData) => void, city: string): Promise<void | null> {

     try {

     
          const cityResponse = await fetch(`/api/weather?city=${city}`);
          const cityData = await cityResponse.json();

          const forecastResponse = await fetch(`/api/forecast?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}`);
          const forecastData = await forecastResponse.json();


 
          const unsplashDescr = getUnsplashDescr(forecastData.current.weather_code, forecastData.current.time);

          const randomPicResponse = await fetch(`https://api.unsplash.com/photos/random?query=${unsplashDescr}&orientation=portrait&client_id=${API_KEY_PICS}`);
          const randomPic = await randomPicResponse.json();



          console.log(forecastData.daily.weather_code);

          const randomPicsUrls =  await getCachedWeekPics();

          
          setWeatherData({
               dt: cityData.dt,
               timezone: cityData.timezone,
               weather: [{
                    description: cityData.weather[0].description,
                    main: cityData.weather[0].main,
               }],
              current: {
                    time: forecastData.current.time,
                    temperature_2m: forecastData.current.temperature_2m,
                    apparent_temperature: forecastData.current.apparent_temperature,
                    weather_code: forecastData.current.weather_code,
                    cloud_cover: forecastData.current.cloud_cover,
                    wind_speed_10m: forecastData.current.wind_speed_10m,
                    pressure_msl: forecastData.current.pressure_msl,
                    relative_humidity_2m: forecastData.current.relative_humidity_2m,
               },
               name: cityData.name,
               hourly: {
                    time: forecastData.hourly.time,
                    temperature_2m: forecastData.hourly.temperature_2m,
                    weather_code: forecastData.hourly.weather_code,
                    precipitation: forecastData.hourly.precipitation,
                    wind_speed_10m: forecastData.hourly.wind_speed_10m,
               },
               daily: {
                    time: forecastData.daily.time,
                    temperature_2m_max: forecastData.daily.temperature_2m_max,
                    temperature_2m_min: forecastData.daily.temperature_2m_min,
                    apparent_temperature_max: forecastData.daily.apparent_temperature_max,
                    apparent_temperature_min: forecastData.daily.apparent_temperature_min,
                    wind_speed_10m_max: forecastData.daily.wind_speed_10m_max,
                    pressure_msl_mean: forecastData.daily.pressure_msl_mean,
                    weather_code: forecastData.daily.weather_code,
                    precipitation_sum: forecastData.daily.precipitation_sum,
                    winddirection_10m_dominant: forecastData.daily.winddirection_10m_dominant
               },
               imgBG: {
                    pic: randomPic.urls.regular,
                    username: randomPic.user.username
               },
               weekImgs: randomPicsUrls
          })


     } catch (error) {
          console.error(error);
          return null;
     }
}