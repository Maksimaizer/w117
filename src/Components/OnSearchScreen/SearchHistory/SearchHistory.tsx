import React, { Dispatch, use, useEffect, useState } from 'react';
import * as styles from './SearchHistory.module.scss';
import { historyArr } from '@/utils/HistoryArr';
import SearchHistoryItem from './SearchHistoryItem/SearchHistoryItem';

interface ISearchHistoryProps {
   setAddFavCity : Dispatch<React.SetStateAction<boolean>>;
   isEdit: boolean;
}

const SearchHistory = ({setAddFavCity, isEdit}: ISearchHistoryProps) => {

     const [searchHistortArr, setSearchHistoryArr] = useState(historyArr);


     // useEffect(() => {
     //      setSearchHistoryArr(historyArr);
     // }, [searchHistortArr]);


     return (
          <div className={styles.container}>
              <div className={styles.content}>

                    <div className={styles.headerWrap}>
                         <img className={styles.headerImg} src='/assets/BtnImages/historyy.png' loading='lazy' alt='История'></img>
                         <div className={styles.headerText}>История поиска</div>
                    </div>

                    <div className={styles.searchHistoryWrap}>
                         {/* <div className={styles.searchHistoryItem}>Моздок</div> */}
                         {searchHistortArr.map((city, index) => <SearchHistoryItem searchHistortArr={searchHistortArr} setAddFavCity={setAddFavCity} isEdit={isEdit} key={index} index={index} city={city} />)}
                         
                    </div>
              </div>
          </div>
     );
};

export default SearchHistory;