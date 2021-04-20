import React from 'react';

import { formatMessage } from '../../../../helpers/helpers';
import { SleepIcon } from '../../../../icons';

const createSleepRiskInfo = (intl, theme, sleepRisk) => {
  const sleepRiskMapping = {
    GoodSleeper: `${theme.lifeStyleResultOK}`,
    AverageSleeper: `${theme.lifeStyleResultWarning}`,
    PoorSleeper: `${theme.lifeStyleResultAlarm}`,
  };

  return {
    id: 'sleep',
    color: sleepRiskMapping[sleepRisk],
    CardIcon: <SleepIcon color={sleepRiskMapping[sleepRisk]} />,
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.sleepRiskCard.title',
      'Sleep',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.sleepRiskCard.subTitle.${sleepRisk}`,
      sleepRisk,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.sleepRiskCard.description.${sleepRisk}`,
      sleepRisk,
    ),
  };
};

export default createSleepRiskInfo;
