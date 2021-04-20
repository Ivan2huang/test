import React from 'react';
import { render } from '@testing-library/react';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import withPrerequisiteData from '../withPrerequisiteData';
import { disableWallets, updateWallets } from '../../benefits/wallets/action';
import {
  updateOutpatientStatus,
  updateWellnessStatus,
  updateEHealthCardStatus,
} from '../../benefits/action';

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

process.env.ENABLE_ETPA_SERVICE = 'true';

const TestComponent = () => <div>Test Component </div>;
TestComponent.getInitialProps = () => Promise.resolve({});

describe('with withWallwithPrerequisiteDataetData Provider', () => {
  it('should match snapshot', async () => {
    const Component = withPrerequisiteData(TestComponent);

    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });

  it('should do nothing when there is no token', async () => {
    const Component = withPrerequisiteData(TestComponent);

    await Component.getInitialProps({
      ctx: ctxWithoutToken,
    });

    expect(mockedDispatch).toHaveBeenCalledTimes(0);
  });

  it('should update wallet data', async () => {
    const Component = withPrerequisiteData(TestComponent);
    request.onGet(new RegExp('/balance\\?includeDependents')).reply(200, {
      member: { balance: 0 },
    });

    await Component.getInitialProps({ ctx: ctxWithToken });

    expect(mockedDispatch).toHaveBeenCalledWith(
      updateWallets(
        {
          member: { balance: 0 },
        },
        {},
      ),
    );
  });

  it('should disable wallet if has invalid balance', async () => {
    const Component = withPrerequisiteData(TestComponent);
    request.onGet(new RegExp('/balance\\?includeDependents')).reply(200, {
      member: { name: 'name' },
    });

    await Component.getInitialProps({ ctx: ctxWithToken });

    expect(mockedDispatch).toHaveBeenCalledWith(disableWallets());
  });

  it('should disable wallet if has invalid data', async () => {
    const Component = withPrerequisiteData(TestComponent);
    request.onGet(new RegExp('/balance\\?includeDependents')).reply(200, {});

    await Component.getInitialProps({ ctx: ctxWithToken });

    expect(mockedDispatch).toHaveBeenCalledWith(disableWallets());
  });

  it('should disable wallet when error occur', async () => {
    const Component = withPrerequisiteData(TestComponent);
    request.onGet(new RegExp('/balance\\?includeDependents')).reply(404, {
      errors: [{ messageKey: '' }],
    });

    await Component.getInitialProps({ ctx: ctxWithToken });
    expect(mockedDispatch).toHaveBeenCalledWith(disableWallets());
  });

  it('should update benefits status', async () => {
    const Component = withPrerequisiteData(TestComponent);
    request.onGet(new RegExp(/benefits$/)).reply(200, {
      hasEHealthCard: true,
      hasWellness: true,
      hasOutpatient: true,
      eHealthCardDetails: {},
      cardTypeDetails: {},
    });
    request.onGet(new RegExp(/selected-clinicproviders$/)).reply(200, [
      {
        clinicProviderCode: 'hase',
      },
    ]);

    await Component.getInitialProps({ ctx: ctxWithToken });

    expect(mockedDispatch).toHaveBeenCalledWith(updateOutpatientStatus(true));
    expect(mockedDispatch).toHaveBeenCalledWith(updateWellnessStatus(true));
    expect(mockedDispatch).toHaveBeenCalledWith(
      updateEHealthCardStatus(true, {}, true, {}, false),
    );
  });

  it('should update benefits status with empty data', async () => {
    const Component = withPrerequisiteData(TestComponent);
    request.onGet(new RegExp(/benefits$/)).reply(204);
    request.onGet(new RegExp(/selected-clinicproviders$/)).reply(200, []);

    await Component.getInitialProps({ ctx: ctxWithToken });

    expect(mockedDispatch).toHaveBeenCalledWith(updateOutpatientStatus(false));
    expect(mockedDispatch).toHaveBeenCalledWith(updateWellnessStatus(false));
    expect(mockedDispatch).toHaveBeenCalledWith(
      updateEHealthCardStatus(false, undefined, false, undefined, false),
    );
  });

  it('should handle error on benefit status', async () => {
    const Component = withPrerequisiteData(TestComponent);
    request.onGet(new RegExp(/benefits$/)).reply(500);
    request.onGet(new RegExp(/selected-clinicproviders$/)).reply(500);

    await Component.getInitialProps({ ctx: ctxWithToken });

    expect(mockedDispatch).toHaveBeenCalledWith(updateOutpatientStatus(false));
    expect(mockedDispatch).toHaveBeenCalledWith(updateWellnessStatus(false));
    expect(mockedDispatch).toHaveBeenCalledWith(
      updateEHealthCardStatus(false, undefined, false, undefined, false),
    );
  });
});
