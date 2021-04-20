import createDiabetesInfo from '../createDiabetesInfo';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('Create Diabetes Info', () => {
  const intl = {};
  const theme = {
    lifeStyleResultWarning: 'orange',
    lifeStyleResultOK: 'green',
    lifeStyleResultAlarm: 'red',
  };

  it('should match snapshot', () => {
    const actual = createDiabetesInfo(intl, theme, 'Low');

    expect(actual).toMatchSnapshot();
  });
});
