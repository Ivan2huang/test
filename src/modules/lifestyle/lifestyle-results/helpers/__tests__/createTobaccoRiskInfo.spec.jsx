import createTobaccoRiskInfo from '../createTobaccoRiskInfo';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Create Tobacco Risk Info', () => {
  const intl = {};
  const theme = {
    lifeStyleResultWarning: 'orange',
    lifeStyleResultOK: 'green',
    lifeStyleResultAlarm: 'red',
  };

  it('should match snapshot', () => {
    const actual = createTobaccoRiskInfo(intl, theme, 'NonSmoker');

    expect(actual).toMatchSnapshot();
  });

  it('should match snapshot for smoker', () => {
    const actual = createTobaccoRiskInfo(intl, theme, 'Smoker');

    expect(actual).toMatchSnapshot();
  });
});
