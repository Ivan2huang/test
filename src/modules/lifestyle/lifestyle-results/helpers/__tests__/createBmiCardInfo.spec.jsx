/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import createBmiCardInfo from '../createBmiCardInfo';

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock(
  '../../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

describe('Create Bmi Risk Info', () => {
  const intl = {};
  const theme = {
    lifeStyleResultWarning: 'orange',
    lifeStyleResultOK: 'green',
    lifeStyleResultAlarm: 'red',
  };

  it('should match snapshot when bmiScore is not a number', () => {
    const actual = createBmiCardInfo(intl, theme, 'None');

    expect(actual).toMatchSnapshot();
  });

  it('should match snapshot when bmiScore is a integer number', () => {
    const actual = createBmiCardInfo(intl, theme, 8);

    expect(actual).toMatchSnapshot();
  });

  it('should match snapshot when bmiScore is a decimal number', () => {
    const actual = createBmiCardInfo(intl, theme, 8.2);

    expect(actual).toMatchSnapshot();
  });
});
