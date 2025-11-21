
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