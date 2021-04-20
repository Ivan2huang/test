import React from 'react';
import { render } from '@testing-library/react';

import ResetPasswordSuccess from '../ResetPasswordSuccess/ResetPasswordSuccess.basil';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

describe('Reset Password Success Basil Component', () => {
  it('should match the snapshot with no back to login button', () => {
    const props = {
      router: {
        query: {},
        showBackBtn: false,
      },
    };
    const Component = withTheme(withIntl(ResetPasswordSuccess));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
