import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import * as styles from "./SearchCity.module.scss";
import { WeatherData } from "@/interfaces/weatherData";
import { IisWeekForecast } from "../App/App";

interface ISearchCityProps {
     checkBG: boolean;
     setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
     setIsWeekForecast: React.Dispatch<React.SetStateAction<IisWeekForecast>>;
     weatherData: WeatherData;
     isWeekForecast: IisWeekForecast;
     setSelectedIndex: Dispatch<SetStateAction<number>>;
}


const SearchCity = ({weatherData, checkBG, setIsSearch, isWeekForecast, setIsWeekForecast, setSelectedIndex}: ISearchCityProps) => {


     function searchHandle() {
          setIsSearch(true);
     }

     function weekForecastHandle() {
          setIsWeekForecast({
               toShow: true,
               animation: true
          });
          setSelectedIndex(0);
     }


     return (
          <div className={styles.container} style={{backgroundImage: checkBG ? `url(${weatherData.imgBG.pic})` : "", transform: isWeekForecast.animation ? "translateX(-20%)" : "translateX(0%)"}}>
          <div  className={checkBG ? styles.fadeBg : ""}></div>
               <div className={styles.content}>
                    
                    <div className={styles.cityNameWrap}>
                         {checkBG && <div className={styles.cityName}>{weatherData.name}</div>}
                    </div>

                    <div className={styles.btnsWrap}>
                         <div className={`${styles.btnBox}`} onClick={searchHandle}>
                              <div className={styles.searchImg}></div>
                         </div>

                         <div className={`${styles.btnBox}`} onClick={weekForecastHandle}>
                              <div className={styles.weekBtnImg}></div>
                         </div>
                    </div>
          
               </div>
          </div>
     );
};

export default SearchCity;


