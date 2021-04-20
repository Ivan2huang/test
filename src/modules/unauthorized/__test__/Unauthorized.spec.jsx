import React from 'react';
import Router from 'next/router';

import { fireEvent, render } from '@testing-library/react';
import Unauthorized from '../Unauthorized';
import withIntl from '../../../i18n/withIntlProvider';
import withTheme from '../../../themes/withThemeProvider';
import { navigateTo } from '../../../helpers/helpers';

/* eslint-disable react/prop-types */

jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
));

jest.mock(
  '../../../uiComponents/ButtonGroup',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock('next/router');

describe('Unauthorized', () => {
  const props = {
    intl: {},
    classes: {
      image: '',
    },
  };
  let result;

  beforeEach(() => {
    const Component = withIntl(withTheme(Unauthorized));
    result = render(<Component {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    expect(result).toMatchSnapshot();
  });

  it('should navigate to home page', () => {
    const goToHomepageButton = result.getByTestId('btn-back-to-home-page');
    fireEvent.click(goToHomepageButton);

    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/');
  });

  it('should go to previous page', () => {
    const goToPreviousPage = result.getByTestId('btn-back-to-previous-page');
    fireEvent.click(goToPreviousPage);

    expect(Router.back).toHaveBeenCalledTimes(1);
  });
});
