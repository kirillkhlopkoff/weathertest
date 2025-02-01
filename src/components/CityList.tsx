import { Menu, Typography } from 'antd';

const { Text } = Typography;

interface CityListProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
  temperatures: Record<string, number | null>;
}

const cities = [
  'Berlin',
  'Kyiv',
  'London',
  'Los Angeles',
  'New York',
  'Paris',
  'Rome',
  'Tokyo',
  'Warsaw'
];

const CityList: React.FC<CityListProps> = ({ selectedCity, onCitySelect, temperatures }) => {
  const menuItems = cities.map(city => ({
    key: city,
    label: (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
        <span>{city}</span>
        <Text type="secondary">
          {temperatures[city] !== null ? `${Math.round(temperatures[city]!)}°C` : '...'}
        </Text>
      </div>
    )
  }));

  return (
    <Menu
      mode="vertical"
      selectedKeys={[selectedCity]}
      onSelect={({ key }) => onCitySelect(key)}
      items={menuItems}
      style={{ width: '250px' }}
    />
  );
};

export default CityList; 