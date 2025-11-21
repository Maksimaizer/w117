import React, { useState } from 'react';
import * as styles from "./CurrentWeather.module.scss";
import { currentWeatherDataArr, WeatherItem } from '@/utils/FavoriteCities';
import CurrentWeatherItem from './CurrentWeatherItem/CurrentWeatherItem';
import { WeatherData } from '@/interfaces/weatherData';
import { useCurrentWeather } from '@/hooks/useCurrentWeather';

interface ICurrentWeatherProps {
     weatherData: WeatherData;
}

const CurrentWeather = ({weatherData}: ICurrentWeatherProps) => {

     const {currentWeatherData} = useCurrentWeather(weatherData);

     return (
          <div className={styles.container}>

               <div className={styles.TitleWrap}>
                    <img className={styles.titleIcon} src="/assets/BtnImages/Clock.png" alt="clock"/>
                    <div className={styles.titleText}>Текущая погода</div>
               </div>


               <div className={styles.currentWeatherWrap}>
                    {currentWeatherData.map((weatherData, index) => <CurrentWeatherItem weatherData={weatherData} key={index} />)}
               </div>
               
          </div>
     );
};

export default CurrentWeather;