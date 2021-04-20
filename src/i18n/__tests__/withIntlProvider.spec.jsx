import { FormattedMessage } from 'react-intl';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import withIntl, { IntlContext } from '../withIntlProvider';

jest.mock('../lang', () => ({
  messages: {
    'zh-HK': { 'login.welcome': 'Welcome to Login Page in Chinese' },
    'en-HK': { 'login.welcome': 'Welcome to Login Page in English' },
  },
  langs: ['zh-HK.json', 'en-HK.json'],
}));

jest.mock('../../constants/config', () => ({
  defaultLanguage: 'zh-HK',
}));

describe('component with intl', () => {
  it('should have the translated message', () => {
    const dummyComponent = () => <FormattedMessage id="login.welcome" />;
    const Component = withIntl(dummyComponent);
    const { getByText } = render(<Component />);

    expect(getByText(/^Welcome to Login Page in Chinese$/)).toBeInTheDocument();
  });

  it('should get initial props', async () => {
    const dummyComponent = () => <FormattedMessage id="login.welcome" />;
    dummyComponent.getInitialProps = () => Promise.resolve({ test: 'test' });
    const Component = withIntl(dummyComponent);
    const actual = await Component.getInitialProps({
      ctx: {},
    });

    expect(actual).toBeDefined();
    expect(actual.test).toEqual('test');
  });

  it('should reset locale when intl context changes', async () => {
    const ButtonComponent = () => {
      const setLocale = useContext(IntlContext);
      const updateLocale = () => {
        setLocale('en-HK');
      };
      return <Button onClick={updateLocale}>Click</Button>;
    };
    const dummyComponent = () => (
      <>
        <FormattedMessage id="login.welcome" />
        <ButtonComponent />
      </>
    );

    const Component = withIntl(dummyComponent);
    const { getByText } = render(<Component />);
    const clickButton = getByText('Click');
    fireEvent.click(clickButton);

    expect(getByText(/^Welcome to Login Page in English$/)).toBeInTheDocument();
  });
});
