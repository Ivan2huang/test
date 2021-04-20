import React from 'react';

import { render } from '@testing-library/react';
import withIntl from '../../../../../../../i18n/withIntlProvider';
import withTheme from '../../../../../../../themes/withThemeProvider';

import UpdateEmailSuccess from '../UpdateEmailSuccess';

jest.mock(
  '../../../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock(
  '../../../../../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

describe('UpdateEmailSuccess Component', () => {
  it('should match snapshot', () => {
    const Component = withTheme(withIntl(UpdateEmailSuccess));
    const props = {
      router: {
        query: {
          email: 'test@example.com',
        },
      },
    };
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
