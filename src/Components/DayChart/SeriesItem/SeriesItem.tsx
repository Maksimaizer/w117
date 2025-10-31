import React, { useEffect, useRef } from 'react';
import * as styles from "./SeriesItem.module.scss";
import { weekDaysChart } from '@/utils/FavoriteCities';
import { chartBtn } from '../DayChart';
import { WeatherData } from '@/interfaces/weatherData';
import { getWeatherIconSvg } from '@/utils/GetWeatherIcons';

interface ISeriesItemProps {
    weatherData: WeatherData;
    btnSelect: chartBtn;
    index: number;
    days: string[];
}

const SeriesItem = ({weatherData, btnSelect, days, index}: ISeriesItemProps) => {

     const refImg = useRef<HTMLImageElement>(null);

     function setImg() {

          if(btnSelect.wind) {

            refImg.current.src = "/assets/ChartIcons/UpArrow.png";
          //  refImg.current.style.transform = `rotate(${weatherData.daily.winddirection_10m_dominant[index]}deg)`;

            refImg.current.style.cssText = `
            transform: rotate(${weatherData.daily.winddirection_10m_dominant[index]}deg);
            width: 8vmin;
            height: 8vmin;
            margin-top: 1vmin;
            margin-bottom: 1vmin;           
            `;

          } else {
               const icon = getWeatherIconSvg(weatherData.daily.weather_code[index]);
               refImg.current.src = `/assets/svg/${icon}.svg`;
               refImg.current.style.cssText = `
               transform: rotate(0deg);
               width: 10vmin;
               height: 10vmin;
               margin-top: 0vmin;
               margin-bottom: 1vmin;           
               `;
          }
     }

     useEffect(() => {
          setImg();
     },[weatherData, btnSelect]);

     return (
          <div className={styles.seriesItemWrap}>

               {btnSelect.precipitarion && <div className={styles.dataText}>{weatherData.daily.precipitation_sum[index]}<span style={{fontSize: "3vmin"}}>mm</span></div>}
               <img ref={refImg} loading='lazy' alt='Weather Icon' className={styles.weatherIcon}></img>
               <div className={styles.dataText}>{days[index]}</div>
               
          </div>
     );
};

export default SeriesItem;