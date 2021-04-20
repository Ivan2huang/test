/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Footer from '../Footer';
import withTheme from '../../themes/withThemeProvider';
import { navigateTo } from '../../helpers/helpers';
import withIntl from '../../i18n/withIntlProvider';

jest.mock('../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div>
    Typography component
    <span>{mockPropsCapture(rest)}</span>
    <span>{children}</span>
  </div>
));

jest.mock('../LanguageSelectionContainer', () => props => (
  <div>
    LanguageSelection component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

afterEach(() => {
  jest.clearAllMocks();
});

describe('Footer component', () => {
  const defaultProps = {};
  const setUp = (props = defaultProps) => {
    const Component = withIntl(withTheme(Footer));
    return render(<Component {...props} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const { container } = setUp({ displayMobile: true });

    expect(container).toMatchSnapshot();
  });

  it('should navigate privacy page on click of privacy link', () => {
    const { getByTestId } = setUp();
    const privacyLink = getByTestId('link-privacy');

    fireEvent.click(privacyLink);

    expect(navigateTo).toHaveBeenCalledWith('/legal/privacy');
    expect(navigateTo).toHaveBeenCalledTimes(1);
  });

  it('should navigate terms and conditions page on click of terms link', () => {
    const { getByTestId } = setUp();
    const privacyLink = getByTestId('link-terms');

    fireEvent.click(privacyLink);

    expect(navigateTo).toHaveBeenCalledWith('/legal/terms');
    expect(navigateTo).toHaveBeenCalledTimes(1);
  });

  it('should navigate to contact us page', () => {
    const { getByTestId } = setUp();
    const link = getByTestId('link-contact');

    fireEvent.click(link);

    expect(navigateTo).toHaveBeenCalledWith('/contact-us');
    expect(navigateTo).toHaveBeenCalledTimes(1);
  });
});
