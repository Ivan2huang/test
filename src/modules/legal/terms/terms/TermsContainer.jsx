import React from 'react';

import Terms from './Terms';
import CONFIG from '../../../../constants/config';

export default props => {
  return <Terms {...props} termLocales={CONFIG.supportedLanguages} />;
};
