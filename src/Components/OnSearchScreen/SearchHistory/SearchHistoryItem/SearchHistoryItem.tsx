import React, { Dispatch, useEffect, useRef } from 'react';
import * as styles from './SearchHistoryItem.module.scss';
import { favoriteCities } from '@/utils/FavoriteCities';
import { historyArr } from '@/utils/HistoryArr';

interface ISearchHistoryItemProps {
     city: string;
     index: number;
     searchHistortArr: string[];
     setAddFavCity : Dispatch<React.SetStateAction<boolean>>;
     isEdit: boolean;
}

const SearchHistoryItem = ({city, index, searchHistortArr, setAddFavCity, isEdit}: ISearchHistoryItemProps) => {


     function btnFavHandle() {

          if(favoriteCities.find((e) => e.city == city)) {
               historyArr.splice(index, 1);
               setAddFavCity(prev => !prev);
          } else {
               setAddFavCity(prev => !prev);

               favoriteCities.push({
                    city: city,
                    hours: 13,
                    minutes: 54,
                    currentTemp: 20,
                    background: "/assets/RainNight.jpg"
               });

               historyArr.splice(index, 1);
          }
     }

     function btnDelHandle() {
          historyArr.splice(index, 1);
          setAddFavCity(prev => !prev);
     }


     return (
               <div style={{borderBottom: index !== searchHistortArr.length - 1 ? "1px solid rgba(128, 128, 128, 0.2)" : ""}} className={styles.itemWrap}>
                    
                    <div className={styles.tiyleWtap}>
                         <img className={styles.locationImg} src='/assets/OnSearchScreen/location.png' loading='lazy' alt=''></img>
                         {city}
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