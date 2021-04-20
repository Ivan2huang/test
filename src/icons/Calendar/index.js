import Calendar from './Calendar';
import CalendarCendol from './Calendar.cendol';
import CONFIG from '../../constants/config';

const containers = {
  cendol: CalendarCendol,
  balboa: Calendar,
};

const container = containers[CONFIG.themeCode] || Calendar;

export default container;
