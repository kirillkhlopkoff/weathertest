export interface WeatherData {
  list: HourlyWeather[];
  city: {
    name: string;
    country: string;
  };
}

export interface HourlyWeather {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  dt_txt: string;
} 