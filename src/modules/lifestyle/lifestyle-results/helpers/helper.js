import createBmiCardInfo from './createBmiCardInfo';
import createDiabetesInfo from './createDiabetesInfo';
import createAlcoholRiskInfo from './createAlcoholRiskInfo';
import createTobaccoRiskInfo from './createTobaccoRiskInfo';
import createExerciseRiskInfo from './createExerciseRiskInfo';
import createNutritionRiskInfo from './createNutritionRiskInfo';
import createSleepRiskInfo from './createSleepRiskInfo';
import createMindAndStressRiskInfo from './createMindAndStressRiskInfo';

const getResultCards = (intl, theme, lifestyleResults) => {
  if (Object.entries(lifestyleResults).length === 0) return [];
  return [
    createBmiCardInfo(
      intl,
      theme,
      lifestyleResults.bmiScore,
      lifestyleResults.bmiClass,
    ),
    createDiabetesInfo(intl, theme, lifestyleResults.diabetesRisk),
    createAlcoholRiskInfo(intl, theme, lifestyleResults.alcoholRisk),
    createTobaccoRiskInfo(intl, theme, lifestyleResults.tobaccoRisk),
    createExerciseRiskInfo(intl, theme, lifestyleResults.exerciseRisk),
    createNutritionRiskInfo(intl, theme, lifestyleResults.nutritionRisk),
    createSleepRiskInfo(intl, theme, lifestyleResults.sleepRisk),
    createMindAndStressRiskInfo(
      intl,
      theme,
      lifestyleResults.mindAndStressRisk,
    ),
  ];
};

export default getResultCards;
