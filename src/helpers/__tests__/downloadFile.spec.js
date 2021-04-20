import * as axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import downloadFile from '../downloadFile';
import { navigateTo } from '../helpers';

const request = new MockAdapter(axios);
jest.mock('next/router');
jest.mock('../helpers', () => ({
  navigateTo: jest.fn(),
  captureException: jest.fn(),
}));
jest.mock('../logger');

describe('Download file', () => {
  const downloadUrl = '/test/url';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call given url and fetch the file', async () => {
    window.navigator.msSaveOrOpenBlob = jest.fn();
    request.onGet(downloadUrl).reply(() => [200, 'fileData']);
    const actual = await downloadFile(downloadUrl, 'test.pdf');

    const blob = new Blob(['fileData']);
    expect(window.navigator.msSaveOrOpenBlob).toHaveBeenCalledWith(
      blob,
      'test.pdf',
    );
    expect(actual).toEqual('SUCCESS');
  });

  it('should call given url and fetch the file when window not support msSaveOrOpenBlob', async () => {
    window.navigator.msSaveOrOpenBlob = undefined;
    window.URL.createObjectURL = jest.fn();
    request.onGet(downloadUrl).reply(() => [200, 'fileData']);
    const actual = await downloadFile(downloadUrl, 'test.pdf');

    const blob = new Blob(['fileData']);
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(actual).toEqual('SUCCESS');
  });

  it('should return error when no data response', async () => {
    request.onGet(downloadUrl).reply(() => [200]);
    const actual = await downloadFile(downloadUrl, 'test.pdf');
    expect(actual).toEqual('ERROR');
  });

  it('should navigate when server error', async () => {
    request.onGet(downloadUrl).reply(500);
    await downloadFile(downloadUrl, 'test.pdf');
    expect(navigateTo).toHaveBeenCalledWith('/error');
  });
});
