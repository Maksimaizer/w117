import React, { Dispatch, useEffect,  useLayoutEffect,  useRef,  useState } from 'react';
import * as styles from './FavoriteCitiesItem.module.scss';
import NextDayitem from './NextDayItem/NextDayitem';
import { favCityArr, favoriteCities, weekDaysWeather, weekDaysWeatherArr } from '@/utils/FavoriteCities';
import { historyArr } from '@/utils/HistoryArr';


interface IFavoriteCitiesItemProps {
     cityData: favCityArr;
     isEdit: boolean;
     index: number;
     moveItem: (index: number, direction: number) => void;
     favCities: favCityArr[];
     setFavCities: Dispatch<React.SetStateAction<favCityArr[]>>;
     setAddFavCity: Dispatch<React.SetStateAction<boolean>>;
}

const FavoriteCitiesItem = ({cityData, isEdit, index, moveItem, favCities, setFavCities, setAddFavCity}: IFavoriteCitiesItemProps) => {

     // в JSX ставим opacity на кнопки сортировки 
     const firstBtn = index == 0;
     const lastBtn = favCities.length - 1 == index;
     
     const [nextDaysArr, setNextDaysArr] = useState<weekDaysWeather[]>(weekDaysWeatherArr);

     function btnSortHandle(e: React.MouseEvent<HTMLButtonElement>) {

     const direction = +e.currentTarget.dataset.direction;

     moveItem(index, direction);

     }

     function deleteBtnHandle() {
          favoriteCities.splice(index, 1);
          
         if(!historyArr.includes(cityData.city)) historyArr.push(cityData.city);


          setFavCities([...favoriteCities]);
          setAddFavCity(prev => !prev);
     }


     return (
          <>
          {!isEdit && 
          <div className={styles.container} style={{backgroundImage: `url(${cityData.background})`}}>
               <div className={styles.content}>
               
                    <div className={styles.titleWrap}>
                         <div className={styles.cityBox}>
                              <img className={styles.titleIcon} src='/assets/BtnImages/whiteStar.png' alt='white star'></img>
                              <div className={styles.city}>{cityData.city}</div>
                         </div>
                         <div>{cityData.hours + ":" + cityData.minutes}</div>
                    </div>

                    <div className={styles.weatherDataWrap}>

                         <div className={styles.currentTempWrap}>
                              <img className={styles.currentWeatherIcon} src="/assets/BtnImages/half-moon.png" alt='half moon'></img>
                              <div className={styles.currentTemp}>{cityData.currentTemp}°</div>
                         </div>

                         <div className={styles.nextDaysWrap}>
                              {nextDaysArr.map((weatherData, index)=> <NextDayitem key={index} weatherData={weatherData}/>)}
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