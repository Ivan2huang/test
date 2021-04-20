import React from 'react';
import Router from 'next/router';

import { render } from '@testing-library/react';
import withAuth from '../withAuthProvider';
import { hasCookie } from '../../helpers/auth';

jest.mock('next/router');
jest.mock('../../helpers/auth');
jest.mock('../../helpers/paths', () => ({
  common: {
    commonPath: '/common',
    login: '/login',
    unauthorized: '/unauthorized',
    claimDetails: '/claimdetails',
    terms: '/terms',
  },
  employee: {
    employeePath: '/employee',
  },
  dependent: {
    dependentPath: '/dependent',
  },
}));

const stateWithRoleAndTermsAccepted = (role, isTermsAccepted = true) => ({
  me: {
    member: {
      profile: {
        role,
        isTermsAccepted,
        memberId: 'memberId',
      },
    },
  },
});

const ctxWithoutToken = {
  req: {
    cookies: {
      id_token: null,
    },
    path: '/',
    originalUrl: '/',
  },
  res: {
    redirect: jest.fn(),
    locals: {},
  },
};

const ctxWithToken = {
  req: {
    cookies: {
      id_token: 'test_token',
      logged_in: true,
      pending_actions: '',
    },
  },
  res: {
    redirect: jest.fn(),
  },
};

const ctxOnClientSide = {
  isServer: false,
};

afterEach(() => {
  jest.clearAllMocks();
});

const TestComponent = () => <div>Test Component </div>;

TestComponent.getInitialProps = () => Promise.resolve({ test: 'test' });

describe('with Authentication Provider', () => {
  it('should redirect to login page when id-token is missing from cookie & response locals variable', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps(ctxWithoutToken);

    expect(ctxWithoutToken.res.redirect).toHaveBeenCalledWith(
      '/login?path=%2F',
    );
  });

  it('should redirect to unauthorized page when path is unauthorized for dependent', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/employee',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Dependent'),
      },
    });

    expect(ctxWithToken.res.redirect).toHaveBeenCalledWith('/unauthorized');
  });

  it('should redirect to terms and conditions page when terms are not accepted', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/employee',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Employee', false),
      },
    });

    expect(ctxWithToken.res.redirect).toHaveBeenCalledWith('/terms');
  });

  it('should redirect to terms and conditions page when terms are not accepted on client side', async () => {
    const Component = withAuth(TestComponent);

    hasCookie.mockImplementation(() => true);

    await Component.getInitialProps({
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Employee', false),
      },
    });

    expect(Router.push).toHaveBeenCalledWith('/terms');
  });

  it('should redirect to unauthorized page when path is unauthorized for employee', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/dependent',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Employee'),
      },
    });

    expect(ctxWithToken.res.redirect).toHaveBeenCalledWith('/unauthorized');
  });

  it('should not redirect to unauthorized page when path is claimDetails', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/claimdetails',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted(),
      },
    });

    expect(ctxWithToken.res.redirect).not.toHaveBeenCalledWith('/unauthorized');
  });

  it('should not redirect to unauthorized page when path is valid for employee', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/employee',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Employee'),
      },
    });

    expect(ctxWithToken.res.redirect).not.toHaveBeenCalledWith('/unauthorized');
  });

  it('should not redirect to unauthorized page when path is valid for dependent', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/dependent',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Dependent'),
      },
    });

    expect(ctxWithToken.res.redirect).not.toHaveBeenCalledWith('/unauthorized');
  });

  it('should not redirect to unauthorized page when path is root', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Dependent'),
      },
    });

    expect(ctxWithToken.res.redirect).not.toHaveBeenCalledWith('/unauthorized');
  });

  it('should not redirect to unauthorized page when path is part of common paths', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/common',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Dependent'),
      },
    });

    expect(ctxWithToken.res.redirect).not.toHaveBeenCalledWith('/unauthorized');
  });

  it('should provide props of wrapped component ', async () => {
    const Component = withAuth(TestComponent);

    const actual = await Component.getInitialProps(ctxWithoutToken);
    const expected = { test: 'test' };

    expect(actual).toEqual(expected);
  });

  it('should not redirect to login page when id token is present in cookie and valid role path', async () => {
    const Component = withAuth(TestComponent);

    await Component.getInitialProps({
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/',
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Dependent'),
      },
    });

    expect(ctxWithToken.res.redirect).not.toHaveBeenCalledWith('/login');
    expect(ctxWithToken.res.redirect).not.toHaveBeenCalledWith('/unauthorized');
  });

  it('should not redirect to login page when request object is missing', async () => {
    const Component = withAuth(TestComponent);
    const ctx = {
      res: {
        redirect: jest.fn(),
      },
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Dependent'),
      },
    };

    await Component.getInitialProps(ctx);

    expect(ctx.res.redirect).not.toHaveBeenCalledWith('/login');
  });

  it('should match snapshot', () => {
    const Component = withAuth(TestComponent);

    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should redirect to login page on client side when cookie is missing', async () => {
    const Component = withAuth(TestComponent);

    hasCookie.mockImplementation(() => false);

    await Component.getInitialProps(ctxOnClientSide);

    expect(Router.push).toHaveBeenCalledWith('/login');
  });

  it('should not redirect to login page on client side when cookie is present', async () => {
    const Component = withAuth(TestComponent);

    hasCookie.mockImplementation(() => true);

    await Component.getInitialProps({
      store: {
        getState: () => stateWithRoleAndTermsAccepted('Dependent'),
      },
    });

    expect(Router.push).not.toHaveBeenCalled();
  });
});
