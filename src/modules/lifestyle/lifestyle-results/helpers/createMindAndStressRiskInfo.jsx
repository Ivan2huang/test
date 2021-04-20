import React from 'react';

import { StressIcon } from '../../../../icons';
import { formatMessage } from '../../../../helpers/helpers';

const createMindAndStressRiskInfo = (intl, theme, mindAndStressRisk) => {
  const mindAndStressRiskMapping = {
    Normal: `${theme.lifeStyleResultOK}`,
    BeCareful: `${theme.lifeStyleResultWarning}`,
    AtRisk: `${theme.lifeStyleResultAlarm}`,
  };

  return {
    id: 'mindAndStress',
    color: mindAndStressRiskMapping[mindAndStressRisk],
    CardIcon: (
      <StressIcon color={mindAndStressRiskMapping[mindAndStressRisk]} />
    ),
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.mindAndStressRiskCard.title',
      'Mind & stress',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.mindAndStressRiskCard.subTitle.${mindAndStressRisk}`,
      mindAndStressRisk,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.mindAndStressRiskCard.description.${mindAndStressRisk}`,
      mindAndStressRisk,
    ),
  };
};

export default createMindAndStressRiskInfo;
