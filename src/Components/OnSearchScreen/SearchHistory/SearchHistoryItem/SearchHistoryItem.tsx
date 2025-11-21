import React, { Dispatch, useEffect, useRef } from 'react';
import * as styles from './SearchHistoryItem.module.scss';
import { getWeatherForFavoriteList } from '@/data/getWeatherFavList';

interface ISearchHistoryItemProps {
     cityData: any;
     index: number;
     historyCahce: string[];
     setHistoryCahce: Dispatch<React.SetStateAction<string[]>>;
     setAddFavCity : Dispatch<React.SetStateAction<boolean>>;
     isEdit: boolean;
     setCity: React.Dispatch<React.SetStateAction<string>>;
     setIsSearch:  React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchHistoryItem = ({cityData, index, historyCahce, setHistoryCahce, isEdit, setAddFavCity, setCity, setIsSearch}: ISearchHistoryItemProps) => {

     function itemClickHandle() {

         if(!isEdit) {
          setCity(cityData.city);
          setIsSearch(false)
         }
     }

     function btnFavHandle(e: React.MouseEvent<HTMLButtonElement>) {
          
          e.stopPropagation();

          const favoriteCityArr = JSON.parse(localStorage.getItem("favCitiesList") || "[]");

          if(favoriteCityArr.length >= 5) return;

          const existingCity = favoriteCityArr.find((item: any) => item.city === cityData.city);
          if(!existingCity) {

               favoriteCityArr.push({
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
                    });
               localStorage.setItem("favCitiesList", JSON.stringify(favoriteCityArr));
               getWeatherForFavoriteList();
               btnDelHandle();
               setAddFavCity(prev => !prev);

          }

     }

     function btnDelHandle() {
          const historyArr = JSON.parse(localStorage.getItem("historyList") || '[]');

          const updated = historyArr.filter((_: any, i: number) => i !== index); 


          localStorage.setItem("historyList", JSON.stringify(updated));
          setHistoryCahce(updated);
     }


     return (
               <div style={{borderBottom: index !== historyCahce.length - 1 ? "1px solid rgba(128, 128, 128, 0.2)" : ""}} className={styles.itemWrap} onClick={itemClickHandle}>
                    
                    <div className={styles.tiyleWtap}>
                         <img className={styles.locationImg} src='/assets/OnSearchScreen/location.png' loading='lazy' alt=''></img>
                         {cityData.city}
                    </div>
                    
                    <div className={styles.btnsWrap}>
                         {isEdit && <button className={styles.delBtn} onClick={btnDelHandle}>
                              <img className={styles.btnImg} src='/assets/OnSearchScreen/bin.png' loading='lazy' alt='Add to Favorite'></img>
                         </button>}
                         <button className={styles.starBut} onClick={btnFavHandle}>
                              <img className={styles.btnImg} src='/assets/OnSearchScreen/starLight.png' loading='lazy' alt='Add to Favorite'></img>
                         </button>
                    </div>
               </div>
     );
};

export default SearchHistoryItem;