import { WeatherData } from './types';

const API_KEY = 'afd3c19697e7336d3375eca412b517ec';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherForecast = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=en`
  );
  
  if (!response.ok) {
    throw new Error('Ошибка при загрузке данных о погоде');
  }
  
  return response.json();
}; 