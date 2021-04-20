import { render } from '@testing-library/react';
import React from 'react';

import withTheme from '../../../../themes/withThemeProvider';
import ForgotPasswordHeader from '../ForgotPasswordHeader';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

describe('Forgot Password Header Component', () => {
  it('should match the snapshot', () => {
    const Component = withTheme(withIntl(ForgotPasswordHeader));

    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
