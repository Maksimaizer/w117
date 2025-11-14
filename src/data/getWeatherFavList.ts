import { useForecastLabels } from "@/hooks/useForecastLabels";
import { getUnsplashDescr, getWeatherIconSvg } from "@/utils/GetWeatherIcons";

const API_KEY_PICS = "jGVXPa7T2myGTpijz0Zd8GY6fypKYKAGhWv2D5hhxcs";


export interface IfavCities {
     city: string,
     temperature: number,
     date: number,
     timezone: number,
     backgroundImg: string,
     currentIcon: string,
     forecast: [
          {
          maxTemp: number,
          minTemp: number,
          icon: string,
          day: string
          },
          {
          maxTemp: number,
          minTemp: number,
          icon: string,
          day: string
          }
     ]
}


export async function getWeatherForFavoriteList() {
          const favList = JSON.parse(localStorage.getItem("favCitiesList") || "[]");

          // Берем последний добавленный город
          const lastCityName = favList[favList.length - 1]?.city;
          if (!lastCityName) return;

          // await fetch(`/api/weather?city=${lastCityName}`);
          // Получаем координаты
          const coordsResponse = await fetch(`/api/weather?city=${lastCityName}`);
          const coords = await coordsResponse.json();

          // Получаем расширенный прогноз
          const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.coord.lat}&longitude=${coords.coord.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,weather_code&timezone=auto&forecast_days=3&wind_speed_unit=ms`
          ).then(r => r.json());

          const unsplashDescr = getUnsplashDescr(weatherResponse.current.weather_code, weatherResponse.current.time);
          const unsplashResponse = await fetch(`https://api.unsplash.com/photos/random?query=${unsplashDescr}&orientation=portrait&client_id=${API_KEY_PICS}`).then(r => r.json());

          const iconCurrent = getWeatherIconSvg(weatherResponse.current.weather_code, weatherResponse.current.time);
          
          const {days} = useForecastLabels(coords.dt, coords.timezone);

          const weatherData: IfavCities = {
               city: lastCityName,
               temperature: Math.trunc(weatherResponse.current.temperature_2m),
               date: coords.dt,
               timezone: coords.timezone,
               backgroundImg: unsplashResponse.urls.regular,
               currentIcon: iconCurrent,
               forecast: [
                    {
                    maxTemp: Math.trunc(weatherResponse.daily.temperature_2m_max[0]),
                    minTemp: Math.trunc(weatherResponse.daily.temperature_2m_min[0]),
                    icon: getWeatherIconSvg(weatherResponse.daily.weather_code[0]),
                    day: days[0]
                    },
                    {
                    maxTemp: Math.trunc(weatherResponse.daily.temperature_2m_max[1]),
                    minTemp: Math.trunc(weatherResponse.daily.temperature_2m_min[1]),
                    icon: getWeatherIconSvg(weatherResponse.daily.weather_code[1]),
                    day: days[1]
                    }
               ]
          };

          // Создаем новый список (без мутаций)
          const updatedList = [...favList.slice(0, -1), weatherData];

        //  setFavCitiesCahce(updatedList);
          localStorage.setItem("favCitiesList", JSON.stringify(updatedList));

          window.dispatchEvent(new Event("favCitiesUpdated"));

          console.log("test");

       //   return updatedList;
}

export async function updateAllFavoriteCitiesIfOld() {
  const favList = JSON.parse(localStorage.getItem("favCitiesList") || "[]");
  const lastUpdate = localStorage.getItem("favCitiesLastUpdate");
  const now = Date.now();

  // Если кэша нет — нечего обновлять
  if (!favList.length) return [];

  // Проверяем возраст кэша (1 час)
  if (lastUpdate && now - Number(lastUpdate) < 60 * 60 * 1000) {
    console.log("Кэш свежее часа — обновление не требуется");
    return favList;
  }

  console.log("Обновляем весь список городов последовательно...");

  const updatedList = [];

  // Вспомогательная функция для задержки
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  for (const item of favList) {
    try {
      console.log(`⏳ Обновляем город: ${item.city}`);

      // await fetch(`/api/weather?city=${item.city}`);
      // Получаем координаты
      const coordsResponse =await fetch(`/api/weather?city=${item.city}`);
      
      const coords = await coordsResponse.json();

      // Получаем прогноз
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.coord.lat}&longitude=${coords.coord.lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,weather_code&timezone=auto&forecast_days=3&wind_speed_unit=ms`
      ).then((r) => r.json());

      const unsplashDescr = getUnsplashDescr(weatherResponse.current.weather_code, weatherResponse.current.time);
      const unsplashResponse = await fetch(
        `https://api.unsplash.com/photos/random?query=${unsplashDescr}&orientation=portrait&client_id=${API_KEY_PICS}`
      ).then((r) => r.json());

      const iconCurrent = getWeatherIconSvg(weatherResponse.current.weather_code, weatherResponse.current.time);

      const {days} = useForecastLabels(coords.dt, coords.timezone);

      updatedList.push({
        city: item.city,
        temperature: Math.trunc(weatherResponse.current.temperature_2m),
        date: coords.dt,
        timezone: coords.timezone,
        backgroundImg: unsplashResponse.urls.regular,
        currentIcon: iconCurrent,
        forecast: [
          {
            maxTemp: Math.trunc(weatherResponse.daily.temperature_2m_max[0]),
            minTemp: Math.trunc(weatherResponse.daily.temperature_2m_min[0]),
            icon: getWeatherIconSvg(weatherResponse.daily.weather_code[0]),
            day: days[0]
          },
          {
            maxTemp: Math.trunc(weatherResponse.daily.temperature_2m_max[1]),
            minTemp: Math.trunc(weatherResponse.daily.temperature_2m_min[1]),
            icon: getWeatherIconSvg(weatherResponse.daily.weather_code[1]),
            day: days[1]
          },
        ],
      });

      // Делаем паузу 400 мс перед следующим городом
      await delay(400);
    } catch (err) {
      console.error(`❌ Ошибка при обновлении ${item.city}:`, err);
      updatedList.push(item); // Сохраняем старые данные
    }
  }

  // Сохраняем результат
  localStorage.setItem("favCitiesList", JSON.stringify(updatedList));
  localStorage.setItem("favCitiesLastUpdate", String(now));

  console.log("✅ Список городов обновлён и сохранён");

  return updatedList;
}
