/* eslint-disable react/prop-types */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import Me from '../MeContainer';
import withTheme from '../../../themes/withThemeProvider';
import withIntl from '../../../i18n/withIntlProvider';
import { resetPassword, updateResetPasswordResult } from '../settings/action';

jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  formatMessage: (intl, key, defaultMessage) => defaultMessage,
}));

jest.mock('../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock('../settings/action', () => ({
  resetPassword: jest.fn(() => ({ type: 'mock_reset' })),
  updateResetPasswordResult: jest.fn(() => ({
    type: 'mock_updateResetPasswordResult',
  })),
}));

jest.mock('../settings/reset-password/ResultModal', () => ({ handleClose }) => {
  return (
    <div>
      ResultModal
      <button
        type="button"
        data-testid="CloseResultModal"
        onClick={handleClose}
      >
        CloseResultModal
      </button>
    </div>
  );
});

jest.mock('../meList', () => {
  return jest.fn(() => [
    {
      icon: <div>Icon1</div>,
      activeIcon: <div>ActiveIcon1</div>,
      name: 'Icon1',
      id: 'icon1',
    },
    {
      icon: <div>Icon2</div>,
      activeIcon: <div>ActiveIcon2</div>,
      name: 'Icon2',
      id: 'icon2',
    },
    {
      icon: <div>resetPassword</div>,
      activeIcon: <div>resetPassword</div>,
      name: 'Icon3',
      id: 'resetPassword',
    },
  ]);
});

jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
));

const mockStore = configureStore([]);
const me = {
  member: {
    profile: {
      email: 'test@mail.com',
      role: 'Employee',
      memberId: 1,
      fullName: 'test name',
      loginEmail: 'email',
      dependants: [
        {
          memberId: 2,
          fullName: 'test name 2',
        },
        {
          memberId: 3,
          fullName: 'test name 3',
        },
      ],
    },
  },
  settings: {
    isRequestResetPasswordSuccess: false,
  },
};

describe('Me Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ me });
  });

  it('should match the snapshot', () => {
    const props = {
      active: 'icon1',
      children: <div>Component</div>,
      isLoaded: true,
    };
    const Component = withIntl(withTheme(Me));
    const { container, getByText } = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
    );

    const Icon1Tab = getByText('ActiveIcon1');
    fireEvent.click(Icon1Tab);

    expect(container).toMatchSnapshot();
  });

  it('should call resetpassword action', () => {
    const props = {
      active: 'icon1',
      children: <div>Component</div>,
      isLoaded: true,
    };
    const Component = withIntl(withTheme(Me));
    const { container, getByText } = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
    );

    const Icon1Tab = getByText('resetPassword');
    fireEvent.click(Icon1Tab);

    expect(container).toMatchSnapshot();
    expect(resetPassword).toHaveBeenCalled();
  });

  it('should close result modal', () => {
    const props = {
      active: 'icon1',
      children: <div>Component</div>,
      isLoaded: true,
    };
    const Component = withIntl(withTheme(Me));
    const { container, getByTestId } = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
    );

    const button = getByTestId('CloseResultModal');
    fireEvent.click(button);

    expect(container).toMatchSnapshot();
    expect(updateResetPasswordResult).toHaveBeenCalledWith(false);
  });

  it('should match the snapshot when only support on mobile', () => {
    const props = {
      active: 'icon1',
      children: <div>Component</div>,
      isLoaded: true,
      isMobileOnly: true,
    };
    const Component = withIntl(withTheme(Me));
    const { container } = render(
      <Provider store={store}>
        <Component {...props} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
