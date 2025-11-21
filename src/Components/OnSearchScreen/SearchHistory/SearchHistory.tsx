import React, { Dispatch, use, useEffect, useState } from 'react';
import * as styles from './SearchHistory.module.scss';
import SearchHistoryItem from './SearchHistoryItem/SearchHistoryItem';
import { WeatherData } from '@/interfaces/weatherData';

interface ISearchHistoryProps {
   setAddFavCity : Dispatch<React.SetStateAction<boolean>>;
   isEdit: boolean;
   weatherData: WeatherData;
   setCity: React.Dispatch<React.SetStateAction<string>>;
   setIsSearch:  React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchHistory = ({setAddFavCity, isEdit, weatherData, setCity, setIsSearch}: ISearchHistoryProps) => {


     const [historyCahce, setHistoryCahce] = useState([]);


     useEffect(() => {
          const handleUpdate = () => {
          const historyList = JSON.parse(localStorage.getItem("historyList") || '[]');
               setHistoryCahce(historyList);
          }


          handleUpdate();


           window.addEventListener("favCitiesUpdated", handleUpdate);
          return () => window.removeEventListener("favCitiesUpdated", handleUpdate);

     }, [weatherData.name]);


     return (
          <div className={styles.container}>
              <div className={styles.content}>

                    <div className={styles.headerWrap}>
                         <img className={styles.headerImg} src='/assets/BtnImages/historyy.png' loading='lazy' alt='История'></img>
                         <div className={styles.headerText}>История поиска</div>
                    </div>

                    <div className={styles.searchHistoryWrap}>
                         {historyCahce.length == 0 && <div className={styles.searchPlaceHolder}>
                              <div className={styles.searchPHText}>Пока пусто.</div>
                              <img src='/assets/OnSearchScreen/black-cat.png' className={styles.searchPHImg}></img>
                         </div>}
                         {historyCahce.map((cityData, index) => <SearchHistoryItem
                              historyCahce={historyCahce}
                              setHistoryCahce={setHistoryCahce}
                              setAddFavCity={setAddFavCity}
                              isEdit={isEdit}
                              key={index}
                              index={index}
                              cityData={cityData}
                              setCity={setCity}
                              setIsSearch={setIsSearch}
                         />)}
                         
                         
                    </div>
              </div>
          </div>
     );
};

export default SearchHistory;