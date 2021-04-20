import React from 'react';
import { render } from '@testing-library/react';

import ResetPasswordSuccess from '../ResetPasswordSuccess';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

describe('Reset Password Success Component', () => {
  it('should match the snapshot', () => {
    const props = {
      router: {
        query: {},
      },
    };
    const Component = withTheme(withIntl(ResetPasswordSuccess));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
