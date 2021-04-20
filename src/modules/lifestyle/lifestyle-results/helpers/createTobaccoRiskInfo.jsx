import React from 'react';

import { TobaccoIcon, NoTobaccoIcon } from '../../../../icons';
import { formatMessage } from '../../../../helpers/helpers';

const createTobaccoRiskInfo = (intl, theme, tobaccoRisk) => {
  const tobaccoRiskMapping = {
    NonSmoker: `${theme.lifeStyleResultOK}`,
    ExSmoker: `${theme.lifeStyleResultWarning}`,
    Smoker: `${theme.lifeStyleResultAlarm}`,
  };

  return {
    id: 'tobacco',
    color: tobaccoRiskMapping[tobaccoRisk],
    CardIcon:
      tobaccoRisk === 'NonSmoker' ? (
        <NoTobaccoIcon />
      ) : (
        <TobaccoIcon color={tobaccoRiskMapping[tobaccoRisk]} />
      ),
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.tobaccoRiskCard.title',
      'Tobacco',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.tobaccoRiskCard.subTitle.${tobaccoRisk}`,
      tobaccoRisk,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.tobaccoRiskCard.description.${tobaccoRisk}`,
      tobaccoRisk,
    ),
  };
};

export default createTobaccoRiskInfo;
