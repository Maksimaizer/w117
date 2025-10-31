
export interface favCityArr {
     city: string;
     hours: number;
     minutes: number;
     currentTemp: number;
     background: string;
}

export const favoriteCities: favCityArr[] = [
     {
          city: "Моздок",
          hours: 13,
          minutes: 54,
          currentTemp: 20,
          background: "/assets/RainNight.jpg"
     },
          {
          city: "Москва",
          hours: 15,
          minutes: 44,
          currentTemp: 17,
          background: "/assets/CloudsMorning.jpg"
     },
]


export interface weekDaysWeather {
     day: string;
     icon: string;
     tempMax: number;
     tempMin: number;
}


export const weekDaysWeatherArr: weekDaysWeather[] = [
     {
          day: "Ср",
          icon: "/assets/BtnImages/half-moon.png",
          tempMax: 21,
          tempMin: 17,
     },
          {
          day: "Чт",
          icon: "/assets/BtnImages/half-moon.png",
          tempMax: 24,
          tempMin: 20,
     },
]

export interface hourWeatherIcon {
     icon: string;
     time: string;
     temperature: number;
}


export const hourWeatherIconArr: hourWeatherIcon[] = [
     {
          icon: "half-moon",
          time: "17:00",
          temperature: 19
     },
     {
          icon: "half-moon",
          time: "18:00",
          temperature: 19        
     },
     {
          icon: "half-moon",
          time: "19:00",
          temperature: 18
     },
     {
          icon: "half-moon",
          time: "20:00",
          temperature: 18
     },
     {
          icon: "half-moon",
          time: "21:00",
          temperature: 18
     },
     {
          icon: "half-moon",
          time: "22:00",
          temperature: 17
     },
     {
          icon: "half-moon",
          time: "23:00",
          temperature: 16
     },
     {
          icon: "half-moon",
          time: "00:00",
          temperature: 15
     },
     {
          icon: "half-moon",
          time: "1:00",
          temperature: 14
     },
     {
          icon: "half-moon",
          time: "2:00",
          temperature: 13
     },
     {
          icon: "half-moon",
          time: "3:00",
          temperature: 13
     },
     {
          icon: "half-moon",
          time: "4:00",
          temperature: 13
     },     

]


export interface weekDaysChart {
     day: string;
     date: number;
     icon: string;
     tempMax: number;
     tempMin: number;
     precipitarion: number;
     wind: number;
     windDeg: number;
     pressure: number;
}


export const weekDaysChartArr: weekDaysChart[] = [
     {
     day: "Вс",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 22,
     tempMin: 10,
     precipitarion: 2,
     wind: 5,
     pressure: 758,
     windDeg: 345      
     },
          {
     day: "Пн",
     date: 15,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 17,
     tempMin: 17,
     precipitarion: 5.3,
     wind: 4,
     pressure: 764,
     windDeg: 322           
     },
          {
     day: "Вт",
     date: 16,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 24,
     tempMin: 14,
     precipitarion: 0,
     wind: 2,
     pressure: 769,
     windDeg: 269       
     },
          {
     day: "Ср",
     date: 17,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 18,
     tempMin: 10,
     precipitarion: 0.2,
     wind: 0,
     pressure: 765,
     windDeg: 125         
     },
          {
     day: "Чт",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 28,
     tempMin: 12,
     precipitarion: 0.5,
     wind: 3,
     pressure: 758,
     windDeg: 33          
     },
          {
     day: "Пт",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 22,
     tempMin: 13,
     precipitarion: 3.9,
     wind: 3,
     pressure: 762,
     windDeg: 233        
     },
          {
     day: "Сб",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 22,
     tempMin: 12,
     precipitarion: 0.2,
     wind: 2,
     pressure: 762,
     windDeg: 311       
     },
          {
     day: "Вс",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 23,
     tempMin: 12,
     precipitarion: 0.6,
     wind: 4,
     pressure: 765,
     windDeg: 99           
     },
          {
     day: "Вс",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 22,
     tempMin: 10,
     precipitarion: 0,
     wind: 3,
     pressure: 768,
     windDeg: 12         
     },
          {
     day: "Пн",
     date: 15,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 17,
     tempMin: 13,
     precipitarion: 0.0,
     wind: 2,
     pressure: 758,
     windDeg: 222            
     },
          {
     day: "Вт",
     date: 16,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 23,
     tempMin: 11,
     precipitarion: 0,
     wind: 5,
     pressure: 769,
     windDeg: 108          
     },
          {
     day: "Ср",
     date: 17,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 20,
     tempMin: 15,
     precipitarion: 0.2,
     wind: 6,
     pressure: 758,
     windDeg: 311         
     },
          {
     day: "Чт",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 22,
     tempMin: 16,
     precipitarion: 0.5,
     wind: 1,
     pressure: 758,
     windDeg: 234        
     },
          {
     day: "Пт",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 22,
     tempMin: 13,
     precipitarion: 3.9,
     wind: 0,
     pressure: 757,
     windDeg: 0         
     },
          {
     day: "Сб",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 22,
     tempMin: 12,
     precipitarion: 0.2,
     wind: 3,
     pressure: 760,
     windDeg: 78
     },
          {
     day: "Вс",
     date: 14,
     icon: "/assets/BtnImages/half-moon.png",
     tempMax: 23,
     tempMin: 12,
     precipitarion: 0.6,
     wind: 1,
     pressure: 758,
     windDeg: 45           
     }
]


export interface WeatherItem {
  label: string;
  value: string | number;
  unit?: string;
  icon?: string; 
};

export const currentWeatherDataArr: WeatherItem[] = [
  { label: "Температура", value: 23, unit: "°C", icon: "/assets/BtnImages/CurrentWeatherIcons/temperature.png" },
  { label: "По ощущениям", value: 18, unit: "°C", icon: "/assets/BtnImages/CurrentWeatherIcons/feelsLike.png" },
  { label: "Облачность", value: 89, unit: "%", icon: "/assets/BtnImages/CurrentWeatherIcons/clouds.png" },
  { label: "Ветер", value: "6", unit: "m/s", icon: "/assets/BtnImages/CurrentWeatherIcons/wind.png" },
  { label: "Давление", value: 764, unit: "mmHg", icon: "/assets/BtnImages/CurrentWeatherIcons/pressure.png" },
  { label: "Влажность", value: 42, unit: "%", icon: "/assets/BtnImages/CurrentWeatherIcons/humidity.png" },
];