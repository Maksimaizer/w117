import React, { useEffect, useState } from 'react';
import * as styles from './MyHeader.module.scss';
import { WeatherData } from '@/interfaces/weatherData';
import { getWeatherDescr, getWeatherIconSvg } from '@/utils/GetWeatherIcons';

interface IMyHeaderProps {
     headerRef: React.RefObject<HTMLDivElement>;
     weatherData: WeatherData;
}



// src={'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'} alt=''
//weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)

const MyHeader = ({headerRef, weatherData}: IMyHeaderProps) => {

     const [icon, setIcon] = useState("/assets/svg/clear-day.svg");
     const [description, setDescription] = useState("");

     const [bgImg, setBgImg] = useState("");


     useEffect(() => {
          const cacheKey = "HeaderImg";
          const cacheData = localStorage.getItem(cacheKey);

          if(cacheData && !weatherData.timezone) {
               const parsedPic = JSON.parse(cacheData);
               setBgImg(parsedPic)
          }
       
       
       if(weatherData.timezone) {
          localStorage.setItem(cacheKey, 
          JSON.stringify(weatherData.imgBG.pic)
          )
          setBgImg(weatherData.imgBG.pic);
          const getIcon = getWeatherIconSvg(weatherData.current.weather_code, weatherData.current.time);
          const getDescr = getWeatherDescr(weatherData.current.weather_code);

          setIcon(getIcon);
          setDescription(getDescr);

          console.log(weatherData.daily.weather_code[3]);
     }

     }, [weatherData]);

     // useEffect(() => {
     //      const cacheKey = "HeaderImg";
     //      const cacheData = localStorage.getItem(cacheKey);

     //      if(cacheData && !weatherData.timezone) {
     //           const parsedPic = JSON.parse(cacheData);
     //           setBgImg(parsedPic)
     //      }

     //      if(weatherData.timezone) {
     //           localStorage.setItem(cacheKey, 
     //           JSON.stringify(weatherData.imgBG.pic)
     //           )
     //           setBgImg(weatherData.imgBG.pic);
     //      }


     // }, [weatherData.timezone])


     return (
          <div ref={headerRef}  className={styles.container} style={{backgroundImage: `url(${bgImg})`}}>
               {weatherData.timezone && <div className={styles.content}>

                    <div className={styles.weatherBox}>
                         <div className={styles.currentTemp}>{Math.trunc(weatherData.current.temperature_2m)}<span>°C</span></div>
                         <div className={styles.currentWeatherWrap}>
                              <img className={styles.weatherIcon} src={`/assets/svg/${icon}.svg`} loading='lazy' alt=""></img>
                              <div className={styles.currentWeather}>{description}</div>
                         </div>
                         <div className={styles.cityWrap}>
                              <div className={styles.city}>{weatherData.name}</div>
                              <div className={styles.photoOwner}>@{weatherData.imgBG.username}</div>
                         </div>
                    </div>
               </div>}
          </div>
     );
};

export default MyHeader;