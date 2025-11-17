import React, { useEffect, useRef, useState } from 'react';
import * as styles from "./OnSearchScreen.module.scss";
import SearchHistory from './SearchHistory/SearchHistory';
import FavoriteCities from './FavoriteCities/FavoriteCities';
import { historyArr } from '@/utils/HistoryArr';
import { WeatherData } from '@/interfaces/weatherData';


interface IOnSearchScreenProps {
     setIsSearch:  React.Dispatch<React.SetStateAction<boolean>>;
     setCity: React.Dispatch<React.SetStateAction<string>>;
     weatherData: WeatherData;
     setAddFavCity: React.Dispatch<React.SetStateAction<boolean>>; 
     addFavCity: boolean;
}

const OnSearchScreen = ({setIsSearch, setCity, weatherData, addFavCity, setAddFavCity}: IOnSearchScreenProps) => {

     const [value, setValue] = useState('');

     //триггер на добавление города из истории в избранные. 
     // const [addFavCity, setAddFavCity] = useState(false);
     // const [FavDelToggle, setFavDelToggle] = useState(false);

     const [isEdit, setIsEdit] = useState(false);



     function backBtnHandle() {

            setIsSearch(false);
     }

     function normalizeCityName(str: string) {
          if (!str) return "";
          const lower = str.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
     }    

     function submitHandle(e: React.FormEvent<HTMLFormElement>) {
          e.preventDefault();

          if(value.trim().length === 0) return;

          const city = normalizeCityName(value);
          setCity(city);

          setIsSearch(false);

          setValue("");
}

     // useEffect(() => {
     //      if(!weatherData.name) return;

     //      localStorage.setItem("cityCache", JSON.stringify(weatherData.name));

     //      const historyList = JSON.parse(localStorage.getItem("historyList") || '[]');
     //      const existingCity = historyList.find((item: any) => item.city === weatherData.name);
     //      if(!existingCity) {
     //           historyList.push({
     //                city: weatherData.name,
     //                temprerature: 0,
     //                date: 0,
     //                timeZone: 0,
     //                backgroundImg: "",
     //                forecast: [
     //                     {maxTemp: 0, minTemp: 0},
     //                     {maxTemp: 0, minTemp: 0}
     //                ]
     //           })
     //      }

     //   //   if(!historyArr.includes(value)) historyArr.push(value);
     //      localStorage.setItem("historyList", JSON.stringify(historyList));

     // }, [weatherData.name]);

     return (
          <div className={styles.container}>
               <div className={styles.content}>
                    
                    <div className={styles.formWrap}>
                         
                         <div className={styles.backBtn} onClick={backBtnHandle}>
                              <img className={styles.backBtnImg} src='/assets/BtnImages/back.png' loading='lazy' alt='back'></img>
                         </div>

                         <form className={styles.myForm} onSubmit={submitHandle}>
                              <input className={styles.myInput} value={value} onChange={(e) => setValue(e.target.value)} placeholder='Поиск по городам'></input>
                         </form>
                    </div>


                    <FavoriteCities addFavCity={addFavCity} setIsEdit={setIsEdit} isEdit={isEdit} setAddFavCity={setAddFavCity} setIsSearch={setIsSearch} setCity={setCity}/>

                    <SearchHistory setAddFavCity={setAddFavCity} isEdit={isEdit} weatherData={weatherData} setCity={setCity} setIsSearch={setIsSearch}/>
               </div>
          </div>
     );
};

export default OnSearchScreen;