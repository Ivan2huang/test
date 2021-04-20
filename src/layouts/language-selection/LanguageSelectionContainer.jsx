/* istanbul ignore file */
import React from 'react';
import { useIntl } from 'react-intl';

import { formatMessage } from '../../helpers/helpers';
import LanguageSelection from './LanguageSelection';
import CONFIG from '../../constants/config';
import {
  DEFAULT_LANGUAGE_NAME_MAPPING,
  FLAG_IMAGE_MAPPING,
} from '../../constants/types';

const WithLanguageSelection = props => {
  const intl = useIntl();

  const languages = {};
  CONFIG.supportedLanguages.forEach(lang => {
    languages[lang] = {
      label: formatMessage(
        intl,
        `footer.language.${lang}`,
        DEFAULT_LANGUAGE_NAME_MAPPING[lang],
      ),
      image: FLAG_IMAGE_MAPPING[lang],
    };
  });

  return <LanguageSelection languages={languages} {...props} />;
};

export default WithLanguageSelection;
