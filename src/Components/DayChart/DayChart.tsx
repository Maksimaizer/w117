import React, { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import * as styles from "./DayChart.module.scss";
import DayChartItem from './DayChartItem/DayChartItem';
import SeriesItem from './SeriesItem/SeriesItem';
import ChartButtons from './ChartButtons/ChartButtons';
import WindChartItem from './WindChartItem/WindChartItem';
import PressureChartItem from './PressureChartitem/PressureChartItem';
import { WeatherData } from '@/interfaces/weatherData';
import { IisWeekForecast } from '../App/App';

export type weekData = {
  minTemp: number;
  maxTemp: number;
  maxPressure: number;
  minPressure: number;
}

export type chartBtn = {
  precipitarion: boolean;
  wind: boolean;
  pressure: boolean;
}

interface IDayChartProps {
    days: string[];
    weatherData: WeatherData;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
    setIsWeekForecast: React.Dispatch<React.SetStateAction<IisWeekForecast>>;
}

const DayChart = ({days, weatherData, setSelectedIndex, setIsWeekForecast}: IDayChartProps) => {


  const [btnSelect, setBtnSelect] = useState<chartBtn>({
    precipitarion: true,
    wind: false,
    pressure: false
  })

  
  const [minAndMaxWeekData, setMinAndMaxWeekData] = useState<weekData>({
    minTemp: 0,
    maxTemp: 0,
    maxPressure: 0,
    minPressure: 0,
  });

  useEffect(() => {
    const pressureMax = Math.max(...weatherData.daily.pressure_msl_mean) / 1.333;
    const pressureMin = Math.min(...weatherData.daily.pressure_msl_mean) / 1.333;
        
    setMinAndMaxWeekData({
      minTemp: Math.min(...weatherData.daily.temperature_2m_min),
      maxTemp: Math.max(...weatherData.daily.temperature_2m_max),
      maxPressure: pressureMax,
      minPressure: pressureMin,
    });

  }, [weatherData])

  // конвертируем данные погоды в высоту столбца.
  function weatherDataToBarHeight(maxVaule: number, dataWeather: number): number {
          const percent = (dataWeather / maxVaule) * 100;
          return percent
  }


  function dataToPercent(value: number, maxVaule: number, minValue: number): number {
     if (!Number.isFinite(value) || !Number.isFinite(maxVaule) || !Number.isFinite(minValue)) return 0;
     if (maxVaule === minValue) return 0;
     return ((value - minValue) / (maxVaule - minValue)) * 90;

  }


  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <div className={styles.headerBox}>
          <img src='/assets/BtnImages/FourSquares.png' alt='Header Image' className={styles.headerIcon}></img>
          <div className={styles.headerText}>Ежедневный</div>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chartBarsWrap}>
               {btnSelect.precipitarion && weatherData.daily.temperature_2m_max.map((_, index) => <DayChartItem dataToPercent={dataToPercent} minAndMaxWeekData={minAndMaxWeekData} weatherDataToBarHeight={weatherDataToBarHeight} weatherData={weatherData} setSelectedIndex={setSelectedIndex} setIsWeekForecast={setIsWeekForecast} index={index} key={index} />)}
               {btnSelect.wind && weatherData.daily.temperature_2m_max.map((_, index) => <WindChartItem weatherDataToBarHeight={weatherDataToBarHeight} weatherData={weatherData} index={index} key={index} />)}
               {btnSelect.pressure && weatherData.daily.temperature_2m_max.map((_, index) => <PressureChartItem dataToPercent={dataToPercent} minAndMaxWeekData={minAndMaxWeekData} weatherData={weatherData} index={index} key={index} />)}               
          </div>


            <div className={styles.seriesWrap}>
                {weatherData.daily.temperature_2m_max.map((_, index) => <SeriesItem weatherData={weatherData} days={days} index={index} btnSelect={btnSelect} key={index} />)}
            </div>
        </div>

        <ChartButtons setBtnSelect={setBtnSelect}/>

      </div>
    </div>
  );
};



export default DayChart;