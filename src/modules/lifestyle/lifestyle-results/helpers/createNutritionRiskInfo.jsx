import React from 'react';

import { NutritionIcon } from '../../../../icons';
import { formatMessage } from '../../../../helpers/helpers';

const createNutritionRiskInfo = (intl, theme, nutritionRisk) => {
  const nutritionRiskMapping = {
    Low: `${theme.lifeStyleResultOK}`,
    Moderate: `${theme.lifeStyleResultWarning}`,
    High: `${theme.lifeStyleResultAlarm}`,
  };

  return {
    id: 'nutrition',
    color: nutritionRiskMapping[nutritionRisk],
    CardIcon: <NutritionIcon color={nutritionRiskMapping[nutritionRisk]} />,
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.nutritionRiskCard.title',
      'Nutrition',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.nutritionRiskCard.subTitle.${nutritionRisk}`,
      nutritionRisk,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.nutritionRiskCard.description.${nutritionRisk}`,
      nutritionRisk,
    ),
  };
};

export default createNutritionRiskInfo;
