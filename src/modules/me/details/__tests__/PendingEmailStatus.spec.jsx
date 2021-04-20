import React from 'react';
import { render } from '@testing-library/react';
import PendingEmailStatus from '../PendingEmailStatus';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

describe('PendingEmailStatus Component', () => {
  it('should match the snapshot', () => {
    const Component = withIntl(withTheme(PendingEmailStatus));
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
