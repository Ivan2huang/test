import createExerciseRiskInfo from '../createExerciseRiskInfo';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Create Exercise Risk Info', () => {
  const intl = {};
  const theme = {
    lifeStyleResultWarning: 'orange',
    lifeStyleResultOK: 'green',
    lifeStyleResultAlarm: 'red',
  };

  it('should match snapshot', () => {
    const actual = createExerciseRiskInfo(intl, theme, 'High');

    expect(actual).toMatchSnapshot();
  });
});
