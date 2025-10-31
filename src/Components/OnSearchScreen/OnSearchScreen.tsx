import React, { useRef, useState } from 'react';
import * as styles from "./OnSearchScreen.module.scss";
import SearchHistory from './SearchHistory/SearchHistory';
import FavoriteCities from '../FavoriteCities/FavoriteCities';
import { historyArr } from '@/utils/HistoryArr';


interface IOnSearchScreenProps {
     setIsSearch:  React.Dispatch<React.SetStateAction<boolean>>;
     setCity: React.Dispatch<React.SetStateAction<string>>;
}

const OnSearchScreen = ({setIsSearch, setCity}: IOnSearchScreenProps) => {

     const [value, setValue] = useState('');

     //триггер на добавление города из истории в избранные. 
     const [addFavCity, setAddFavCity] = useState(false);
     // const [FavDelToggle, setFavDelToggle] = useState(false);

     const [isEdit, setIsEdit] = useState(false);


     function backBtnHandle() {

            setIsSearch(false);
     }

     function submitHandle(e: React.FormEvent<HTMLFormElement>) {
          e.preventDefault();

          if(value.trim().length === 0) return;

          const city = value.toLowerCase()

          localStorage.setItem("cityCache", JSON.stringify(city));
          setCity(city);
          if(!historyArr.includes(value)) historyArr.push(value);

          setIsSearch(false);

          setValue("");
     }

     return (
          <div className={styles.container}>
               <div className={styles.content}>
                    
                    <div className={styles.formWrap}>
                         
                         <div className={styles.backBtn} onClick={backBtnHandle}>
                              <img className={styles.backBtnImg} src='/assets/BtnImages/back.png' loading='lazy' alt='back'></img>
                         </div>

                         <form className={styles.myForm} onSubmit={submitHandle}>
                              <input value={value} onChange={(e) => setValue(e.target.value)} className={styles.myInput} placeholder='Поиск по городам'></input>
                         </form>
                    </div>


                    <FavoriteCities addFavCity={addFavCity} setIsEdit={setIsEdit} isEdit={isEdit} setAddFavCity={setAddFavCity}/>

                    <SearchHistory setAddFavCity={setAddFavCity} isEdit={isEdit}/>
               </div>
          </div>
     );
};

export default OnSearchScreen;