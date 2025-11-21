import React, { useEffect, useRef, useState } from 'react';
import * as styles from "./WeekForecastItem.module.scss";
import { WeatherData } from '@/interfaces/weatherData';
import { getWeatherDescr } from '@/utils/GetWeatherIcons';
import { HourForecast } from '../WeekForecast';
import { url } from 'inspector';


interface IWeekForecastItemProps {
     weatherData: WeatherData;
     index: number;
     containerRef: React.RefObject<HTMLDivElement>;
     days: string[];
     hourTempData: HourForecast[];
     selectedIndex: number;
     setScrollCoord: React.Dispatch<React.SetStateAction<number>>;
}

const WeekForecastItem = ({weatherData, days, hourTempData, index, containerRef, selectedIndex, setScrollCoord}: IWeekForecastItemProps) => {

     const currentTempData = [
          {icon: "/assets/BtnImages/CurrentWeatherIcons/temperature.png", title: "Температура", maxTemp: Math.trunc(weatherData.daily.temperature_2m_max[index]), minTemp: Math.trunc(weatherData.daily.temperature_2m_min[index])},
          {icon: "/assets/BtnImages/CurrentWeatherIcons/feelsLike.png", title: "По ощущениям", maxTemp: Math.trunc(weatherData.daily.apparent_temperature_max[index]), minTemp: Math.trunc(weatherData.daily.apparent_temperature_min[index])}
     ];


     const weatherDesciption = getWeatherDescr(weatherData.daily.weather_code[index]);

     const itemRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
     if(selectedIndex == 0) return;
     if (selectedIndex === index && itemRef.current) {

        const itemCoords =  itemRef.current.getBoundingClientRect();
        setScrollCoord(itemCoords.top);
    }
     }, [selectedIndex, index])

useEffect(() => {
  const handleScroll = () => {
    if (!itemRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const item = itemRef.current;
    const scrollY = container.scrollTop;
    
    // Позиция элемента относительно viewport контейнера
    const itemTop = item.offsetTop;
    const itemHeight = item.offsetHeight;
    const containerHeight = container.clientHeight;
    
    // Когда элемент начинает появляться и когда полностью исчезает
    const start = itemTop - containerHeight;
    const end = itemTop + itemHeight;
    
    // Прогресс скролла для этого элемента (0-1)
    let progress = (scrollY - start) / (end - start);
    progress = Math.max(0, Math.min(1, progress)); // Ограничиваем 0-1
    
    // Разная скорость параллакса
    const speed = 0.8 + (index * 0.12);
    
    // Двигаем фон пропорционально прогрессу
    const yPos = -(progress * 100 * speed); // Максимум 50-80px движения
    
    item.style.backgroundPositionY = `${yPos}px`;
  };

  const container = containerRef.current;
  if (container) {
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }
}, [containerRef, index]);



     return (
          <div className={styles.container} ref={itemRef} style={{backgroundImage: `url(${weatherData.weekImgs[index].regularUrl})`}}>
               <div className={styles.content}>

                    <div className={styles.dateWrap}>
                         <div className={styles.date}>{days[index]}</div>
                         <div className={styles.currentWeather}>{weatherDesciption}</div>
                    </div>

                    <div className={styles.weatherDataWrap}>
                         
                         {currentTempData.map((weaatherData, index) => (
                              <div key={index} className={styles.cutrentTempWrap}>

                              <div className={styles.iconWrap}>
                                   <img className={styles.tempIcon} src={weaatherData.icon} alt=''></img>
                                   <div className={styles.tempTitle}>{weaatherData.title}</div>
                              </div>

                              <div>
                                   <div className={styles.currentTemp}>{weaatherData.maxTemp + "° / " + weaatherData.minTemp + "°"}</div>
                              </div>
                         </div>
                         ))}

                         {hourTempData.map((hourData, index) => (
                              <div key={index} className={styles.hourTempWrap}>

                                   <div>{hourData.time}</div>
                                   <img src={`/assets/svg/${hourData.icon}.svg`} loading='lazy' className={styles.weatherImg} alt=''></img>
                                   <div>{hourData.temp}°</div>
                                   <div>{hourData.precipitarion}<span>мм</span></div>
                                   <div>{hourData.wind}<span>м\с</span></div>

                              </div>
                         ))}
                         
                    </div>
                    <div className={styles.iconWatermark}>@{weatherData.weekImgs[index].username}</div>
               </div>
               
          </div>
     );
};

export default WeekForecastItem;