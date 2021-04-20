import Rejected from './Rejected';
import RejectedBalboa from './Rejected.balboa';
import CONFIG from '../../constants/config';

const containers = {
  balboa: RejectedBalboa,
};

const container = containers[CONFIG.themeCode] || Rejected;

export default container;
