import React, { Dispatch, useEffect, useState } from 'react';
import * as styles from './FavoriteCities.module.scss';
import FavoriteCitiesItem from './FavoriteCitiesItem/FavoriteCitiesItem';
import { favCityArr, favoriteCities } from '@/utils/FavoriteCities';

interface IFavoriteCitiesProps {
     addFavCity: boolean;
     setIsEdit: Dispatch<React.SetStateAction<boolean>>;
     isEdit: boolean;
     setAddFavCity: Dispatch<React.SetStateAction<boolean>>;
}

const FavoriteCities = ({addFavCity, setIsEdit, isEdit,  setAddFavCity}: IFavoriteCitiesProps) => {

     const [favCities, setFavCities] = useState<favCityArr[]>(favoriteCities);

     // useEffect(() => {
     //      setFavCities(favoriteCities);
     //      console.log("hello");
     // }, [favoriteCities]);


     useEffect(() => {
          // if(addFavCity == "") return;

          //  favoriteCities.push({
          //      city: addFavCity,
          //      hours: 13,
          //      minutes: 54,
          //      currentTemp: 20,
          //      background: "/assets/RainNight.jpg"

          // });

          setFavCities([...favoriteCities]);

     }, [addFavCity]);


    const moveItem = (index: number, direction: number) => {
          const newArr = [...favCities];
          const targetIndex = index + direction;

          // проверка чтобы не вылететь за границы
          if (targetIndex < 0 || targetIndex >= favCities.length) return;

          // меняем местами
          [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];

          // setFavCities(newArr);

          favoriteCities.length = 0;
          favoriteCities.push(...newArr);
          setFavCities([...favoriteCities]);
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
                         {favCities.map((cityData, index) => <FavoriteCitiesItem
                         cityData={cityData}
                         key={index}
                         index={index}
                         isEdit={isEdit}
                         moveItem={moveItem}
                         favCities={favCities}
                         setFavCities={setFavCities}
                         setAddFavCity={setAddFavCity} />)}
                    </div>
               </div>
          </div>
     );
};

export default FavoriteCities;