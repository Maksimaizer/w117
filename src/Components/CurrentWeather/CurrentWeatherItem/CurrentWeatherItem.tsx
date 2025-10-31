import React from 'react';
import * as styles from "./CurrentWeatherItem.module.scss";
import { WeatherItem } from '@/utils/FavoriteCities';

interface ICurrentWeatherItemProps {
     weatherData: WeatherItem
}

const CurrentWeatherItem = ({weatherData}: ICurrentWeatherItemProps) => {
     return (
          <div className={styles.wrap}>
               <img className={styles.itemIcon} src={weatherData.icon} alt="icon" />
               <div className={styles.myLabel}>{weatherData.label}</div>
               <div className={styles.valueData}>{weatherData.value}<span>{weatherData.unit}</span></div>
          </div>
     );
};

export default CurrentWeatherItem;