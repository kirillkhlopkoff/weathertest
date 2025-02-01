import { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert } from 'antd';
import { isSameDay, addDays } from 'date-fns';
import Header from '../components/Header';
import WeatherTable from '../components/WeatherTable';
import CityList from '../components/CityList';
import { fetchWeatherForecast } from '../api/weatherApi';
import { WeatherData } from '../api/types';

const { Content, Sider } = Layout;
const { Title } = Typography;

const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedCity, setSelectedCity] = useState('Kyiv');
    const [cityTemperatures, setCityTemperatures] = useState<Record<string, number | null>>({});

    useEffect(() => {
        const loadWeatherData = async () => {
            try {
                setLoading(true);
                const data = await fetchWeatherForecast(selectedCity);
                setWeatherData(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
            } finally {
                setLoading(false);
            }
        };

        loadWeatherData();
    }, [selectedCity]);

    useEffect(() => {
        const loadCityTemperatures = async () => {
            const cities = ['Berlin', 'Kyiv', 'London', 'Los Angeles', 'New York', 'Paris', 'Rome', 'Tokyo', 'Warsaw'];
            const temperatures: Record<string, number | null> = {};

            for (const city of cities) {
                try {
                    const data = await fetchWeatherForecast(city);
                    temperatures[city] = data.list[0].main.temp;
                } catch {
                    temperatures[city] = null;
                }
            }

            setCityTemperatures(temperatures);
        };

        loadCityTemperatures();
    }, []);

    const today = new Date();
    const selectedDate = addDays(today, selectedDay);

    const filteredWeatherData = weatherData?.list.filter((item) =>
        isSameDay(new Date(item.dt_txt), selectedDate)
    );

    return (
        <Layout className="weather-layout">
            <Header
                selectedDay={selectedDay}
                onDaySelect={setSelectedDay}
            />
            <Layout className="main-content-layout">
                <Sider
                    width={250}
                    theme="light"
                    className="cities-sider"
                >
                    <CityList
                        selectedCity={selectedCity}
                        onCitySelect={setSelectedCity}
                        temperatures={cityTemperatures}
                    />
                </Sider>
                <Content className="weather-content">
                    {loading ? (
                        <Spin size="large" />
                    ) : error ? (
                        <Alert type="error" message={error} />
                    ) : (
                        <>
                            <Title level={2} className="weather-title">
                                Weather in {weatherData?.city.name}
                            </Title>
                            {filteredWeatherData && <WeatherTable data={filteredWeatherData} />}
                        </>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Weather; 