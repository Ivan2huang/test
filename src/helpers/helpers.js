import Router from 'next/router';

import zhLocale from 'date-fns/locale/zh-CN';
import enLocale from 'date-fns/locale/en-US';
import * as Sentry from '@sentry/node';

import DateFnsUtils from '@date-io/date-fns';
import { getCookie } from './auth';
import { USER_ID } from '../constants/auth';
import CONFIG from '../constants/config';
// eslint-disable-next-line import/no-cycle
import { fetchFile } from './fetch';

const PRECISION = 2;

export const LOCALES_MAP = {
  'en-HK': enLocale,
  'zh-HK': zhLocale,
};

export const formatMessage = (intl, id, defaultMessage, values) =>
  intl.formatMessage({ id, defaultMessage }, values);

export const maskEmail = email => {
  const [localPart, domain] = email.split('@');
  return `${localPart[0]}******${localPart[localPart.length - 1]}@${domain}`;
};

export const formatAmount = (intl, amount) =>
  intl.formatNumber(amount, {
    minimumFractionDigits: PRECISION,
    maximumFractionDigits: PRECISION,
  });

export const navigateTo = (path, queryParam = {}, asPath) => {
  console.log('helpers.js navigateTo path=', path);
  Router.push({ pathname: path, query: queryParam }, asPath);
};

export const buildClaimPostBody = (
  formData,
  receiptFilesIds,
  referralFileId,
) => {
  const selectedPatientId = formData.patient.patientId;
  const userId = getCookie(USER_ID);
  const claimantName =
    selectedPatientId === userId
      ? `Employee|${selectedPatientId}`
      : `Dependant|${selectedPatientId}`;

  return {
    benefitPeriod: formData.planId,
    claimantName,
    receiptDate: formData.claim.consultationDate,
    receiptAmount: formData.claim.receiptAmount,
    claimReason: formData.claim.diagnosis,
    claimTypeId: formData.claim.claimId,
    claimItemName: formData.claimType,
    int1: true,
    str5: formData.patient.contactNumber,
    receiptFilesIds,
    referralFileId,
    int2: formData.claim.anotherInsurer ? 1 : 0,
    dec1: formData.claim.otherInsurerAmount,
  };
};

const isValidFileType = (validFileType, fileName) =>
  validFileType.includes(
    fileName
      .split('.')
      .pop()
      .toLowerCase(),
  );

const isValidFileSize = (validFileSize, fileSize) => fileSize <= validFileSize;

export const validateFiles = (files, validFileType, validFileSize) => {
  return files.filter(
    ({ name, size }) =>
      isValidFileType(validFileType, name) &&
      isValidFileSize(validFileSize, size),
  );
};

export const isEmpty = obj =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

export const today = () =>
  new DateFnsUtils().format(Date.now(), CONFIG.dateFormat);

export const formatDate = (
  date,
  locale = null,
  customFormat = CONFIG.dateFormat,
) => {
  try {
    const dateFnsUtil = new DateFnsUtils();
    if (date && date.includes('0001')) {
      return undefined;
    }
    if (locale) {
      dateFnsUtil.locale =
        LOCALES_MAP[locale] || LOCALES_MAP[CONFIG.locales.ENGLISH];
    }
    return dateFnsUtil.format(new Date(date), customFormat);
  } catch (e) {
    return undefined;
  }
};

export const getCurrentDate = () => new Date();

export const addDays = days => new DateFnsUtils().addDays(new Date(), days);

export const openFile = async (name, url, preloaded = true) => {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    if (!preloaded) {
      window.open(url);
      return;
    }

    const blob = await fetchFile(url);
    window.navigator.msSaveOrOpenBlob(blob, name);
    return;
  }

  window.open(url);
};
export const onEnter = (event, callback) => {
  if (callback && event.key === 'Enter') {
    callback();
  }
};

export const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const getValueFromLocalStorage = key => {
  return window.localStorage.getItem(key);
};

export const sentenceCase = input => {
  return input.replace(/\w\S*/g, word => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
};

export const delay = waitFor =>
  new Promise(resolve => {
    setTimeout(() => resolve(), waitFor);
  });

export const objectToURLParams = obj =>
  Object.keys(obj)
    .map(key => {
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join('&');

export const snakeToCamel = str =>
  str.replace(/([-_]\w)/g, g => g[1].toUpperCase());

export const objectKeySnakeToCamel = obj => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    return {
      ...result,
      [snakeToCamel(key)]: value,
    };
  }, {});
};

export const isValidLanguageCode = code => {
  return (CONFIG.supportedLanguages || []).includes(code);
};

/* istanbul ignore next */
export const captureException = (error, errorInfo = {}) => {
  Sentry.withScope(scope => {
    Object.keys(errorInfo).forEach(key => {
      scope.setExtra(key, errorInfo[key]);
    });

    if (error.response && error.response.data) {
      scope.setExtra(
        'requestErrors',
        JSON.stringify(error.response.data.errors || []),
      );
    }

    Sentry.captureException(error);
  });
};

export const removeUnicodeScript = str => {
  if (!str) return '';
  const pattern = /[\u006E\u00B0\u00B2\u00B3\u00B9\u02AF\u0670\u0711\u2121\u213B\u2207\u29B5\uFC5B-\uFC5D\uFC63\uFC90\uFCD9\u2070\u2071\u2074-\u208E\u2090-\u209C\u0345\u0656\u17D2\u1D62-\u1D6A\u2A27\u2C7C]+\s/;
  return str.replace(pattern, '').trim();
};

export const convertObjectToParam = (
  obj,
  compareSign = '=',
  delimiter = '&',
) => {
  if (typeof obj === 'object') {
    return Object.keys(obj)
      .map(key => `${key}${compareSign}${obj[key]}`)
      .join(delimiter);
  }
  return '';
};

export const lowercaseObjectKeys = obj => {
  if (typeof obj !== 'object') return {};

  const result = {};
  Object.keys(obj).forEach(key => {
    result[key.toLowerCase()] = obj[key];
  });

  return result;
};
