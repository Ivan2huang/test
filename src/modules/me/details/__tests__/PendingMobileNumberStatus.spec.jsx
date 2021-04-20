import React from 'react';
import { render } from '@testing-library/react';
import PendingMobileNumberStatus from '../PendingMobileNumberStatus';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('PendingMobileNumberStatus Component', () => {
  it('should match the snapshot', () => {
    const Component = withIntl(withTheme(PendingMobileNumberStatus));
    const { container } = render(<Component allowedToVerify />);
    expect(container).toMatchSnapshot();
  });
});
