/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import withLayout from '../withPaymentLayoutProvider';
import withTheme from '../../themes/withThemeProvider';

jest.mock('../Footer', () => props => <div {...props}>Footer Component</div>);

jest.mock('../BottomNavBar', () => props => (
  <div {...props}>Bottom NavBar Component</div>
));

jest.mock('../../modules/loader', () => ({
  LoaderContainer: ({ children }) => (
    <div>
      <div>Loader Container</div>
      {children}
    </div>
  ),
}));

describe('Layout Component', () => {
  it('should match snapshot without options', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const Layout = withTheme(withLayout(Component));

    const { container } = render(<Layout />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with options', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const Layout = withTheme(
      withLayout(Component, {
        backgroundImage: 'dummyImageUrl',
        fullWidth: true,
      }),
    );

    const { container } = render(<Layout />);

    expect(container).toMatchSnapshot();
  });
});
