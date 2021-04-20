/* eslint-disable no-undef,react/prop-types */

import getResultCards from '../helper';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../createAlcoholRiskInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'AlcoholRisk' }),
}));
jest.mock('../createBmiCardInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'BmiRisk' }),
}));
jest.mock('../createDiabetesInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'DiabetesRisk' }),
}));
jest.mock('../createExerciseRiskInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'ExerciseRisk' }),
}));
jest.mock('../createMindAndStressRiskInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'MindAndStressRisk' }),
}));
jest.mock('../createNutritionRiskInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'NutritionRisk' }),
}));
jest.mock('../createSleepRiskInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'SleepRisk' }),
}));
jest.mock('../createTobaccoRiskInfo', () => ({
  __esModule: true,
  default: () => ({ type: 'TobaccoRisk' }),
}));

describe('helper', () => {
  const intl = {};
  const theme = {
    warning: 'warning',
    success: 'success',
  };

  it('should get empty array when lifestyleResults is empty', () => {
    const lifestyleResults = {};
    const expected = [];

    const actual = getResultCards(intl, theme, lifestyleResults);

    expect(actual).toStrictEqual(expected);
  });

  it('should get array of lifestyle card info', () => {
    const lifestyleResults = {
      alcoholRisk: 'None',
      bmiClass: 'Healthy',
      bmiScore: 19,
      diabetesRisk: 'Low',
      exerciseRisk: 'VeryLow',
      mindAndStressRisk: 'Normal',
      nutritionRisk: 'High',
      sleepRisk: 'PoorSleeper',
      tobaccoRisk: 'NonSmoker',
    };

    const expected = [
      { type: 'BmiRisk' },
      { type: 'DiabetesRisk' },
      { type: 'AlcoholRisk' },
      { type: 'TobaccoRisk' },
      { type: 'ExerciseRisk' },
      { type: 'NutritionRisk' },
      { type: 'SleepRisk' },
      { type: 'MindAndStressRisk' },
    ];
    const actual = getResultCards(intl, theme, lifestyleResults);
    expect(actual).toEqual(expected);
  });
});
