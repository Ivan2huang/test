import Approved from './Approved';
import ApprovedBalboa from './Approved.balboa';
import CONFIG from '../../constants/config';

const containers = {
  balboa: ApprovedBalboa,
};

const container = containers[CONFIG.themeCode] || Approved;

export default container;
