/* eslint-disable no-console */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { fetchData } from '../fetch';
import { ERROR, UNKNOWN } from '../constants';

const request = new MockAdapter(axios);

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../../helpers/helpers', () => ({
  captureException: jest.fn(),
}));
jest.mock('../../../helpers/axiosInterceptors');

jest.mock('../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'zh-CN'),
}));

describe('Fetch Payment Data', () => {
  it('should handle the api request timeout', async () => {
    request.onGet('/randomUrl').timeout();

    const actual = await fetchData('get', '/randomUrl');

    expect(actual.error).toEqual(true);
    expect(actual.data).toEqual({
      status: UNKNOWN,
    });
  });

  it('should fetch data based on get method and url', async () => {
    request.onGet('/randomUrl').reply(200, { response: 'testing' });

    const actual = await fetchData('get', '/randomUrl');

    expect(actual.response).toBe('testing');
  });

  it('should fetch data based on post method and url', async () => {
    request
      .onPost('/randomUrl', { data: 'test@123' })
      .reply(200, { response: 'testing' });

    const actual = await fetchData('post', '/randomUrl', { data: 'test@123' });

    expect(actual.response).toBe('testing');
  });

  it('should return error if response is not ok', async () => {
    const errorsResponse = [
      {
        messageKey: 'UserAccountBlocked',
        message: 'Your account has been blocked',
      },
    ];
    request.onPost('/randomUrl', { data: 'test@123' }).reply(401, {
      errors: errorsResponse,
    });

    const actual = await fetchData('post', '/randomUrl', { data: 'test@123' });

    expect(actual.error).toEqual(true);
    expect(actual.data).toEqual({
      status: ERROR,
      errors: errorsResponse,
    });
  });

  it('should handle the api error and return error', async () => {
    request.onPost('/randomUrl', { data: 'test@123' }).reply(500, {
      code: 500,
      message: 'Error',
    });

    const actual = await fetchData('post', '/randomUrl', { data: 'test@123' });

    expect(actual.error).toBeTruthy();
    expect(actual.data).toEqual({
      status: ERROR,
      errors: [
        {
          messageKey: 500,
          message: 'Error',
        },
      ],
    });
  });

  it('should call api with correct Accept-Language header when default langauge is en', async () => {
    request.onGet('/randomUrl').reply(req => {
      return [200, { response: 'testing', requestHeaders: req.headers }];
    });
    const expectedRequestHeader = {
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'zh-CN',
      Pragma: 'no-cache',
    };

    const actual = await fetchData('get', '/randomUrl');

    expect(actual.requestHeaders).toEqual(expectedRequestHeader);
  });

  it('should call api with correct Accept-Language header when default langauge is zh', async () => {
    request.onGet('/randomUrl').reply(req => {
      return [200, { response: 'testing', requestHeaders: req.headers }];
    });
    const expectedRequestHeader = {
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'zh-CN',
      Pragma: 'no-cache',
    };

    const actual = await fetchData('get', '/randomUrl');

    expect(actual.requestHeaders).toEqual(expectedRequestHeader);
  });

  it('should call api with correct JWT token header', async () => {
    const jwt = 'temp';
    request.onPost('/randomUrl').reply(req => {
      return [200, { response: 'testing', requestHeaders: req.headers }];
    });
    const expectedRequestHeader = {
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept-Language': 'zh-CN',
      Pragma: 'no-cache',
      Authorization: `Bearer ${jwt}`,
    };

    const actual = await fetchData('post', '/randomUrl', null, {
      Authorization: `Bearer ${jwt}`,
    });

    expect(actual.requestHeaders).toEqual(expectedRequestHeader);
  });
});
