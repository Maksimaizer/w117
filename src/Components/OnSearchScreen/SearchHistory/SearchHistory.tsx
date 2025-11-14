import React, { Dispatch, use, useEffect, useState } from 'react';
import * as styles from './SearchHistory.module.scss';
import { historyArr } from '@/utils/HistoryArr';
import SearchHistoryItem from './SearchHistoryItem/SearchHistoryItem';
import { WeatherData } from '@/interfaces/weatherData';

interface ISearchHistoryProps {
   setAddFavCity : Dispatch<React.SetStateAction<boolean>>;
   isEdit: boolean;
   weatherData: WeatherData;
}

const SearchHistory = ({setAddFavCity, isEdit, weatherData}: ISearchHistoryProps) => {

  //   const [searchHistortArr, setSearchHistoryArr] = useState(historyArr);

     const [historyCahce, setHistoryCahce] = useState([]);


     useEffect(() => {
          const handleUpdate = () => {
          const historyList = JSON.parse(localStorage.getItem("historyList") || '[]');
               console.log(historyList[0]?.city)
               setHistoryCahce(historyList);
          }


          handleUpdate();


           window.addEventListener("favCitiesUpdated", handleUpdate);
          return () => window.removeEventListener("favCitiesUpdated", handleUpdate);

     }, [weatherData.name]);

     // useEffect(() => {
     //      const historyList = JSON.parse(localStorage.getItem("historyList") || '[]');
     //           console.log(historyList[0]?.city)
     //           setHistoryCahce(historyList);

     // }, [weatherData.name]);

     return (
          <div className={styles.container}>
              <div className={styles.content}>

                    <div className={styles.headerWrap}>
                         <img className={styles.headerImg} src='/assets/BtnImages/historyy.png' loading='lazy' alt='История'></img>
                         <div className={styles.headerText}>История поиска</div>
                    </div>

                    <div className={styles.searchHistoryWrap}>
                         {/* <div className={styles.searchHistoryItem}>Моздок</div> */}
                         {historyCahce.length == 0 && <div className={styles.searchPlaceHolder}>
                              <div className={styles.searchPHText}>Пока пусто.</div>
                              <img src='/assets/OnSearchScreen/black-cat.png' className={styles.searchPHImg}></img>
                         </div>}
                         {historyCahce.map((cityData, index) => <SearchHistoryItem historyCahce={historyCahce} setHistoryCahce={setHistoryCahce} setAddFavCity={setAddFavCity} isEdit={isEdit} key={index} index={index} cityData={cityData} />)}
                         {/* {searchHistortArr.map((city, index) => <SearchHistoryItem searchHistortArr={searchHistortArr} setAddFavCity={setAddFavCity} isEdit={isEdit} key={index} index={index} city={city} />)} */}
                         
                    </div>
              </div>
          </div>
     );
};

export default SearchHistory;