import React from 'react';
import { compose } from 'redux';

import withLayout from '../../layouts/withLayoutProvider';
import withAuth from '../../authentication/withAuthProvider';
import { QuestionnaireContainer } from '../../modules/lifestyle/questionnaire';
import Images from '../../constants/images';
import config from '../../constants/config';

export default config.featureToggleLifestyle
  ? compose(
      withAuth,
      withLayout,
    )(QuestionnaireContainer, {
      backgroundImage: Images.LIFESTYLE_QUESTIONNAIRE_BACKGROUND,
    })
  : compose(
      withAuth,
      withLayout,
    )(() => <></>);
