/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Router from 'next/router';

import withIntl from '../../../../i18n/withIntlProvider';
import Privacy from '../Privacy';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div>
      Typography component
      <span>{mockPropsCapture(rest)}</span>
      <span>{children}</span>
    </div>
  ),
);

jest.mock('../../../../constants/config', () => ({
  supportedLanguages: ['en-HK', 'zh-HK'],
  locales: {
    ENGLISH: 'en-HK',
  },
}));

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

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isValidLanguageCode: jest.fn(() => false),
}));

jest.mock('../../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'zh-HK'),
}));

describe('Privacy component', () => {
  const lang = [
    {
      testId: 'chinese-tab',
      value: 'zn-HK',
      label: '中文 (繁體)',
    },
  ];
  const defaultProps = {
    privacyPolicy: { 'zh-HK': 'Privacy Policy content' },
    getPrivacyPolicy: jest.fn(),
    lang,
  };

  const setUp = (props = defaultProps) => {
    const Component = withTheme(withIntl(Privacy));
    return render(<Component {...props} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when api response data is empty', () => {
    const newProps = {
      ...defaultProps,
      privacyPolicy: {},
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when user is not logged in', () => {
    const newProps = {
      ...defaultProps,
      privacyPolicy: {
        'en-HK': 'Privacy policy',
        'zh-HK': 'privacy policy in Chinese',
      },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when user is not logged in and changes the language tab', () => {
    const newProps = {
      ...defaultProps,
      privacyPolicy: {
        'en-HK': 'Privacy policy',
        'zh-HK': 'privacy policy in Chinese',
      },
    };

    const { container, getByTestId } = setUp(newProps);

    fireEvent.click(getByTestId('en-HK-tab'));

    expect(container).toMatchSnapshot();
  });

  it('should go to previous page on go back button click', () => {
    const { getByTestId } = setUp();
    const backButton = getByTestId('btn-back-to-previous-page');

    fireEvent.click(backButton);

    expect(Router.back).toHaveBeenCalledTimes(1);
  });
});
