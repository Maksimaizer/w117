import React, { Dispatch, useEffect, useState } from 'react';
import * as styles from './FavoriteCities.module.scss';
import FavoriteCitiesItem from './FavoriteCitiesItem/FavoriteCitiesItem';
import { IfavCities } from '@/data/getWeatherFavList';

interface IFavoriteCitiesProps {
     addFavCity: boolean;
     setIsEdit: Dispatch<React.SetStateAction<boolean>>;
     isEdit: boolean;
     setAddFavCity: Dispatch<React.SetStateAction<boolean>>;
     setIsSearch:  React.Dispatch<React.SetStateAction<boolean>>;
     setCity: React.Dispatch<React.SetStateAction<string>>;
}


const FavoriteCities = ({addFavCity, setIsEdit, isEdit,  setAddFavCity, setIsSearch, setCity}: IFavoriteCitiesProps) => {


    const [favCitiesCahce, setFavCitiesCahce] = useState<IfavCities[]>([{
                         city: "",
                         temperature: 0,
                         date: 0,
                         timezone: 0,
                         backgroundImg: "",
                         currentIcon: "clear-day",
                         forecast: [
                              {maxTemp: 0, minTemp: 0, icon: "clear-day", day: ""},
                              {maxTemp: 0, minTemp: 0, icon: "clear-day", day: ""},
                         ]
                    }]);


     useEffect(() => {
          const handleUpdate = () => {
               const updated = JSON.parse(localStorage.getItem("favCitiesList") || "[]");
               setFavCitiesCahce(updated);
          };

          handleUpdate()

          window.addEventListener("favCitiesUpdated", handleUpdate);
          return () => window.removeEventListener("favCitiesUpdated", handleUpdate);
     }, [addFavCity]);


    const moveItem = (index: number, direction: number) => {
          const newArr = [...favCitiesCahce];
          const targetIndex = index + direction;

          // проверка чтобы не вылететь за границы
          if (targetIndex < 0 || targetIndex >= favCitiesCahce.length) return;

          // меняем местами
          [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];

          localStorage.setItem("favCitiesList", JSON.stringify(newArr));
          setFavCitiesCahce([...newArr]);

          window.dispatchEvent(new Event("favCitiesUpdated"));
     };



     function editBtnHandle() {
          setIsEdit(prev => !prev);
     }

     return (
          <div className={styles.container}>
               <div className={styles.content}>

                    <div className={styles.headerWrap}>

                         <div className={styles.headerTitleWrap}>
                              <img className={styles.headerImg} src='/assets/BtnImages/favorite.png' alt=''></img>
                              <div className={styles.headerText}>Избранные города</div>
                         </div>

                         <button className={styles.editBtn} onClick={editBtnHandle}>
                              <img className={styles.editBtnImg} src={`/assets/OnSearchScreen/${isEdit ? "x" : "edit"}.png`} alt=''></img>
                         </button>
                    </div>


                    <div className={styles.favoriteCitiesWrap}>

                         {favCitiesCahce.length == 0 && <div className={styles.favCitiesPlaceHolder}>
                              <div className={styles.favCitiesPHText}>Пока ничего нет.</div>
                              <img src="/assets/OnSearchScreen/dog.png" className={styles.favCitiesPHImg}></img>
                         </div>}

                         {favCitiesCahce.map((cityData, index) => <FavoriteCitiesItem
                              cityData={cityData}
                              key={cityData.city}
                              index={index}
                              isEdit={isEdit}
                              moveItem={moveItem}
                              favCitiesCahce={favCitiesCahce}
                              setIsSearch={setIsSearch}
                              setAddFavCity={setAddFavCity}
                              setCity={setCity}
                         />)}
                    </div>
               </div>
          </div>
     );
};

export default FavoriteCities;