import React, { RefObject, useEffect, useRef } from 'react';
import * as styles from "./WindChartitem.module.scss";
import { WeatherData } from '@/interfaces/weatherData';

interface IWindChartItem {
     weatherData: WeatherData;
     index: number;
     weatherDataToBarHeight: (maxVaule: number, dataWeather:number) => number;
}

const WindChartItem = ({weatherData, index, weatherDataToBarHeight}: IWindChartItem) => {

     const windSpeed = Math.round(weatherData.daily.wind_speed_10m_max[index]);
     const windBarHeight = weatherDataToBarHeight(10, windSpeed);

     
     return (
          <div className={styles.columnBox} data-index={index} style={{backgroundColor: `${index % 2 == 0 ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 1)"}`}}>
               <div className={styles.columnContent}>
                    <div className={styles.windLabel}>{windSpeed}</div>
                    <div className={styles.windBar} style={{height: windBarHeight + "%"}}></div>             
               </div>
          </div>
     );
};

export default WindChartItem;