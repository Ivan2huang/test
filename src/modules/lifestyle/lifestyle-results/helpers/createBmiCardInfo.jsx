import React from 'react';

import Typography from '../../../../uiComponents/Typography';
import { formatMessage } from '../../../../helpers/helpers';

export const formatBmiScore = bmiScore => {
  const score = parseFloat(bmiScore);
  if (Number.isNaN(score)) {
    return '';
  }
  return (+bmiScore).toFixed(1);
};

const createBmiCardInfo = (intl, theme, bmiScore, bmiClass) => {
  const bmiColorMapping = {
    Healthy: `${theme.lifeStyleResultOK}`,
    Overweight: `${theme.lifeStyleResultWarning}`,
    Obese: `${theme.lifeStyleResultAlarm}`,
    Underweight: `${theme.lifeStyleResultWarning}`,
  };

  return {
    id: 'bmi',
    color: bmiColorMapping[bmiClass],
    CardIcon: (
      <Typography type="style-1" color={theme.grey3} fontWeight="bold">
        {formatBmiScore(bmiScore)}
      </Typography>
    ),
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.bmiCard.title',
      'BMI',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.bmiCard.subTitle.${bmiClass}`,
      bmiClass,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.bmiCard.description.${bmiClass}`,
      bmiClass,
    ),
  };
};

export default createBmiCardInfo;
