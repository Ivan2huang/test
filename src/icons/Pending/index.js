import Pending from './Pending';
import PendingBalboa from './Pending.balboa';
import CONFIG from '../../constants/config';

const containers = {
  balboa: PendingBalboa,
};

const container = containers[CONFIG.themeCode] || Pending;

export default container;
