/* eslint-disable react/prop-types */

import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import withLayout from '../withLayoutProvider';
import withTheme from '../../themes/withThemeProvider';

jest.useFakeTimers();

jest.mock('../Header', () => props => <div {...props}>Header Component</div>);

jest.mock('../Footer', () => props => <div {...props}>Footer Component</div>);

jest.mock('../Wallet', () => props => <div {...props}>Wallet Component</div>);

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

const mockStore = configureStore([]);

describe('Layout Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      benefits: { wallets: {} },
    });
  });

  it('should match snapshot without options', () => {
    const Component = ({ dispatch, ...rest }) => (
      <div {...rest}>Layout Content</div>
    );
    const Layout = withTheme(withLayout(Component));

    const { container } = render(
      <Provider store={store}>
        <Layout />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with options', () => {
    const Component = ({ dispatch, ...rest }) => (
      <div {...rest}>Layout Content</div>
    );
    const Layout = withTheme(
      withLayout(Component, {
        backgroundImage: 'dummyImageUrl',
        fullWidth: true,
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <Layout />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should update height when resize fullwidth', () => {
    const Component = ({ dispatch, ...rest }) => (
      <div {...rest}>Layout Content</div>
    );
    const Layout = withTheme(
      withLayout(Component, {
        backgroundImage: 'dummyImageUrl',
        fullWidth: true,
      }),
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
