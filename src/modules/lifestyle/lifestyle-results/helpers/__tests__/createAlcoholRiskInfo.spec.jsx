import createAlcoholRiskInfo from '../createAlcoholRiskInfo';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Create Alcohol Risk Info', () => {
  const intl = {};
  const theme = {
    lifeStyleResultWarning: 'orange',
    lifeStyleResultOK: 'green',
    lifeStyleResultAlarm: 'red',
  };

  it('should match snapshot', () => {
    const actual = createAlcoholRiskInfo(intl, theme, 'None');

    expect(actual).toMatchSnapshot();
  });

  it('should match snapshot for drinker', () => {
    const actual = createAlcoholRiskInfo(intl, theme, 'HeavyDrinker');

    expect(actual).toMatchSnapshot();
  });
});
