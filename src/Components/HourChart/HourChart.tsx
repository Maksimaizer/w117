import React, { useEffect, useState } from 'react';
import * as styles from "./HourChart.module.scss";


import Highcharts, { chart, color, offset } from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { WeatherData } from '@/interfaces/weatherData';
import { getWeatherIconSvg } from '@/utils/GetWeatherIcons';

interface IHourChartProps {
     hours: string[];
     weatherData: WeatherData;
}


const HourChart = ({hours, weatherData}: IHourChartProps) => {

     const padding = 5;
     const timeOffset = +hours[0].slice(0, 2);
     const maxValue = Math.max(...weatherData.hourly.temperature_2m.slice(timeOffset,timeOffset + 12)) + padding;
     const minValue = Math.min(...weatherData.hourly.temperature_2m.slice(timeOffset,timeOffset + 12)) - padding;

     const [hourIcons, setHourIcons] = useState([]);


     useEffect(() => {
          let icon = ""
          const iconsArr = [];

          for(let i = 0; i <= 11; i++) {

               icon = getWeatherIconSvg(weatherData.hourly.weather_code[timeOffset + i], weatherData.hourly.time[timeOffset + i]); 
               iconsArr.push(icon);
          }          

         setHourIcons(iconsArr);
     }, [weatherData]);

     const options = {
  
               chart: {
                    type: "area",
                    plotBackgroundColor: 'black',
                    backgroundColor: "black",
                    spacing: 0,
                    height: 300,
                     scrollablePlotArea: {
                         minWidth: 960,  // ширина plot area, при которой появится скролл
                         scrollPositionX: 0
                    },
                    
               },
               legend: {
                    enabled: false
               },
               plotOptions: {
                    area: {
                    threshold: null as any,
                    column: {
                         pointWidth: 60,
                    },
                    fillColor: {
                         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                         [0, 'rgba(255, 165, 0, 0.5)'],
                         [1, 'rgba(255, 165, 0, 0)'] 
                    ]
                    },
                    fillOpacity: 0.75, 

                    dataLabels: {
                         enabled: true,
                         format: `{y}°`,
                         style: {
                              color: 'white',
                              fontSize: '20px',
                              fontWeight: "100",
                              textOutline: false
                         }
                    },
                     enableMouseTracking: false
                    },
               },
               xAxis: {
                    
                    alternateGridColor: "rgba(255, 255, 255, 0.1)",
                    categories: hours, // время под графиком.
                    min: 0,      // откуда показывать
                    max: 11,      // сколько категорий видно
                    labels: {
                         style: {
                              color: "white",        // делаем подписи белыми
                              fontSize: "14px"
                         },
                    useHTML: true, // обязательно для вставки <img>
                    formatter: function () {
                         return `
                         <div style="display:flex;flex-direction:column;align-items:center;justify-content: center;">
                              <img src=${hourIcons.length == 0 ? "/assets/svg/clear-day.svg" : `/assets/svg/${hourIcons[this.pos]}.svg`} loading='lazy' style="margin-top: -10px" width="45" height="45"/>
                              <span style="color:white; margin-top: -5px">${this.value}</span>
                         </div>
                         `;
                    }
                    }
               },
               yAxis: {
                    visible: false,
                    max: maxValue,
                    min: minValue
               },
               credits: {
                    enabled: false
               }, 
               title: {
               text: '',
               },
               series: [{
               data: weatherData.hourly.temperature_2m.slice(+hours[0].slice(0, 2)).map(item => Math.trunc(item)),
               color: "rgba(253, 199, 21, 1)",
               marker: {
                    enabled: false
               }
               }]
          }


     return (
          <div className={styles.container}>

               <div className={styles.titleWrap}>
                    <img className={styles.titleImg} src='/assets/BtnImages/Chart.png' alt='chart'></img>
                    <div className={styles.titleText}>Почасовой</div>
               </div>
               <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
               />

          </div>
     );
};

export default HourChart;