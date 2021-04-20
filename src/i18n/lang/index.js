import PropTypes from 'prop-types';

import en from './en-HK.json';
import zh from './zh-HK.json';
import th from './th-TH.json';

export const messages = { 'en-HK': en, 'zh-HK': zh, 'th-TH': th };

export const IntlPropType = PropTypes.shape({
  formatMessage: PropTypes.func.isRequired,
});
