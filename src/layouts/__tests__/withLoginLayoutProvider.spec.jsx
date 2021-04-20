/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import withLoginLayout from '../withLoginLayoutProvider';
import withIntl from '../../i18n/withIntlProvider';
import withTheme from '../../themes/withThemeProvider';

jest.mock('../../uiComponents/PoweredBy', () => props => (
  <div {...props}>PoweredBy Component</div>
));

jest.mock('../Footer', () => ({ displayMobile, ...rest }) => (
  <div {...rest}>Footer Component</div>
));

jest.mock('../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock('../../modules/loader', () => ({
  LoaderContainer: ({ children }) => (
    <div>
      <div>Loader Container</div>
      {children}
    </div>
  ),
}));

describe('LoginLayout Component', () => {
  it('should match snapshot', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const options = {
      backgroundImage: '/testUrl',
    };
    const LoginLayout = withTheme(
      withIntl(withLoginLayout(Component, options)),
    );

    const { container } = render(<LoginLayout />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with illustration', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const options = {
      illustration: '/testUrl',
    };
    const LoginLayout = withTheme(
      withIntl(withLoginLayout(Component, options)),
    );

    const { container } = render(<LoginLayout />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with illustration desktop only', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const options = {
      illustration: '/testUrl',
      illustrationDesktopOnly: true,
    };
    const LoginLayout = withTheme(
      withIntl(withLoginLayout(Component, options)),
    );

    const { container } = render(<LoginLayout />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with app brand header', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const options = {
      backgroundImage: '/testUrl',
      showHeaderBrand: true,
    };
    const LoginLayout = withTheme(
      withIntl(withLoginLayout(Component, options)),
    );

    const { container } = render(<LoginLayout />);

    expect(container).toMatchSnapshot();
  });
});
