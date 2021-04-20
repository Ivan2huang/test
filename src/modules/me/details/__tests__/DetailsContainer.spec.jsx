import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import DetailsContainer from '../DetailsContainer';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

const mockStore = configureStore([]);

const me = {
  member: {
    wallets: {
      wallets: {},
      planYear: {},
      isWalletsDisabled: false,
    },
    profile: {
      role: 'Employee',
      memberId: 1,
      fullName: 'test name',
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
      email: 'test@mail.com',
      workEmail: 'testWork@mail.com',
    },
  },
  settings: {
    isRequestResetPasswordSuccess: false,
  },
};

describe('DetailsContainer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      me,
    });
  });

  const Component = withIntl(withTheme(DetailsContainer));
  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
