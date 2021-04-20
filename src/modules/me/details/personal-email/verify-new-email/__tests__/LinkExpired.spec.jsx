/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import LinkExpired from '../LinkExpired';
import withTheme from '../../../../../../themes/withThemeProvider';
import withIntl from '../../../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock(
  '../../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => (
    <div>
      Typography component
      <span>{mockPropsCapture(rest)}</span>
      <span>{children}</span>
    </div>
  ),
);

jest.mock('../../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../../../constants/images', () => ({
  VERIFY_PERSONAL_EMAIL_LINK_EXPIRED_BACKGROUND:
    'test/VerifyPersonalEmailLinkExpiredBackground.svg',
}));

describe('LinkExpired Component', () => {
  it('should match snapshot', () => {
    const Component = withTheme(withIntl(LinkExpired));
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
