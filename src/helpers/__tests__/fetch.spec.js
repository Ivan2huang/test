/* eslint-disable no-console */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { fetchData, fetchFile, uploadFile } from '../fetch';
import { navigateTo } from '../helpers';

const request = new MockAdapter(axios);

jest.mock('../helpers');
jest.mock('../axiosInterceptors');
jest.mock('../logger');

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../helpers', () => ({
  navigateTo: jest.fn(),
  captureException: jest.fn(),
}));

jest.mock('../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'zh-CN'),
}));

afterEach(() => {
  request.resetHandlers();
});

describe('Fetch Data', () => {
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
    request.onPost('/randomUrl', { data: 'test@123' }).reply(401, {
      errors: [
        {
          messageKey: 'UserAccountBlocked',
          message: 'Your account has been blocked',
        },
      ],
    });

    const actual = await fetchData(
      'post',
      '/randomUrl',
      { data: 'test@123' },
      true,
    );

    expect(actual.error).toEqual(true);
    expect(actual.messageKey).toEqual('UserAccountBlocked');
  });

  it('should show common error page on network error', async () => {
    request
      .onPost('/randomUrl', { data: 'test@123' }, undefined, false)
      .networkError();

    await fetchData('post', '/randomUrl', { data: 'test@123' });

    expect(navigateTo).toHaveBeenCalledWith('/error');
  });

  it('should handle the api error and return error info when expectsErrorResponse is true', async () => {
    request.onPost('/randomUrl', { data: 'test@123' }).reply(500, {
      code: 500,
      message: 'Error',
    });

    const actual = await fetchData(
      'post',
      '/randomUrl',
      { data: 'test@123' },
      true,
    );

    expect(actual.error).toBeTruthy();
    expect(actual.messageKey).toEqual(500);
    expect(actual.message).toEqual('Error');
  });

  it('should handle the api error and do not return anything when expectsErrorResponse is false', async () => {
    request.onPost('/randomUrl', { data: 'test@123' }).reply(500, {
      code: 500,
      message: 'Error',
    });

    const actual = await fetchData('post', '/randomUrl', { data: 'test@123' });

    expect(actual).toBe(undefined);
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

  it('should redirect to not found page if response have status 404', async () => {
    request.onGet('/randomUrl').replyOnce(404);

    await fetchData('get', '/randomUrl');

    expect(navigateTo).toHaveBeenCalledWith('/error/404');
  });
});

describe('Upload file', () => {
  it('should return the response with data when header is passed with Content-type of file', async () => {
    request.onPost('/randomUrl', { data: 'test@123' }).reply(req => {
      return [200, { response: 'testing', requestHeaders: req.headers }];
    });

    const actual = await uploadFile('post', '/randomUrl', {
      data: 'test@123',
    });
    expect(actual.requestHeaders['Content-Type']).toBe(
      'application/x-www-form-urlencoded',
    );
    expect(actual.response).toBe('testing');
  });

  it('should return error if response is not ok for uploadFile', async () => {
    request.onPost('/randomUrl', { data: 'test@123' }).reply(401, {
      errors: [
        {
          messageKey: 'UserAccountBlocked',
          message: 'Your account has been blocked',
        },
      ],
    });

    const actual = await uploadFile(
      'post',
      '/randomUrl',
      { data: 'test@123' },
      true,
    );
    expect(actual.error).toEqual(true);
    expect(actual.messageKey).toEqual('UserAccountBlocked');
  });
});

describe('Fetch file', () => {
  it('should return the response with blob data of file', async () => {
    request.onGet('/randomUrl').reply(req => {
      return [200, { response: 'testing', responseType: req.responseType }];
    });

    const actual = await fetchFile('/randomUrl');

    expect(actual.responseType).toBe('blob');
    expect(actual.response).toBe('testing');
  });

  it('should redirect to error page if response is not ok for fetchFile', async () => {
    console.log = jest.fn();
    request.onGet('/randomUrl').networkError();

    await fetchFile('/randomUrl');

    expect(navigateTo).toHaveBeenCalledWith('/error');
  });
});
