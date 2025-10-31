import React from 'react';
import * as styles from './NextDayitem.module.scss';
import { weekDaysWeather } from '@/utils/FavoriteCities';

interface INextDayitemProps {
     weatherData: weekDaysWeather;
}

const NextDayitem = ({weatherData}: INextDayitemProps) => {


     return (
          <div className={styles.nextDayWrap}>
               <div className={styles.day}>{weatherData.day}</div>
               <img className={styles.nextDayIcon} src={`${weatherData.icon}`} alt='half moon'></img>
               <div className={styles.temperature}><span>{weatherData.tempMax}°</span><span className={styles.temperatureMin}>{weatherData.tempMin}°</span></div>
          </div>
     );
};

export default NextDayitem;