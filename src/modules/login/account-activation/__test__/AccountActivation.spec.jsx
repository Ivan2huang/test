import React from 'react';
import { render } from '@testing-library/react';
import withRedux from '../../../../redux/withReduxProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import AccountActivationForm from '../AccountActivation';

describe('account activation component', () => {
  const props = {
    email: 'test@email.com',
    checkStatus: jest.fn(),
    resend: jest.fn(),
    verify: jest.fn(),
    otpStatus: {},
  };

  it('should match snapshot', () => {
    const Component = withRedux(withTheme(withIntl(AccountActivationForm)));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot without email', () => {
    const Component = withRedux(withTheme(withIntl(AccountActivationForm)));
    const { container } = render(<Component {...props} email="" />);

    expect(container).toMatchSnapshot();
  });
});
