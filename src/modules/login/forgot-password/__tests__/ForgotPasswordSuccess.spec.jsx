import React from 'react';
import { render } from '@testing-library/react';

import ForgotPasswordSuccess from '../ForgotPasswordSuccess';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

describe('Forgot Password Success Component', () => {
  it('should match the snapshot', () => {
    const props = {
      router: {
        query: {
          email: 'test@email',
        },
      },
      forgotPassword: jest.fn(),
    };
    const Component = withTheme(withIntl(ForgotPasswordSuccess));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
