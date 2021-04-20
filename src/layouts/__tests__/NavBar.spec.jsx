/* eslint-disable react/prop-types */

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';

import NavBar from '../NavBar';
import withTheme from '../../themes/withThemeProvider';
import { navigateTo } from '../../helpers/helpers';
import withIntl from '../../i18n/withIntlProvider';
import CONFIG from '../../constants/config';

jest.mock('../../helpers/auth', () => ({
  getCookie: jest.fn().mockReturnValueOnce('clientId'),
}));

jest.mock('../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  convertObjectToParam: jest.fn().mockReturnValueOnce('clientId=clientId'),
}));
jest.mock('../../helpers/firebase', () => ({
  logEvent: jest.fn(),
  logAction: jest.fn(),
}));

jest.mock('@material-ui/core/Hidden', () => ({ children, smUp }) => (
  <div data-component="MuiHidden" data-smup={smUp}>
    {children}
  </div>
));

jest.mock('@material-ui/core/Tooltip', () => ({ children }) => <>{children}</>);

jest.mock('../../i18n/getLocale', () => () => 'en');

jest.mock('../../i18n/lang', () => ({
  messages: {},
  langs: ['en'],
}));

jest.mock('../../constants/config', () => ({
  shopUrl: 'shop.com',
  defaultLanguage: 'en',
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    navigateTo.mockClear();
  });

  it('should match snapshot', () => {
    const props = {
      router: {
        pathname: '/claims',
      },
    };
    const Component = withIntl(withTheme(NavBar));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to link', async () => {
    const props = {
      router: {
        pathname: '/lifestyle',
      },
    };

    const Component = withIntl(withTheme(NavBar));

    const { getByTestId } = render(<Component {...props} />);
    const claimsNav = getByTestId('nav-claims');
    fireEvent.click(claimsNav);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/claims', undefined);
    });
  });

  it('should navigate to link with params', async () => {
    const props = {
      router: {
        pathname: '/claims',
      },
    };

    const Component = withIntl(withTheme(NavBar));

    const { getByTestId } = render(<Component {...props} />);
    const claimsNav = getByTestId('nav-lifestyle');
    fireEvent.click(claimsNav);

    await wait(() => {
      expect(navigateTo).toHaveBeenCalledTimes(1);
      expect(navigateTo).toHaveBeenCalledWith('/lifestyle', {
        clientId: 'clientId',
      });
    });
  });

  it('should navigate to external Url if available', () => {
    window.open = jest.fn();
    const props = {
      router: {
        pathname: '/eshop',
      },
    };
    const Component = withIntl(withTheme(NavBar));
    const { getByTestId } = render(<Component {...props} />);
    const shopNav = getByTestId('nav-eshop');

    fireEvent.click(shopNav);

    expect(window.open).toHaveBeenCalledWith(
      `${CONFIG.shopUrl}?clientId=clientId`,
      '_self',
    );
    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
