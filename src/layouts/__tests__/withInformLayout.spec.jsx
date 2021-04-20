/* eslint-disable react/prop-types */
/* eslint-disable no-undef,react/prop-types */

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import withLayout from '../withInformLayout';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';

jest.useFakeTimers();

jest.mock('../../uiComponents/PoweredBy', () => props => (
  <div {...props}>PoweredBy Component</div>
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

jest.mock('../BottomNavBar', () => props => (
  <div {...props}>Bottom NavBar Component</div>
));

jest.mock('../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div>
    Typography component
    <span>{mockPropsCapture(rest)}</span>
    <span>{children}</span>
  </div>
));

jest.mock('../../uiComponents/HeaderBrand', () => () => (
  <div>Header Brand</div>
));

jest.mock('../Footer', () => () => <div>Footer</div>);

const mockStore = configureStore([]);
describe('InformLayout Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should match snapshot without options', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const Layout = withIntl(withTheme(withLayout(Component)));

    const { container } = render(
      <Provider store={store}>
        <Layout />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with options', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const Layout = withIntl(
      withTheme(
        withLayout(Component, {
          backgroundImage: 'dummyImageUrl',
          fullWidth: true,
        }),
      ),
    );

    const { container } = render(
      <Provider store={store}>
        <Layout />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should update height when resize fullwidth', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const Layout = withIntl(
      withTheme(
        withLayout(Component, {
          backgroundImage: 'dummyImageUrl',
          fullWidth: true,
        }),
      ),
    );

    const { container } = render(
      <Provider store={store}>
        <Layout />
      </Provider>,
    );
    expect(container).toMatchSnapshot();

    act(() => {
      // Change the viewport to 500px.
      window.innerWidth = 800;
      window.innerHeight = 800;
      fireEvent(window, new Event('resize'));
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
  });
});
