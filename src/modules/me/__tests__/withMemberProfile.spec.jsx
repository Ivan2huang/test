import React from 'react';
import { render } from '@testing-library/react';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import withMemberProfile from '../withMemberProfile';

jest.mock('next/router');

const mockedDispatch = jest.fn();
jest.mock('../../../redux/store', () => ({
  getStore: () => ({
    dispatch: mockedDispatch,
  }),
}));

jest.mock('../../../constants/auth', () => ({
  ACCESS_TOKEN: 'access_token',
  LOGGED_IN: 'logged_in',
  USER_ID: 'user_id',
  routesWithoutFetchData: ['/error'],
}));

jest.mock('../../../helpers/paths', () => ({
  common: {
    error: '/error',
  },
}));

jest.mock('../../../helpers/logger');

const request = new MockAdapter(axios);

const ctxWithoutToken = {
  req: {
    cookies: { id_token: null },
    headers: {},
  },
  res: {
    redirect: jest.fn(),
    locals: {},
  },
  store: {
    dispatch: mockedDispatch,
  },
};
const ctxWithToken = {
  req: {
    cookies: {
      id_token: 'test_token',
      access_token: 'test_access_token',
      user_id: 'user_id_1',
      logged_in: true,
      lang: 'en-HK',
    },
    headers: {},
  },
  res: {
    redirect: jest.fn(),
    locals: {
      access_token: 'test_access_token',
    },
  },
  store: {
    dispatch: mockedDispatch,
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

const TestComponent = () => <div>Test Component </div>;
TestComponent.getInitialProps = () => Promise.resolve({});

describe('with MemberProfile Provider', () => {
  it('should match snapshot', async () => {
    const Component = withMemberProfile(TestComponent);

    const { container } = render(
      <Component memberProfile={{ relationships: [] }} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should return empty memberProfile when token is missing from cookie', async () => {
    const Component = withMemberProfile(TestComponent);

    const memberProfile = await Component.getInitialProps({
      ctx: ctxWithoutToken,
    });

    expect(memberProfile).toEqual({ memberProfile: {} });
  });

  it('should return empty memberProfile when on client side', async () => {
    const Component = withMemberProfile(TestComponent);

    const memberProfile = await Component.getInitialProps({
      ctx: {},
    });

    expect(memberProfile).toEqual({ memberProfile: {} });
  });

  it('should return member profile when valid token is passed and api return success', async () => {
    const Component = withMemberProfile(TestComponent);
    request
      .onGet(new RegExp('profile$'))
      .reply(200, { preferredLocale: 'en-HK' })
      .onGet(new RegExp('/balance\\?includeDependents'))
      .reply(200, {});

    const actual = await Component.getInitialProps({ ctx: ctxWithToken });
    const expected = {
      memberProfile: { preferredLocale: 'en-HK' },
      preferredLocale: 'en-HK',
    };

    expect(actual).toEqual(expected);
  });

  it('should call disabled wallet with valid balance', async () => {
    const Component = withMemberProfile(TestComponent);
    request
      .onGet(new RegExp('profile$'))
      .reply(200, { preferredLocale: 'en-HK' })
      .onGet(new RegExp('/balance\\?includeDependents'))
      .reply(200, { member: { balance: 0 } });

    const actual = await Component.getInitialProps({ ctx: ctxWithToken });
    const expected = {
      memberProfile: { preferredLocale: 'en-HK' },
      preferredLocale: 'en-HK',
    };

    expect(actual).toEqual(expected);
  });

  it('should return member profile when valid token is passed and api return success even wallet error', async () => {
    const Component = withMemberProfile(TestComponent);
    request
      .onGet(new RegExp('profile$'))
      .reply(200, { preferredLocale: 'en-HK' })
      .onGet(new RegExp('/balance\\?includeDependents'))
      .reply(404, {
        errors: [{ messageKey: '' }],
      });

    const actual = await Component.getInitialProps({ ctx: ctxWithToken });
    const expected = {
      memberProfile: { preferredLocale: 'en-HK' },
      preferredLocale: 'en-HK',
    };

    expect(actual).toEqual(expected);
  });

  it('should return member profile when valid token is passed and api return success even invalid wallet error', async () => {
    const Component = withMemberProfile(TestComponent);
    request
      .onGet(new RegExp('profile$'))
      .reply(200, { preferredLocale: 'en-HK' })
      .onGet(new RegExp('/balance\\?includeDependents'))
      .reply(404, null);

    const actual = await Component.getInitialProps({ ctx: ctxWithToken });
    const expected = {
      memberProfile: { preferredLocale: 'en-HK' },
      preferredLocale: 'en-HK',
    };

    expect(actual).toEqual(expected);
  });

  it('should return member profile when valid token is passed and api return success even single wallet error', async () => {
    const Component = withMemberProfile(TestComponent);
    request
      .onGet(new RegExp('profile$'))
      .reply(200, { preferredLocale: 'en-HK' })
      .onGet(new RegExp('/balance\\?includeDependents'))
      .reply(404, { code: 'test' });

    const actual = await Component.getInitialProps({ ctx: ctxWithToken });
    const expected = {
      memberProfile: { preferredLocale: 'en-HK' },
      preferredLocale: 'en-HK',
    };

    expect(actual).toEqual(expected);
  });

  it('should return member profile and disable wallet when valid token is passed and api return success', async () => {
    const Component = withMemberProfile(TestComponent);
    request
      .onGet(new RegExp('profile$'))
      .reply(200, { preferredLocale: 'en-HK' })
      .onGet(new RegExp('/balance\\?includeDependents'))
      .reply(402, {
        errors: [{ messageKey: 'INTERNAL_SERVER_ERROR' }],
      });

    const actual = await Component.getInitialProps({ ctx: ctxWithToken });
    const expected = {
      memberProfile: { preferredLocale: 'en-HK' },
      preferredLocale: 'en-HK',
    };

    expect(actual).toEqual(expected);
  });

  it('should return member profile when valid token is passed and api returns Unauthorized', async () => {
    const Component = withMemberProfile(TestComponent);
    request.onGet(new RegExp('profile$')).reply(401, {});

    const memberProfile = await Component.getInitialProps({
      ctx: ctxWithToken,
    });

    expect(memberProfile).toEqual({
      memberProfile: {},
      preferredLocale: 'en-HK',
    });
  });

  it('should not redirect to error page when current request is from error page', async () => {
    const Component = withMemberProfile(TestComponent);
    request.onGet(new RegExp('profile$')).reply(401, {});

    ctxWithToken.req.path = '/error';
    const memberProfile = await Component.getInitialProps({
      ctx: ctxWithToken,
    });

    expect(ctxWithToken.res.redirect).not.toHaveBeenCalled();
    expect(memberProfile).toEqual({
      memberProfile: {},
      preferredLocale: 'en-HK',
    });
  });
});
