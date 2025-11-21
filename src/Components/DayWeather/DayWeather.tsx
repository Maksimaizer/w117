import React, { useEffect, useState } from 'react';
import * as styles from './DayWeather.module.scss';
import { WeatherData } from '@/interfaces/weatherData';
import {getWeatherDescr, getWeatherIconSvg} from '@/utils/GetWeatherIcons';

interface IDayWeatherProps {
     weatherData: WeatherData;
}


const DayWeather = ({weatherData}: IDayWeatherProps) => {

      const [time, setTime] = useState<string>();
      const [icon, setIcon] = useState("/assets/svg/clear-day.svg");
      const [description, setDescription] = useState("");

     
     useEffect(() => {
          if (!weatherData?.timezone) return;

          const updateTime = () => {
               const nowUTC = Date.now();
               const localDate = new Date(nowUTC + weatherData.timezone * 1000);

               const formatter = new Intl.DateTimeFormat("ru-RU", {
                    weekday: "short",  
                    day: "numeric",    
                    month: "short",   
                    hour: "2-digit",   
                    minute: "2-digit", 
                    timeZone: "UTC"    
               });
               
               const formatted = formatter.format(localDate);

               setTime(formatted);
          };

          updateTime();

          const interval = setInterval(updateTime, 1000);

    // очистка таймера при размонтировании / смене города
           return () => clearInterval(interval);

     }, [weatherData?.timezone]);



     useEffect(() => {
          if(!weatherData) return;
         const weatherCode = getWeatherIconSvg(weatherData.daily.weather_code[0]);
         const weatherDescr = getWeatherDescr(weatherData.daily.weather_code[0]);

          setIcon(weatherCode);
          setDescription(weatherDescr);
     }, [weatherData]);


     return (
          <div className={styles.container}>
               <div className={styles.conent}>
                    <div className={styles.tempAndDataWrap}>

                         <div className={styles.tempWrap}>
                              <div className={styles.tempMax}><span>Макс.</span>{Math.trunc(weatherData.daily.temperature_2m_max[0]) || 0}°</div>
                              <div className={styles.tempMin}><span>Мин.</span>{Math.trunc(weatherData.daily.temperature_2m_min[0]) || 0}°</div>
                         </div>

                         <div className={styles.dateWrap}>
                              <div className={styles.currentDate}>{time}</div>
                         </div>
                    </div>

                    <div className={styles.weatherStateWrap}>
                         <img className={styles.weatherStateIcon} src={`/assets/svg/${icon}.svg`} loading='lazy' alt=''></img>
                         <div className={styles.weatherState}>Сегодня: {description}</div>
                    </div>
               </div>
          </div>
     );
};

export default DayWeather;