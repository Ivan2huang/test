import React from 'react';

import { ExerciseIcon } from '../../../../icons';
import { formatMessage } from '../../../../helpers/helpers';

const createExerciseRiskInfo = (intl, theme, exerciseRisk) => {
  const exerciseRiskMapping = {
    High: `${theme.lifeStyleResultOK}`,
    LowToModerate: `${theme.lifeStyleResultWarning}`,
    VeryLow: `${theme.lifeStyleResultAlarm}`,
  };

  return {
    id: 'exercise',
    color: exerciseRiskMapping[exerciseRisk],
    CardIcon: <ExerciseIcon color={exerciseRiskMapping[exerciseRisk]} />,
    title: formatMessage(
      intl,
      'lifestyle.lifestyleResults.exerciseRiskCard.title',
      'Exercise',
    ),
    subTitle: formatMessage(
      intl,
      `lifestyle.lifestyleResults.exerciseRiskCard.subTitle.${exerciseRisk}`,
      exerciseRisk,
    ),
    description: formatMessage(
      intl,
      `lifestyle.lifestyleResults.exerciseRiskCard.description.${exerciseRisk}`,
      exerciseRisk,
    ),
  };
};

export default createExerciseRiskInfo;
