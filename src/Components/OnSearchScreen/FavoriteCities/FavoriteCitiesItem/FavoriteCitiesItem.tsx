import React, { Dispatch, useEffect, useRef,  useState } from 'react';
import * as styles from './FavoriteCitiesItem.module.scss';
import NextDayitem from './NextDayItem/NextDayitem';
import { IfavCities } from '@/data/getWeatherFavList';


interface IFavoriteCitiesItemProps {
     cityData: IfavCities;
     isEdit: boolean;
     index: number;
     moveItem: (index: number, direction: number) => void;
     favCitiesCahce: IfavCities[];
     setIsSearch:  React.Dispatch<React.SetStateAction<boolean>>;
     setAddFavCity: Dispatch<React.SetStateAction<boolean>>;
     setCity: React.Dispatch<React.SetStateAction<string>>;
}


export interface IfavDayForecast {
     minTemp: number;
     maxTemp: number;
     icon: string;
     day: string;
}

const FavoriteCitiesItem = ({cityData, isEdit, index, setAddFavCity, moveItem, favCitiesCahce, setIsSearch, setCity}: IFavoriteCitiesItemProps) => {

     const firstBtn = index == 0;
     const lastBtn = favCitiesCahce.length - 1 == index;
     
     const [time, setTime] = useState<string>("");


     function itemClickHanlde() {
          if(!isEdit) {
               setCity(cityData.city);
               setIsSearch(false);
               localStorage.setItem("fromFav", JSON.stringify(true));
          }
     }

     function btnSortHandle(e: React.MouseEvent<HTMLButtonElement>) {
          const direction = +e.currentTarget.dataset.direction;
          moveItem(index, direction);
     }


     function deleteBtnHandle() {
          
          const favoriteCityArr = JSON.parse(localStorage.getItem("favCitiesList") || "[]");
          const historyList = JSON.parse(localStorage.getItem("historyList") || '[]');
          const updated = favoriteCityArr.filter((_: any, i: number) => i !== index);

               const existingCity = historyList.find((item: any) => item.city === cityData.city);
               if(!existingCity) {
                    historyList.push({
                         city: cityData.city,
                         temperature: 0,
                         date: 0,
                         timezone: 0,
                         backgroundImg: "",
                         currentIcon: "clear-day",
                         forecast: [
                              {maxTemp: 0, minTemp: 0, icon: "clear-day", day: ""},
                              {maxTemp: 0, minTemp: 0, icon: "clear-day", day: ""}
                         ]
                    })
               }
     
          localStorage.setItem("historyList", JSON.stringify(historyList));

          localStorage.setItem("favCitiesList", JSON.stringify(updated));

          window.dispatchEvent(new Event("favCitiesUpdated"));

          setAddFavCity(prev => !prev);
     
     }

          useEffect(() => {
               if (cityData.timezone == 0) return;
     
               const updateTime = () => {
                    const nowUTC = Date.now();
                    const localDate = new Date(nowUTC + cityData.timezone * 1000);
     
                    const formatter = new Intl.DateTimeFormat("ru-RU", {
                         hour: "2-digit",  
                         minute: "2-digit", 
                         timeZone: "UTC"    
                    });
                    
                    const formatted = formatter.format(localDate);
     
                    setTime(formatted);
               };
     
               updateTime();
     
               const interval = setInterval(updateTime, 1000);
     
         // очистка таймера при размонтировании / смене города
                return () => clearInterval(interval);
     
          }, [cityData.timezone]);


     return (
          <>
          {!isEdit && 
          <div className={styles.container} style={{backgroundImage: `url(${cityData.backgroundImg})`}} onClick={itemClickHanlde}>
               <div className={styles.fade}></div>
               <div className={styles.content}>
               
                    <div className={styles.titleWrap}>
                         <div className={styles.cityBox}>
                              <img className={styles.titleIcon} src='/assets/BtnImages/whiteStar.png' alt='white star'></img>
                              <div className={styles.city}>{cityData.city}</div>
                         </div>
                         <div>{time}</div>
                    </div>

                    <div className={styles.weatherDataWrap}>

                         <div className={styles.currentTempWrap}>
                              <img className={styles.currentWeatherIcon} src={`/assets/svg/${cityData.currentIcon}.svg`} alt='half moon'></img>
                              <div className={styles.currentTemp}>{cityData.temperature}°</div>
                         </div>

                         <div className={styles.nextDaysWrap}>
                              {cityData.forecast.map((forecastData, index)=> <NextDayitem key={index} forecastData={forecastData}/>)}
                         </div>
                    </div>
                           

               </div>
          </div>}
          {isEdit &&
          <div className={styles.editContainer}>
               <div className={styles.editCityText}>{cityData.city}</div>

               <div className={styles.editBtnsWrap}>
                    <button className={styles.deleteBtn} onClick={deleteBtnHandle}>
                         <img className={styles.deleteBtnIcon} src='/assets/OnSearchScreen/bin.png' alt='deleteIcon'></img>
                    </button>
                    <div className={styles.sortBtnsWrap}>
                         <button className={styles.sortBtn} style={{opacity: `${lastBtn ? 0.5 : 1}`, marginLeft: 3 + "vmin"}} data-direction={1} onClick={btnSortHandle}>
                              <img className={styles.sortBtnIcon} style={{transform: "rotate(90deg)"}} src='/assets/OnSearchScreen/arrowSort.png' alt='sortUpButton'></img>
                         </button>

                         <button className={styles.sortBtn} style={{opacity: `${firstBtn ? 0.5 : 1}`}} data-direction={-1} onClick={btnSortHandle}>
                              <img className={styles.sortBtnIcon} style={{transform: "rotate(-90deg)"}} src='/assets/OnSearchScreen/arrowSort.png' alt='sortDownButton'></img>
                         </button>
                    </div>
               </div>
          </div>}
          </>
     );
};

export default FavoriteCitiesItem;