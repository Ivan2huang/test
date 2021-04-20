import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import WalletBalance from '../WalletBalance';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

describe('WalletBalance Component', () => {
  const props = {
    walletBalance: 2500,
    loading: false,
    error: false,
    onRefresh: jest.fn(),
  };
  it('should match snapshot', () => {
    const Component = withIntl(withTheme(WalletBalance));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with loader', () => {
    const Component = withIntl(withTheme(WalletBalance));

    const { container } = render(
      <Component {...{ ...props, loading: true }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with api error', () => {
    const Component = withIntl(withTheme(WalletBalance));

    const { container } = render(<Component {...{ ...props, error: true }} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with with zero wallet balance', () => {
    const Component = withIntl(withTheme(WalletBalance));

    const { container } = render(
      <Component {...{ ...props, walletBalance: 0 }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call get balance on refresh click', () => {
    const Component = withIntl(withTheme(WalletBalance));

    const { getByTestId } = render(
      <Component {...{ ...props, error: true }} />,
    );

    const refreshIcon = getByTestId('btn-refresh');
    fireEvent.click(refreshIcon);

    expect(props.onRefresh).toHaveBeenCalledTimes(1);
  });

  it('should math snapshot when selected employee/dependents are not provided wallet', () => {
    const Component = withIntl(withTheme(WalletBalance));

    const { container } = render(
      <Component {...{ ...props, walletBalance: undefined }} />,
    );

    expect(container).toMatchSnapshot();
  });
});
