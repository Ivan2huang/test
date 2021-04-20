/* eslint-disable import/prefer-default-export */
import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const riskIds = {
  bmi: 'BMIRisk',
  diabetes: 'DiabetesRisk',
  alcohol: 'AlcoholRisk',
  exercise: 'ExerciseRisk',
  tobacco: 'SmokeRisk',
  nutrition: 'NutritionRisk',
  mindAndStress: 'StressRisk',
  sleep: 'SleepRisk',
};

export const getRecommendations = tipCategory => {
  return fetchData(
    'GET',
    URL.recommendations(riskIds[tipCategory]),
    undefined,
    true,
  );
};
