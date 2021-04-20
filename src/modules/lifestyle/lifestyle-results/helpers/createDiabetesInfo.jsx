import React from 'react';

import { HeartIcon } from '../../../../icons';
import { formatMessage } from '../../../../helpers/helpers';

const createDiabetesInfo = (intl, theme, diabetesRisk) => {
  const alcoholRiskMapping = {
    Low: `${theme.lifeStyleResultOK}`,
    High: `${theme.lifeStyleResultWarning}`,
    VeryHigh: `${theme.lifeStyleResultAlarm}`,
  };

  return {
    id: 'diabetes',
    color: alcoholRiskMapping[diabetesRisk],
    CardIcon: <HeartIcon color={alcoholRiskMapping[diabetesRisk]} />,
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.diabetesCard.title',
      'Diabetes',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.diabetesCard.subTitle.${diabetesRisk}`,
      diabetesRisk,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.diabetesCard.description.${diabetesRisk}`,
      diabetesRisk,
    ),
  };
};

export default createDiabetesInfo;
