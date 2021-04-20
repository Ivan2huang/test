import React from 'react';
import { render } from '@testing-library/react';

import ForgotPasswordSuccess from '../ForgotPasswordSuccess/ForgotPasswordSuccess.basil';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

describe('Forgot Password Success Basil Component', () => {
  it('should match the snapshot with no back to login button', () => {
    const props = {
      router: {
        query: {
          email: 'test@email',
        },
      },
      showBackBtn: false,
      forgotPassword: jest.fn(),
    };
    const Component = withTheme(withIntl(ForgotPasswordSuccess));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
