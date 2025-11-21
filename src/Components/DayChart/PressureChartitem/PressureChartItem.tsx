import React, { RefObject, useEffect, useRef } from 'react';
import * as styles from "./PressureChartItem.module.scss";
import { weekData } from '../DayChart';
import { WeatherData } from '@/interfaces/weatherData';

interface IPressureChartItemProps {
     weatherData: WeatherData;
     index: number;
     minAndMaxWeekData: weekData;
     dataToPercent: (value: number, maxVaule: number, minValue: number) => number
}


const PressureChartItem = ({weatherData, index, minAndMaxWeekData, dataToPercent}: IPressureChartItemProps) => {

     const refPressureBar = useRef<HTMLDivElement>(null);
     const pressueMmHg = weatherData.daily.pressure_msl_mean[index] / 1.333;

     function setPressureBarHeight() {
         let percent = dataToPercent(pressueMmHg, minAndMaxWeekData.maxPressure, minAndMaxWeekData.minPressure);

          if(pressueMmHg === minAndMaxWeekData.minPressure) {
               percent += 2;
          }

         refPressureBar.current.style.height = percent + "%";
     }

     useEffect(() => {

          setPressureBarHeight();

     }, [weatherData]);     

     return (
          <div className={styles.columnBox} data-index={index} style={{backgroundColor: `${index % 2 == 0 ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 1)"}`}}>
               <div className={styles.columnContent}>
                    <div className={styles.Label}>{Math.round(pressueMmHg)}</div>
                    <div className={styles.Bar} ref={refPressureBar}></div>             
               </div>
          </div>
     );
};

export default PressureChartItem;