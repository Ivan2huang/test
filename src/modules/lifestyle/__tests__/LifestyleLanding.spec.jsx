/* eslint-disable react/prop-types */
import React from 'react';

import { render } from '@testing-library/react';

import withTheme from '../../../themes/withThemeProvider';
import LifestyleLanding from '../LifestyleLanding';
import withIntl from '../../../i18n/withIntlProvider';

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>
    {children}
    (Typography)
  </div>
));

jest.mock('../../../uiComponents/GridItem', () => ({ columns, children }) => (
  <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
    <span>GridItem Component</span>
    <div>{children}</div>
  </div>
));

jest.mock('../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock('../LifestyleButtons', () => () => (
  <div>
    <span>add button</span>
    <span>clinic button</span>
  </div>
));

jest.mock('../../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('No Lifestyle Component', () => {
  let result;

  beforeEach(() => {
    const Component = withIntl(withTheme(LifestyleLanding));
    result = render(<Component />);
  });

  it('should match snapshot', () => {
    const { container } = result;
    expect(container).toMatchSnapshot();
  });
});
