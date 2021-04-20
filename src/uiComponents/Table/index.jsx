import CONFIG from '../../constants/config';
import defaultTable from './Table.default';
import BalboaTable from './Table.balboa';

const containers = {
  balboa: BalboaTable,
};

const container = containers[CONFIG.themeCode] || defaultTable;
export default container;
