import React, { Dispatch, SetStateAction, useState } from 'react';
import * as styles from "./ChartButtons.module.scss";
import { chartBtn } from '../DayChart';

interface IChartButtonsProps {
  setBtnSelect: React.Dispatch<React.SetStateAction<chartBtn>>
}

const buttons: { key: keyof chartBtn; label: string, textSpan: string }[] = [
  { key: "precipitarion", label: "Осадки", textSpan: " мм" },
  { key: "wind", label: "Ветер", textSpan: " м/с" },
  { key: "pressure", label: "Давление", textSpan: " mmHg" },
];

const ChartButtons = ({setBtnSelect}: IChartButtonsProps) => {

     const [selectedBtn, setSelectedBtn] = useState("precipitarion");

     function selectBtn(key: keyof chartBtn) {
          setBtnSelect({
          precipitarion: false,
          wind: false,
          pressure: false,
          [key]: true,
          });
     }

     function btnHandle(e: React.MouseEvent<HTMLButtonElement>) {
          const title = e.currentTarget.dataset.title as keyof chartBtn;


          selectBtn(title);
          setSelectedBtn(title);
     }


     return (
          <div className={styles.container}>
               <div className={styles.contentWrap}>

                    {buttons.map(({key, label, textSpan}) => (
                         <button 
                              className={`${styles.btnChart} ${key === selectedBtn ? styles.selectedBtn : ""}`}
                              onClick={btnHandle}
                              data-title={key}
                              key={key}
                         >
                              {label}
                              <span>{textSpan}</span> 
                         </button>
                    ))}
               </div>
          </div>
     );
};

export default ChartButtons;