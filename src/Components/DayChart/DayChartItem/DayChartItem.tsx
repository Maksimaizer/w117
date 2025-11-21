import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import * as styles from "./DayChartItem.module.scss";
import { weekData } from '../DayChart';
import { WeatherData } from '@/interfaces/weatherData';
import { setGradientBar } from '@/utils/GradientDayChart';
import { IisWeekForecast } from '@/Components/App/App';

interface IDayChartItemProps {
     weatherData: WeatherData;
     index: number;
     minAndMaxWeekData: weekData;
     weatherDataToBarHeight: (maxVaule: number, dataWeather:number) => number;
     dataToPercent: (value: number, maxVaule: number, minValue: number) => number;
     setSelectedIndex: Dispatch<SetStateAction<number>>;
     setIsWeekForecast: React.Dispatch<React.SetStateAction<IisWeekForecast>>;
}
const DayChartItem = ({weatherData, index, weatherDataToBarHeight, dataToPercent, minAndMaxWeekData, setSelectedIndex, setIsWeekForecast}: IDayChartItemProps) => {

     const [gradient, setGradient] = useState("");
     const animatedClick = useRef<HTMLDivElement>(null);

     const [marginsTemperature, setMarginsTemperature] = useState({
          marginTop: 0,
          marginBottom: 0
     })

     const refMinTemperature = useRef<HTMLDivElement>(null);

     const precipitarionBarHeight = weatherDataToBarHeight(20, weatherData.daily.precipitation_sum[index]);

     function setMarginBar() {
          const marginB = dataToPercent(Math.trunc(weatherData.daily.temperature_2m_min[index]), Math.trunc(minAndMaxWeekData.maxTemp), Math.trunc(minAndMaxWeekData.minTemp));
          const marginT = dataToPercent(Math.trunc(weatherData.daily.temperature_2m_max[index]), Math.trunc(minAndMaxWeekData.minTemp), Math.trunc(minAndMaxWeekData.maxTemp));


          setMarginsTemperature({
               marginTop: marginT,
               marginBottom: marginB   
          });

     }

     function  scrollHandle() {

          setSelectedIndex(index); 

          animatedClick.current.style.opacity = "1";

          setTimeout(() => {
               setIsWeekForecast({
                    toShow: true,
                    animation: true
               });
            animatedClick.current.style.opacity = "0";
          }, 300);

     }


     useEffect(() => {

          const minDayTemp = weatherData.daily.temperature_2m_min[index];
          const maxDayTemp = weatherData.daily.temperature_2m_max[index];
          const gradient =  setGradientBar(maxDayTemp, minDayTemp);

          setGradient(gradient);
          setMarginBar();
     },[weatherData, minAndMaxWeekData]);     

     return (
          <div className={styles.dayColumnBox} style={{backgroundColor: `${index % 2 == 0 ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 1)"}`}} onClick={scrollHandle}>
               <>
               <div className={styles.columnContent}>
                    <div className={styles.gradientOnClick} ref={animatedClick}></div>
                    <div className={styles.temperature} style={{marginTop: marginsTemperature.marginTop}}>{Math.trunc(weatherData.daily.temperature_2m_max[index])}°</div>
                    <div className={styles.chartBar} style={{backgroundImage: `linear-gradient(to bottom, ${gradient}`}}></div>
                    <div className={styles.temperature} style={{marginBottom: marginsTemperature.marginBottom}} ref={refMinTemperature}>{Math.trunc(weatherData.daily.temperature_2m_min[index])}°</div>               
               </div>

               <div className={styles.precipitarionWrap}>
                     <div className={styles.precipitarionBar} style={{height: precipitarionBarHeight + "%"}}></div>
               </div>
               </>
          </div>
     );
};

export default DayChartItem;