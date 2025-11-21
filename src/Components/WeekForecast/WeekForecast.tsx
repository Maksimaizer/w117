import React, { Dispatch, useEffect, useRef, useState } from 'react';
import * as styles from "./WeekForecast.module.scss";
import WeekForecastItem from './WeekForecastItem/WeekForecastItem';
import { IisWeekForecast } from '../App/App';
import { WeatherData } from '@/interfaces/weatherData';
import { getWeatherIconSvg } from '@/utils/GetWeatherIcons';

interface IWeekForecastProps {
     setIsWeekForecast: Dispatch<React.SetStateAction<IisWeekForecast>>;
     isWeekForecast: IisWeekForecast;
     weatherData: WeatherData;
     days: string[];
     selectedIndex: number;
}

export interface HourForecast {
  time: string;          // "00:00", "06:00" и т.д.
  temp: number;          // температура
  precipitarion: number; // осадки
  wind: number;          // скорость ветра
  icon: string;          // путь к иконке
}

const WeekForecast = ({isWeekForecast, setIsWeekForecast, weatherData, days, selectedIndex}: IWeekForecastProps) => {

     const containerRef = useRef<HTMLDivElement>(null);
     const allDaysForecast: HourForecast[][]  = get6HourForecastForAllDays(weatherData);
     const [scrollCoord, setScrollCoord] = useState(0);

     function btnHandle() {


          setIsWeekForecast((prev) => {return {
               ...prev,
               animation: false
          }});

          setTimeout(() => {
               setIsWeekForecast((prev) => {return {
               ...prev,
               toShow: false
          }});
          setScrollCoord(0);
          }, 300);

     }

     useEffect(() => {
          if(!isWeekForecast.toShow) return;

          containerRef.current.scroll({
               top: scrollCoord,
               left: 0,
               behavior: "smooth"
          });
     }, [isWeekForecast.toShow, scrollCoord])

     function get6HourForecastForAllDays(weatherData: WeatherData) {
          const hourly = weatherData.hourly;
          const dailyDates = weatherData.daily.time; // массив ["2025-10-14", "2025-10-15", ...]

          const targetHours = ["00", "06", "12", "18"];

          // массив из 14 элементов, где каждый — массив из 4 объектов
          const result = dailyDates.map(dayDate => {
          return hourly.time
               .map((t, i) => ({
               date: t.split("T")[0],
               hour: t.split("T")[1].slice(0, 2),
               temp: Math.round(hourly.temperature_2m[i]),
               precipitarion: hourly.precipitation[i],
               wind: Math.round(hourly.wind_speed_10m[i]),
               icon: getWeatherIconSvg(hourly.weather_code[i])
               }))
               .filter(item => item.date === dayDate && targetHours.includes(item.hour))
               .map(item => ({
               time: `${item.hour}:00`,
               temp: item.temp,
               precipitarion: item.precipitarion,
               wind: item.wind,
               icon: item.icon
               }));
          });

          return result; // [[день1], [день2], [день3], ...]
     }
     
     return (
          <div className={styles.container} ref={containerRef} style={{transform: isWeekForecast.animation ? "" : "translateX(100%)"}}>
               <button className={styles.backBtn} onClick={btnHandle}>
                    <img src='/assets/BtnImages/WeekForecast/backArrow.png' className={styles.backIcon} loading='lazy' alt="Back"></img>
               </button>

               <div className={styles.titleWrap}>
                    <div className={styles.title}>Ежедневный</div>
               </div>

               {weatherData.daily.temperature_2m_max.map((_, index) => <WeekForecastItem weatherData={weatherData} days={days} hourTempData={allDaysForecast[index]} containerRef={containerRef} selectedIndex={selectedIndex} setScrollCoord={setScrollCoord} index={index} key={index}/>)}
               
          </div>
     );
};

export default WeekForecast;