import createMindAndStressRiskInfo from '../createMindAndStressRiskInfo';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Create Mind And Stress Risk Info', () => {
  const intl = {};
  const theme = {
    lifeStyleResultWarning: 'orange',
    lifeStyleResultOK: 'green',
    lifeStyleResultAlarm: 'red',
  };

  it('should match snapshot', () => {
    const actual = createMindAndStressRiskInfo(intl, theme, 'Normal');

    expect(actual).toMatchSnapshot();
  });
});
