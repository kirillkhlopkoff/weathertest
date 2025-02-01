import { Layout, Menu, Typography } from 'antd';
import { format, addDays } from 'date-fns';
const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  selectedDay: number;
  onDaySelect: (day: number) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedDay, onDaySelect }) => {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => ({
    date: addDays(today, i),
    key: i,
    label: format(addDays(today, i), 'EEE, dd/MM')
  }));

  return (
    <AntHeader>
      <div className="header-content">
        <div className="logo">
          <Title level={3} style={{ margin: 0, color: '#0958d9' }}>
            Weather Forecast
          </Title>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedDay.toString()]}
          onSelect={({ key }) => onDaySelect(Number(key))}
          items={days}
        />
      </div>
    </AntHeader>
  );
};

export default Header; 