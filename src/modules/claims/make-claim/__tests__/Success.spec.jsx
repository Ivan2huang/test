/* eslint-disable react/prop-types */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Success from '../Success';
import withTheme from '../../../../themes/withThemeProvider';
import { navigateTo } from '../../../../helpers/helpers';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock(
  '../../../../uiComponents/ButtonGroup',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

describe('Success component', () => {
  let result;

  beforeEach(() => {
    const Component = withIntl(withTheme(Success));
    result = render(<Component />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the Snapshot', () => {
    expect(result.container).toMatchSnapshot();
  });

  it('should navigate to Make new claim when make another claim is clicked', () => {
    const makeNewClaimButton = result.getByTestId('btn-make-another-claim');
    fireEvent.click(makeNewClaimButton);

    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/claims/make-claim');
  });

  it('should navigate to claims when back to claims button is clicked', () => {
    const backToClaims = result.getByTestId('btn-back-to-claims');
    fireEvent.click(backToClaims);

    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/claims');
  });
});
