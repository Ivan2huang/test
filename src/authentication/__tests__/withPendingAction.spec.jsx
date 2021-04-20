import React from 'react';
import { render } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import withPendingActions from '../withPendingActions';

jest.mock('../../helpers/auth');
jest.mock('../../helpers/paths', () => ({
  common: {
    root: '/',
    login: '/login',
    error: '/error',
    accountAcivation: '/account-activation',
    accountAcivationError: '/account-activation/error',
  },
}));
jest.mock('../../helpers/logger');

const mockedDispatch = jest.fn();
jest.mock('../../redux/store', () => ({
  getStore: () => ({
    dispatch: mockedDispatch,
  }),
}));

const request = new MockAdapter(axios);

const ctxWithoutToken = {
  req: {
    cookies: {
      id_token: null,
    },
    path: '/account-activation',
    originalUrl: '/account-activation',
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
    },
    path: '/',
    originalUrl: '/',
  },
  res: {
    redirect: jest.fn(),
    locals: {},
  },
};

const ctxOnClientSide = {
  isServer: false,
  res: {
    redirect: jest.fn(),
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

const TestComponent = () => <div>Test Component </div>;
TestComponent.getInitialProps = () => Promise.resolve({ test: 'test' });

describe('with Pending action Provider', () => {
  it('should match snapshot', () => {
    const Component = withPendingActions(TestComponent);

    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should redirect to account activation page', async () => {
    const Component = withPendingActions(TestComponent);
    const ctx = {
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        cookies: {
          ...ctxWithToken.req.cookies,
          pending_actions: 'FirstLoginOTPVerification',
        },
      },
      store: {
        dispatch: mockedDispatch,
      },
    };

    await Component.getInitialProps({ ctx });
    expect(ctx.res.redirect).toHaveBeenCalledWith('/account-activation');
  });

  it('should redirect to account activation page with secondary email', async () => {
    process.env = Object.assign(process.env, {
      THEME_CODE: 'balboa',
    });
    const Component = withPendingActions(TestComponent);
    const ctx = {
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        cookies: {
          ...ctxWithToken.req.cookies,
          pending_actions: 'FirstLoginOTPVerification',
        },
      },
      store: {
        dispatch: mockedDispatch,
      },
    };

    await Component.getInitialProps({ ctx });
    expect(ctx.res.redirect).toHaveBeenCalledWith('/account-activation');
  });

  it('should request email in activation page', async () => {
    const Component = withPendingActions(TestComponent);
    const ctx = {
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        cookies: {
          ...ctxWithToken.req.cookies,
          pending_actions: 'FirstLoginOTPVerification',
        },
        originalUrl: '/account-activation',
      },
      store: {
        dispatch: mockedDispatch,
      },
    };

    request.onPost().reply(200, {
      access_token: 'token',
    });
    request.onGet(new RegExp('/api/v2/clients')).reply(200, {
      email: 'test@email.com',
    });

    await Component.getInitialProps({ ctx });
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
  });

  it('should get secondary email in balboa activation page', async () => {
    process.env = Object.assign(process.env, {
      WEB_FLAVOR: 'balboa',
    });
    const Component = withPendingActions(TestComponent);
    const ctx = {
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        cookies: {
          ...ctxWithToken.req.cookies,
          pending_actions: 'FirstLoginOTPVerification',
        },
        originalUrl: '/account-activation',
      },
      store: {
        dispatch: mockedDispatch,
      },
    };

    request.onPost().reply(200, {
      access_token: 'token',
    });
    request.onGet(new RegExp('/api/v2/clients')).reply(200, {
      email: 'test@email.com',
      secondary_email_address: 'test2@email.com',
    });

    await Component.getInitialProps({ ctx });
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
  });

  it('should not redirect if no pending actions in cookies', async () => {
    const Component = withPendingActions(TestComponent);
    await Component.getInitialProps({ ctx: ctxWithToken });
    expect(ctxWithToken.res.redirect).not.toHaveBeenCalled();
  });

  it('should not redirect if route is error page', async () => {
    const Component = withPendingActions(TestComponent);
    const ctx = {
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/error',
        originalUrl: '/error',
      },
    };
    await Component.getInitialProps({ ctx });
    expect(ctx.res.redirect).not.toHaveBeenCalled();
  });

  it('should redirect to login page if access account activation page without login', async () => {
    const Component = withPendingActions(TestComponent);
    await Component.getInitialProps({ ctx: ctxWithoutToken });
    expect(ctxWithoutToken.res.redirect).toHaveBeenCalledWith('/login');
  });

  it('should redirect to homme page if access account activation page without pending action', async () => {
    const Component = withPendingActions(TestComponent);
    const ctx = {
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        path: '/account-activation',
        originalUrl: '/account-activation',
      },
    };
    await Component.getInitialProps({ ctx });
    expect(ctx.res.redirect).toHaveBeenCalledWith('/');
  });

  it('should do nothing if access account activation page with pending action', async () => {
    const Component = withPendingActions(TestComponent);
    const ctx = {
      ...ctxWithToken,
      req: {
        ...ctxWithToken.req,
        cookies: {
          ...ctxWithToken.req.cookies,
          pending_actions: 'FirstLoginOTPVerification',
        },
        path: '/account-activation',
        originalUrl: '/account-activation',
      },
      store: {
        dispatch: mockedDispatch,
      },
    };

    request.onPost().reply(404, {
      errors: [{ messageKey: '' }],
    });
    request.onGet(new RegExp('/api/v2/clients')).reply(404, {
      errors: [{ messageKey: '' }],
    });

    await Component.getInitialProps({ ctx });
    expect(mockedDispatch).toHaveBeenCalledTimes(0);
    expect(ctx.res.redirect).not.toHaveBeenCalled();
  });

  it('should do nothing when not redirect by server', async () => {
    const Component = withPendingActions(TestComponent);
    await Component.getInitialProps({ ctx: ctxOnClientSide });
    expect(ctxOnClientSide.res.redirect).not.toHaveBeenCalled();
  });
});
