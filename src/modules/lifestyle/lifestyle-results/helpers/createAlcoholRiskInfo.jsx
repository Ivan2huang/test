import React from 'react';

import { AlcoholIcon, NoAlcoholIcon } from '../../../../icons';
import { formatMessage } from '../../../../helpers/helpers';

const createAlcoholRiskInfo = (intl, theme, alcoholRisk) => {
  const alcoholRiskMapping = {
    None: `${theme.lifeStyleResultOK}`,
    RegularDrinker: `${theme.lifeStyleResultWarning}`,
    HeavyDrinker: `${theme.lifeStyleResultAlarm}`,
  };

  return {
    id: 'alcohol',
    color: alcoholRiskMapping[alcoholRisk],
    CardIcon:
      alcoholRisk === 'None' ? (
        <NoAlcoholIcon />
      ) : (
        <AlcoholIcon color={alcoholRiskMapping[alcoholRisk]} />
      ),
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.alcoholRiskCard.title',
      'Alcohol',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.alcoholRiskCard.subTitle.${alcoholRisk}`,
      alcoholRisk,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.alcoholRiskCard.description.${alcoholRisk}`,
      alcoholRisk,
    ),
  };
};

export default createAlcoholRiskInfo;
