/* eslint-disable func-names */
/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Router from 'next/router';
import { IntlProvider } from 'react-intl';

import { IntlContext } from '../../../../../i18n/withIntlProvider';
import Terms from '../Terms';
import withTheme from '../../../../../themes/withThemeProvider';
import { getCookie } from '../../../../../helpers/auth';

jest.mock(
  '../../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      Typography component
      <span>{mockPropsCapture(rest)}</span>
      <span>{children}</span>
    </div>
  ),
);

jest.mock('next/router', () => ({
  back: jest.fn(),
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

jest.mock('../../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isValidLanguageCode: jest.fn(() => false),
}));

jest.mock('../../../../../helpers/paths', () => ({
  common: {
    logout: '/logout',
  },
}));

jest.mock('../../../../../helpers/auth', () => ({
  getCookie: jest.fn(),
}));

jest.mock('../../../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'zh-HK'),
}));

jest.mock('../../../../../constants/config', () => ({
  supportedLanguages: ['en-HK', 'zh-HK'],
  locales: {
    ENGLISH: 'en-HK',
  },
}));

afterEach(() => {
  jest.clearAllMocks();
});

const setLocale = jest.fn();

describe('Terms component', () => {
  const termsConditions = { 'zh-HK': 'Terms and conditions' };
  const defaultProps = {
    termsConditions,
    getTermsConditions: jest.fn(),
    acceptTerms: jest.fn(),
    alreadyAcceptedTerms: false,
    preferredLocale: 'en-HK',
  };

  const setUp = (props = defaultProps) => {
    const Component = withTheme(Terms);
    return render(
      <IntlContext.Provider value={setLocale}>
        <IntlProvider locale="en-HK" messages={{}}>
          <Component {...props} />
        </IntlProvider>
      </IntlContext.Provider>,
    );
  };

  it('should match snapshot when user is logged in and has not accepted terms', () => {
    getCookie.mockReturnValue(true);
    const { container } = setUp();

    expect(container).toMatchSnapshot();
    expect(defaultProps.getTermsConditions).toHaveBeenCalled();
  });

  it('should call getTermsConditions on mount', () => {
    setUp();

    expect(defaultProps.getTermsConditions).toHaveBeenCalled();
  });

  it('should match snapshot when api response data is empty', () => {
    getCookie.mockReturnValue(false);
    const newProps = {
      ...defaultProps,
      termsConditions: {},
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when user is not logged in', () => {
    getCookie.mockReturnValue(false);
    const newProps = {
      ...defaultProps,
      termsConditions: {
        'en-HK': 'Terms and conditions',
        'zh-HK': 'Terms in Chinese',
      },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when user is not logged in and changes the language tab', () => {
    getCookie.mockReturnValue(false);
    const newProps = {
      ...defaultProps,
      termsConditions: {
        'en-HK': 'Terms and conditions',
        'zh-HK': 'Terms in Chinese',
      },
    };

    const { container, getByTestId } = setUp(newProps);

    fireEvent.click(getByTestId('en-HK-tab'));

    expect(container).toMatchSnapshot();
  });

  it('should go to previous page on go back button click', () => {
    getCookie.mockReturnValue(false);
    const { getByTestId } = setUp();
    const backButton = getByTestId('btn-back-to-previous-page');

    fireEvent.click(backButton);

    expect(Router.back).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot when user has already accepted terms', () => {
    getCookie.mockReturnValue(true);
    const newProps = {
      ...defaultProps,
      termsConditions: {
        'en-HK': 'Terms and conditions',
        'zh-HK': 'Terms in Chinese',
      },
      alreadyAcceptedTerms: true,
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should dispatch acceptTerms & setLocal when terms is accepted', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem');

    getCookie.mockReturnValue(true);
    const newProps = {
      ...defaultProps,
      termsConditions: {
        'en-HK': 'Terms and conditions',
        'zh-HK': 'Terms in Chinese',
      },
      alreadyAcceptedTerms: false,
    };

    const { container, getByTestId } = setUp(newProps);

    const agreeTermsCheckbox = getByTestId('checkbox-terms').querySelector(
      'input',
    );

    const agreeEdmCheckbox = getByTestId('checkbox-edm').querySelector('input');

    fireEvent.click(agreeTermsCheckbox);

    const acceptButton = getByTestId('btn-accept-terms');

    fireEvent.click(acceptButton);

    expect(container).toMatchSnapshot();
    expect(newProps.acceptTerms).toHaveBeenCalledWith(false);

    fireEvent.click(agreeEdmCheckbox);
    fireEvent.click(acceptButton);
    expect(newProps.acceptTerms).toHaveBeenCalledWith(true);
  });

  it('should logout when user disagrees with terms and logs out', () => {
    getCookie.mockReturnValue(true);
    const newProps = {
      ...defaultProps,
      termsConditions: {
        'en-HK': 'Terms and conditions',
        'zh-HK': 'Terms in Chinese',
      },
      alreadyAcceptedTerms: false,
    };

    const { getByTestId } = setUp(newProps);
    const logOutBtn = getByTestId('btn-logout');
    window.open = jest.fn();

    const localStorageMock = (function() {
      return {
        clear: jest.fn(),
      };
    })();
    Object.defineProperty(global, 'localStorage', { value: localStorageMock });

    fireEvent.click(logOutBtn);

    expect(window.open).toBeCalled();
    expect(window.open).toHaveBeenCalledWith('/logout', '_self');
    expect(window.localStorage.clear).toHaveBeenCalled();
  });
});
