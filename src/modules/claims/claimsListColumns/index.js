import CONFIG from '../../../constants/config';
import createDefaultColumns from './createColumns.default';
import createBalboaColumns from './createColumns.balboa';

const header = {
  balboa: createBalboaColumns,
};

export default header[CONFIG.themeCode] || createDefaultColumns;
