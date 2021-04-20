import createNutritionRiskInfo from '../createNutritionRiskInfo';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Create Nutrition Risk Info', () => {
  const intl = {};
  const theme = {
    lifeStyleResultWarning: 'orange',
    lifeStyleResultOK: 'green',
    lifeStyleResultAlarm: 'red',
  };

  it('should match snapshot', () => {
    const actual = createNutritionRiskInfo(intl, theme, 'Low');

    expect(actual).toMatchSnapshot();
  });
});
