import React from 'react';
import { render } from '@testing-library/react';
import UnableSendOTP from '../UnableSendOTP';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

describe('Unable send OTP Component', () => {
  const setUp = () => {
    const Component = withTheme(withIntl(UnableSendOTP));
    return render(<Component />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();
    expect(container).toMatchSnapshot();
  });
});
