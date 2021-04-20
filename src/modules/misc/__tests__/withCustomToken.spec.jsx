import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import withCustomToken from '../withCustomToken';

jest.mock('next/router');
jest.mock('../../../helpers/logger');

const axiosMock = new MockAdapter(axios);

const contextWithCookie = {
  req: {
    cookies: {
      refresh_token: 'refresh_token',
      access_token: 'access_token',
      role: 'cookie',
      logged_in: 'true',
    },
    headers: {},
    originalUrl: '/originalUrl',
    path: '/error',
  },
  res: {
    redirect: jest.fn(),
    locals: {
      accessToken: 'access_token',
      isLoggedIn: 'true',
    },
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

const TestComponent = () => <div>Test Component </div>;
TestComponent.getInitialProps = () => Promise.resolve({});

describe('with Custom Token Provider', () => {
  it('Should match snapshot', () => {
    const Component = withCustomToken(TestComponent);
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });

  it('Should set custom token', async () => {
    process.env.FEATURE_TOGGLE_AWS_COGNITO = 'true';
    process.env.COGNITO_SERVICE = '/cognito/';
    axiosMock.onGet('/cognito/api/v1/OAuth/token/verify').reply(
      200,
      {
        success: true,
      },
      {
        'cxa-authorization': 'zYz',
      },
    );

    const Component = withCustomToken(TestComponent);
    await Component.getInitialProps({ ctx: contextWithCookie });
    expect(contextWithCookie.res.redirect).not.toHaveBeenCalled();
  });

  it('Should set custom token with fallback accessToken and isLoggedIn', async () => {
    process.env.FEATURE_TOGGLE_AWS_COGNITO = 'true';
    process.env.COGNITO_SERVICE = '/cognito/';
    axiosMock.onGet('/cognito/api/v1/OAuth/token/verify').reply(
      200,
      {
        success: true,
      },
      {
        'cxa-authorization': 'zYz',
      },
    );
    contextWithCookie.req.cookies.access_token = null;
    contextWithCookie.req.cookies.logged_in = null;

    const Component = withCustomToken(TestComponent);
    await Component.getInitialProps({ ctx: contextWithCookie });
    expect(contextWithCookie.res.redirect).not.toHaveBeenCalled();
  });
});
