import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router';
import * as styles from './App.module.scss';
import "./globalStyle.scss"
import SearchCity from '../SearchCity/SearchCity';
import MyHeader from '../Header/MyHeader';
import { usePapallax } from '@/hooks/useParallax';
import DayWeather from '../DayWeather/DayWeather';
import OnSearchScreen from '../OnSearchScreen/OnSearchScreen';
import HourChart from '../HourChart/HourChart';
import DayChart from '../DayChart/DayChart';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import WeekForecast from '../WeekForecast/WeekForecast';
import { useWeatherData } from '@/hooks/useWeatherData';
import { getWeatherData } from '@/data/getWeatherData';
import { useForecastLabels } from '@/hooks/useForecastLabels';

export interface IisWeekForecast {
     toShow: boolean;
     animation: boolean;
}

const App = () => {

     const {containerRef, headerRef, handleScroll, checkBG} = usePapallax();
     const [isSearch, setIsSearch] = useState(false);
     const [isWeekForecast, setIsWeekForecast] = useState<IisWeekForecast>({
          toShow: false,
          animation: false
     });

     const {weatherData, setWeatherData} = useWeatherData();
     const [city, setCity] = useState("");

     const {hours, days, currentTime} = useForecastLabels(weatherData.dt, weatherData.timezone);

     const [selectedIndex, setSelectedIndex] = useState(0);


     useEffect(() => {
          const cachedCity = localStorage.getItem("cityCache");
          const parsedCity = JSON.parse(cachedCity);

          if(cachedCity) setCity(parsedCity);
          else setCity("Моздок");
     }, [])




     useEffect(() => {
         if(!city) return;
          getWeatherData(setWeatherData, city);
     }, [city]);



     return (
          <div className={styles.container}>
               <SearchCity weatherData={weatherData} checkBG={checkBG} setIsSearch={setIsSearch} isWeekForecast={isWeekForecast} setIsWeekForecast={setIsWeekForecast} setSelectedIndex={setSelectedIndex}/>
               
               <div className={styles.content} ref={containerRef } onScroll={handleScroll} style={{transform: isWeekForecast.animation ? "translateX(-20%)" : "translateX(0%)"}}>
                    <MyHeader headerRef={headerRef} weatherData={weatherData}/>
                    <div className={styles.contentWrap}>
                         <DayWeather weatherData={weatherData}/>
                         <HourChart hours={hours} weatherData={weatherData}/>
                         <DayChart days={days} weatherData={weatherData} setSelectedIndex={setSelectedIndex} setIsWeekForecast={setIsWeekForecast}/>
                         <CurrentWeather weatherData={weatherData}/>          
                    </div>
               </div>

               {isSearch && <OnSearchScreen setIsSearch={setIsSearch} setCity={setCity}/>}
               {isWeekForecast.toShow && <WeekForecast isWeekForecast={isWeekForecast} setIsWeekForecast={setIsWeekForecast} weatherData={weatherData} days={days} selectedIndex={selectedIndex}/>}
               
          </div>
     );
};

export default App;


