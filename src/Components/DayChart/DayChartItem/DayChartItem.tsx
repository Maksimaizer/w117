import React, { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import * as styles from "./DayChartItem.module.scss";
import { weekDaysChart } from '@/utils/FavoriteCities';
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

     const [minBarHeight, setMinBarHeight] = useState(0);
     const [precipitarionHeightMin, setPrecipitarionHeightMin] = useState(0);
     const [gradient, setGradient] = useState("");
     const animatedClick = useRef<HTMLDivElement>(null);

     const [marginsTemperature, setMarginsTemperature] = useState({
          marginTop: 0,
          marginBottom: 0
     })

     const refMinTemperature = useRef<HTMLDivElement>(null);

     const precipitarionBarHeight = weatherDataToBarHeight(20, weatherData.daily.precipitation_sum[index]);


     // function tempToPercent(temp: number): number {
     //      const maxTemp = minAndMaxWeekData.maxTemp;
     //      const minTemp = minAndMaxWeekData.minTemp;
     // if (maxTemp === minTemp) return 0;
     // return ((temp - minTemp) / (maxTemp - minTemp)) * 90;

     // }
     
     // function setYellowBarHeight() {
     //      const minPercent = dataToPercent(weatherData.daily.temperature_2m_min[index], minAndMaxWeekData.maxTemp, minAndMaxWeekData.minTemp); // позиция нижней границы
     //      const maxPercent = dataToPercent(weatherData.daily.temperature_2m_max[index], minAndMaxWeekData.maxTemp, minAndMaxWeekData.minTemp); // позиция верхней границы          
     //      const barHeight = maxPercent - minPercent; // высота шкалы

     //      if(minPercent !== maxPercent) {
 
     //           setMinBarHeight(barHeight);

     //      } else {
     //           setMinBarHeight(5);
     //      }
     // }

     function setMarginBar() {
          const marginB = dataToPercent(Math.trunc(weatherData.daily.temperature_2m_min[index]), Math.trunc(minAndMaxWeekData.maxTemp), Math.trunc(minAndMaxWeekData.minTemp));
          const marginT = dataToPercent(Math.trunc(weatherData.daily.temperature_2m_max[index]), Math.trunc(minAndMaxWeekData.minTemp), Math.trunc(minAndMaxWeekData.maxTemp));


          setMarginsTemperature({
               marginTop: marginT,
               marginBottom: marginB   
          });

        //  refMinTemperature.current.style.marginBottom = minMargin + "%";

     }




     // function precipitationToPercent() {
     //      // const maxMm: number = 20;
     //      const percent = (weatherData.precipitarion / maxMm) * 100;
     //      setPrecipitarionHeightMin(Math.min(percent, 100)); // обрезаем сверху
     // }

     // function setGradientForBar() {

     //      const minDayTemp = weatherData.daily.temperature_2m_min[index];
     //      const maxDayTemp = weatherData.daily.temperature_2m_max[index];


     //     switch(true) {
     //          case maxDayTemp && minDayTemp >= 10: return setGradient("rgba(219, 161, 5, 1), rgba(255, 204, 0, 1)");
     //          case maxDayTemp < 10 && minDayTemp > 0: return setGradient("rgba(219, 161, 5, 1), rgba(255, 215, 105, 1)");
     //          case maxDayTemp <= 10 && minDayTemp > 0: return setGradient("rgba(255, 215, 105, 1), rgba(255, 251, 234, 1)");
     //          case maxDayTemp <= 0 && minDayTemp >= -10: return setGradient("rgba(222, 237, 252, 1), rgba(89, 191, 255, 1)");
     //          case maxDayTemp && minDayTemp < -10: return setGradient("rgba(132, 193, 255, 1), rgba(4, 135, 222, 1)");
     //   }

     // }

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
     //if (!weatherData?.timezone) return;
        //  setYellowBarHeight();
          const minDayTemp = weatherData.daily.temperature_2m_min[index];
          const maxDayTemp = weatherData.daily.temperature_2m_max[index];
          const gradient =  setGradientBar(maxDayTemp, minDayTemp);
        //  console.log(gradient);
          setGradient(gradient);
        //  setGradientForBar();
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