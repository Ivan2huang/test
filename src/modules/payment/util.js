import padStart from 'lodash/padStart';
import {
  CREDIT_CARD_NUMBER_LENGTH,
  CREDIT_CARD_NUMBER_MASK_CHAR,
} from './constants';

export const maskingCreditCardNumber = number => {
  const standardLengthCard = padStart(
    `${number}`,
    CREDIT_CARD_NUMBER_LENGTH,
    CREDIT_CARD_NUMBER_MASK_CHAR,
  );
  const lastNumber = standardLengthCard.slice(-4);
  let maskedNumber = '';

  for (let i = 0; i < standardLengthCard.length - 4; i += 1) {
    maskedNumber += CREDIT_CARD_NUMBER_MASK_CHAR;
    maskedNumber += i % 4 === 3 ? ' ' : '';
  }

  return `${maskedNumber} ${lastNumber}`;
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

export const convertParamToObject = (
  str,
  compareSign = '=',
  delimiter = '&',
) => {
  if (typeof str !== 'string') {
    return {};
  }
  return str.split(delimiter).reduce((result, item) => {
    const [name, value] = item.split(compareSign);
    return {
      ...result,
      [name]: value,
    };
  }, {});
};

export const loadScript = (url, cb) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  // IE
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        cb();
      }
    };
  } else {
    script.onload = cb;
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

export const transformPaymentResponse = response => {
  const { payment } = response;
  return {
    ...response,
    paymentMethods: payment.paymentProcessors,
  };
};
