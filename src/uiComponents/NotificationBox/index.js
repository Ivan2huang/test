import CONFIG from '../../constants/config';
import NotificationDefault from './NotificationBox';
import NotificationBalboa from './NotificationBox.balboa';

const container = {
  balboa: NotificationBalboa,
};

export default container[CONFIG.themeCode] || NotificationDefault;
