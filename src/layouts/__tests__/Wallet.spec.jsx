/* eslint-disable react/prop-types */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import Wallet from '../Wallet';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';
import CONFIG from '../../constants/config';

jest.mock('../../helpers/helpers', () => ({
  formatMessage: (intl, key, defaultMessage) => defaultMessage,
  formatAmount: (intl, amount) => amount,
}));

jest.mock('../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
));

const mockStore = configureStore([]);

describe('Wallet Component', () => {
  it('should match the snapshot', () => {
    const store = mockStore({
      benefits: { wallets: { balance: 0, isWalletsDisabled: false } },
    });
    const Component = withIntl(withTheme(Wallet));
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when isWalletsDisabled is true', () => {
    const store = mockStore({
      benefits: { wallets: { balance: 0, isWalletsDisabled: true } },
    });
    const Component = withIntl(withTheme(Wallet));
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when useCurrencySymbol is true', () => {
    CONFIG.useCurrencySymbol = true;
    const store = mockStore({
      benefits: { wallets: { balance: 0, isWalletsDisabled: false } },
    });
    const Component = withIntl(withTheme(Wallet));
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
