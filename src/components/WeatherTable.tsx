import { Table, Image } from 'antd';
import { HourlyWeather } from '../api/types';
import { format } from 'date-fns';

interface WeatherTableProps {
  data: HourlyWeather[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ data }) => {
  const columns = [
    {
      title: 'Time',
      dataIndex: 'dt_txt',
      key: 'time',
      render: (dt_txt: string) => format(new Date(dt_txt), 'HH:mm'),
    },
    {
      title: 'Temperature',
      dataIndex: ['main', 'temp'],
      key: 'temperature',
      render: (temp: number) => `${Math.round(temp)}°C`,
    },
    {
      title: 'Description',
      dataIndex: 'weather',
      key: 'description',
      render: (weather: any[]) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
            width={30}
            preview={false}
          />
          {weather[0].description}
        </div>
      ),
    },
    {
      title: 'Humidity',
      dataIndex: ['main', 'humidity'],
      key: 'humidity',
      render: (humidity: number) => `${humidity}%`,
    },
    {
      title: 'Wind',
      dataIndex: ['wind', 'speed'],
      key: 'wind',
      render: (speed: number) => `${speed} m/s`,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.dt.toString()}
      pagination={false}
    />
  );
};

export default WeatherTable; 