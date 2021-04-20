import MockDate from 'mockdate';
import Router from 'next/router';
import CONFIG from '../../constants/config';

import {
  buildClaimPostBody,
  formatAmount,
  formatMessage,
  maskEmail,
  navigateTo,
  validateFiles,
  isEmpty,
  today,
  getCurrentDate,
  addDays,
  formatDate,
  openFile,
  onEnter,
  saveToLocalStorage,
  getValueFromLocalStorage,
  sentenceCase,
  delay,
  objectToURLParams,
  snakeToCamel,
  objectKeySnakeToCamel,
  isValidLanguageCode,
  removeUnicodeScript,
  convertObjectToParam,
  lowercaseObjectKeys,
} from '../helpers';
import { getCookie } from '../auth';
import { fetchFile } from '../fetch';

jest.mock('next/router');

jest.mock('../auth', () => ({
  getCookie: jest.fn(),
}));

jest.mock('../fetch', () => ({
  fetchFile: jest.fn(),
}));

jest.mock('../../appContext');

CONFIG.supportedLanguages = ['en-HK', 'zh-HK'];

describe('Helpers', () => {
  describe('FormatMessage', () => {
    it('should return the formatted message', () => {
      const intl = {
        formatMessage: jest.fn(() => 'Formatted message'),
      };

      const actual = formatMessage(intl, 'message.id', 'default message', {
        name: 'testing',
      });

      expect(actual).toBe('Formatted message');
      expect(intl.formatMessage).toHaveBeenCalledWith(
        {
          id: 'message.id',
          defaultMessage: 'default message',
        },
        {
          name: 'testing',
        },
      );
    });
  });

  describe('Mask Email', () => {
    it('should return masked email', () => {
      const actual = 'test@email.com';
      expect(maskEmail(actual)).toEqual('t******t@email.com');
    });
  });

  describe('Format Amount', () => {
    it('should return formatted amount (ex. 2,235.30)', () => {
      const amount = 1234;
      const intl = {
        formatNumber: jest.fn(),
      };

      formatAmount(intl, amount);

      expect(intl.formatNumber).toHaveBeenCalledWith(amount, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });
  });

  it('should navigate to path', () => {
    jest.spyOn(Router, 'push');

    navigateTo('/test-url');

    expect(Router.push).toHaveBeenCalledWith(
      {
        pathname: '/test-url',
        query: {},
      },
      undefined,
    );
  });

  it('should navigate to path with passed query param', () => {
    jest.spyOn(Router, 'push');

    navigateTo('/test-url', { param: 123 });

    expect(Router.push).toHaveBeenCalledWith(
      {
        pathname: '/test-url',
        query: { param: 123 },
      },
      undefined,
    );
  });

  it('should navigate to path with passed query param with changed url', () => {
    jest.spyOn(Router, 'push');
    const asPath = '/test-url/dummy';
    navigateTo('/test-url', { param: 123 }, asPath);

    expect(Router.push).toHaveBeenCalledWith(
      {
        pathname: '/test-url',
        query: { param: 123 },
      },
      '/test-url/dummy',
    );
  });

  it('should build submit claim payload with dependant as patient', () => {
    getCookie.mockReturnValue(13);
    const claimFormData = {
      planId: '2019',
      claimType: 'General Medical Practitioner',
      patient: {
        patientId: '12',
        contactNumber: '12345678',
      },
      claim: {
        claimId: 'MO-GP',
        diagnosis: 'Abdominal Pain',
        consultationDate: '',
        receiptAmount: '1234',
      },
    };
    const receiptFilesIds = ['1254'];
    const referralFileId = '123';
    const expected = {
      benefitPeriod: '2019',
      claimantName: 'Dependant|12',
      receiptDate: '',
      receiptAmount: '1234',
      claimReason: 'Abdominal Pain',
      claimTypeId: 'MO-GP',
      claimItemName: 'General Medical Practitioner',
      receiptFilesIds: ['1254'],
      referralFileId: '123',
      int1: true,
      str5: '12345678',
      int2: 0,
      dec1: undefined,
    };

    const actual = buildClaimPostBody(
      claimFormData,
      receiptFilesIds,
      referralFileId,
    );

    expect(actual).toEqual(expected);
  });

  it('should build submit claim payload with employee as patient', () => {
    getCookie.mockReturnValue('12');
    const claimFormData = {
      planId: '2019',
      claimType: 'General Medical Practitioner',
      patient: {
        patientId: '12',
        contactNumber: '12345678',
      },
      claim: {
        claimId: 'MO-GP',
        diagnosis: 'Abdominal Pain',
        consultationDate: '',
        receiptAmount: '1234',
      },
    };
    const receiptFilesIds = ['1254'];
    const referralFileId = '123';
    const expected = {
      benefitPeriod: '2019',
      claimantName: 'Employee|12',
      receiptDate: '',
      receiptAmount: '1234',
      claimReason: 'Abdominal Pain',
      claimItemName: 'General Medical Practitioner',
      claimTypeId: 'MO-GP',
      receiptFilesIds: ['1254'],
      referralFileId: '123',
      int1: true,
      str5: '12345678',
      int2: 0,
      dec1: undefined,
    };

    const actual = buildClaimPostBody(
      claimFormData,
      receiptFilesIds,
      referralFileId,
    );

    expect(actual).toEqual(expected);
  });

  it('should build submit claim payload with other insurer as true', () => {
    getCookie.mockReturnValue('12');
    const claimFormData = {
      planId: '2019',
      claimType: 'General Medical Practitioner',
      patient: {
        patientId: '12',
        contactNumber: '12345678',
      },
      claim: {
        claimId: 'MO-GP',
        diagnosis: 'Abdominal Pain',
        consultationDate: '',
        receiptAmount: '1234',
        anotherInsurer: true,
        otherInsurerAmount: 123,
      },
    };
    const receiptFilesIds = ['1254'];
    const referralFileId = '123';
    const expected = {
      benefitPeriod: '2019',
      claimantName: 'Employee|12',
      receiptDate: '',
      receiptAmount: '1234',
      claimReason: 'Abdominal Pain',
      claimItemName: 'General Medical Practitioner',
      claimTypeId: 'MO-GP',
      receiptFilesIds: ['1254'],
      referralFileId: '123',
      int1: true,
      str5: '12345678',
      int2: 1,
      dec1: 123,
    };

    const actual = buildClaimPostBody(
      claimFormData,
      receiptFilesIds,
      referralFileId,
    );

    expect(actual).toEqual(expected);
  });

  describe('isEmpty', () => {
    it('should return true if object is empty', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('should return false if object is not empty', () => {
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  it('should return today formatted date', () => {
    Date.now = jest.fn(() => 1487076708000);
    const expected = '14 Feb 2017';
    const actual = today();

    expect(actual).toEqual(expected);
  });

  it('should return today date', () => {
    MockDate.set(1487076708000);
    const expected = new Date();

    const actual = getCurrentDate();

    expect(actual).toEqual(expected);
  });

  it('should format utc date time to date', () => {
    const date = '2019-08-16T02:37:51.55Z';
    const expected = '16 Aug 2019';

    const actual = formatDate(date);

    expect(actual).toEqual(expected);
  });

  it('should return date as undefined with invalid date provided', () => {
    const date = '';
    const expected = undefined;

    const actual = formatDate(date);

    expect(actual).toEqual(expected);
  });

  it('should return date as undefined with invalid date provided', () => {
    const date = '0001-01-01-T00:00:00';
    const expected = undefined;

    const actual = formatDate(date);

    expect(actual).toEqual(expected);
  });

  it('should return undefined date with undefined date provided', () => {
    const date = undefined;
    const expected = undefined;

    const actual = formatDate(date);

    expect(actual).toEqual(expected);
  });

  it('should return date with locale provided', () => {
    const date = '2019-08-16T02:37:51.55Z';
    const expected = '16 Aug 2019';
    const expectedCn = '16 8月 2019';

    const actual = formatDate(date, 'en-HK');
    expect(actual).toEqual(expected);

    const actualCn = formatDate(date, 'zh-HK');
    expect(actualCn).toEqual(expectedCn);
  });

  it('should add days to today date', () => {
    MockDate.set(1487076708000);
    const expected = new Date(1494766308000);

    const actual = addDays(89);

    expect(actual).toEqual(expected);
  });

  it('should provide the valid files when valid FileTypes and FileSize are provided', () => {
    const files = [
      {
        name: 'test.png',
        size: 630480,
      },
      {
        name: 'test.png',
        size: 630480123123,
      },
      {
        name: 'test.pdf',
        size: 630480,
      },
    ];
    const fileSize = 2097152;
    const fileType = ['png'];
    const expected = [{ name: 'test.png', size: 630480 }];

    const actual = validateFiles(files, fileType, fileSize);

    expect(actual).toEqual(expected);
  });

  describe('open file', () => {
    it('should open file other than IE browser', async () => {
      window.open = jest.fn();

      await openFile('test.png', '/testing');

      expect(window.open).toHaveBeenCalledWith('/testing');
    });

    it('should open file in IE', async () => {
      window.navigator.msSaveOrOpenBlob = jest.fn();
      fetchFile.mockReturnValue('fetched blob');

      await openFile('test.png', '/testing');

      expect(fetchFile).toHaveBeenCalledWith('/testing');
      expect(window.navigator.msSaveOrOpenBlob).toHaveBeenCalledWith(
        'fetched blob',
        'test.png',
      );
    });
  });
  describe('onEnter', () => {
    it('should execute callback on enter', () => {
      const callback = jest.fn();
      const event = {
        key: 'Enter',
      };
      onEnter(event, callback);
      expect(callback).toHaveBeenCalled();
    });

    it('should not execute callback except on enter', () => {
      const callback = jest.fn();
      const event = {
        key: 'a',
      };
      onEnter(event, callback);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Local storage', () => {
    it('should save the key-value pair in local storage', () => {
      saveToLocalStorage('testId', 'testValue');

      expect(window.localStorage.getItem('testId')).toEqual('testValue');
    });

    it('should return the value from the local storage', () => {
      window.localStorage.setItem('key', 'value');

      const actual = getValueFromLocalStorage('key');

      expect(actual).toEqual('value');
    });

    it('should return undefined from the local storage when key-pair is missing', () => {
      window.localStorage.setItem('key1', 'value1');

      const actual = getValueFromLocalStorage('randomKey');

      expect(actual).toBeNull();
    });
  });

  describe('Sentance case', () => {
    it('should provide the sentace case for string', () => {
      const string = 'test statement';
      const expected = 'Test Statement';

      const actual = sentenceCase(string);

      expect(actual).toBe(expected);
    });
  });

  describe('Delay', () => {
    it('should create a delay for a given duration', async () => {
      const originalSetTimeout = global.setTimeout;
      global.setTimeout = jest.fn(callBack => {
        callBack();
      });
      await delay(2000);
      expect(global.setTimeout).toHaveBeenCalledTimes(1);
      expect(global.setTimeout).toHaveBeenCalledWith(
        expect.any(Function),
        2000,
      );
      global.setTimeout = originalSetTimeout;
    });
  });

  describe('objectToURLParams', () => {
    const params = {
      userId: '1',
      clientId: 'client',
    };

    const expected = `userId=1&clientId=client`;
    const urlParams = objectToURLParams(params);

    expect(urlParams).toEqual(expected);
  });

  describe('snakeToCamel', () => {
    it('should convert snake string to camel string', () => {
      const input = 'input_value';
      const expected = 'inputValue';

      const result = snakeToCamel(input);

      expect(result).toEqual(expected);
    });

    it('should convert snake string to camel string that includes number ', () => {
      const input = 'input_9value';
      const expected = 'input9value';

      const result = snakeToCamel(input);

      expect(result).toEqual(expected);
    });
  });

  describe('objectKeySnakeToCamel', () => {
    it('should convert object key to camel key', () => {
      const input = { property_name: 'test' };
      const expected = { propertyName: 'test' };

      const result = objectKeySnakeToCamel(input);

      expect(result).toEqual(expected);
    });

    it('should convert object key to camel key which includes number', () => {
      const input = { property_9name: 'test' };
      const expected = { property9name: 'test' };

      const result = objectKeySnakeToCamel(input);

      expect(result).toEqual(expected);
    });

    it('should check supported language or not', () => {
      let result = isValidLanguageCode('en-HK');
      expect(result).toBe(true);

      result = isValidLanguageCode('test');
      expect(result).toBe(false);
    });
  });

  describe('removeUnicodeScript', () => {
    it('should return empty string when not provided', () => {
      const actual = removeUnicodeScript();

      expect(actual).toEqual('');
    });

    it('should remove unicode script from the string', () => {
      const str = '¹⁰ Disability';
      const expected = 'Disability';
      const actual = removeUnicodeScript(str);

      expect(actual).toEqual(expected);
    });
  });

  describe('convertObjectToParam', () => {
    it('should return empty string when the parameter is not the object', () => {
      const actual = convertObjectToParam('1');

      expect(actual).toEqual('');
    });

    it('should return params string data', () => {
      const actual = convertObjectToParam({
        keyA: 'A',
        keyB: 'B',
      });

      expect(actual).toEqual('keyA=A&keyB=B');
    });
  });

  describe('lowercaseObjectKeys', () => {
    it('should return empty object when the parameter is not the object', () => {
      const actual = lowercaseObjectKeys('1');

      expect(actual).toEqual({});
    });

    it('should return object with keys lowercase', () => {
      const actual = lowercaseObjectKeys({
        keyA: 'A',
        keyB: 'B',
      });

      expect(actual).toEqual({
        keya: 'A',
        keyb: 'B',
      });
    });
  });
});
