import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import SettingsContainer, { mapStateToProps } from '../SettingsContainer';
import withTheme from '../../../../themes/withThemeProvider';

import withIntl from '../../../../i18n/withIntlProvider';

const mockStore = configureStore([]);
const me = {
  member: {
    wallets: {
      wallets: {},
      planYear: {},
      isWalletsDisabled: false,
    },
    profile: {
      email: 'test@mail.com',
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
    },
  },
  settings: {
    isRequestResetPasswordSuccess: false,
  },
};
describe('SettingsContainer', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      me,
    });
  });
  const Component = withTheme(withIntl(SettingsContainer));
  it('should match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return default isEdmOptedOut', () => {
      const result = mapStateToProps({ me: { member: { profile: {} } } });
      expect(result.settings.isEdmOptedOut).toBe(false);
    });
    it('should return isEdmOptedOut', () => {
      const result = mapStateToProps({
        me: { member: { profile: { isEdmOptedOut: true } } },
      });
      expect(result.settings.isEdmOptedOut).toBe(true);
    });
  });
});
