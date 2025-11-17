import React from 'react';
import * as styles from './NextDayItem.module.scss';
import { weekDaysWeather } from '@/utils/FavoriteCities';
import { IfavDayForecast } from '../FavoriteCitiesItem';

interface INextDayitemProps {
     forecastData: IfavDayForecast;
}

const NextDayitem = ({forecastData}: INextDayitemProps) => {


     return (
          <div className={styles.nextDayWrap}>
               <div className={styles.day}>{forecastData.day}</div>
               <img className={styles.nextDayIcon} src={`/assets/svg/${forecastData.icon}.svg`} alt='half moon'></img>
               <div className={styles.temperature}><span>{forecastData.maxTemp}°</span><span className={styles.temperatureMin}>{forecastData.minTemp}°</span></div>
          </div>
     );
};

export default NextDayitem;