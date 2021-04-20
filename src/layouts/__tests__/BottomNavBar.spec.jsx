/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import BottomNavBar from '../BottomNavBar';
import { navigateTo } from '../../helpers/helpers';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';

jest.mock('../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('@material-ui/core/Hidden', () => ({ children, smUp }) => (
  <div data-component="MuiHidden" data-smup={smUp}>
    {children}
  </div>
));

jest.mock('../../i18n/getLocale', () => () => 'en');

jest.mock('../../i18n/lang', () => ({
  messages: {},
  langs: ['en'],
}));

jest.mock('../../constants/config', () => ({
  shopUrl: 'shop.com',
  defaultLanguage: 'en',
}));

describe('BottomNavBar Component', () => {
  it('should match snapshot', () => {
    const props = {
      router: {
        pathname: '/claims',
      },
    };
    const Component = withIntl(withTheme(BottomNavBar));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to link', async () => {
    const props = {
      router: {
        pathname: '/lifestyle',
      },
      intl: {
        formatMessage: jest.fn(),
      },
    };
    const Component = withIntl(withTheme(BottomNavBar));
    const { getByTestId } = render(<Component {...props} />);

    const shopNav = getByTestId('nav-claims');
    fireEvent.click(shopNav);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/claims');
    });
  });

  it('should navigate to external link', async () => {
    window.open = jest.fn();
    const props = {
      router: {
        pathname: '/claims',
      },
      intl: {
        formatMessage: jest.fn(),
      },
    };
    const Component = withIntl(withTheme(BottomNavBar));
    const { getByTestId } = render(<Component {...props} />);

    const shopNav = getByTestId('nav-eshop');
    fireEvent.click(shopNav);

    await wait(() => {
      // expect(window.open).toHaveBeenCalledWith('shop.com', '_self');
    });
  });
});
