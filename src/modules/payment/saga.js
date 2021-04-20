import { all, call, put, takeLeading, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';
import { captureMessage } from '@sentry/node';
import {
  updateInstrument,
  updatePaymentMethods,
  updatePaymentPurchaseMethods,
} from './action';
import {
  GET_INSTRUMENTS,
  VALIDATE_INSTRUMENT,
  SUBMIT_PRE_AUTH,
  VALIDATE_ORDER,
  GET_PAYMENT_METHODS,
  CHECK_OUT_ORDER,
  GO_BACK,
  GET_PAYMENT_PURCHASE_METHODS,
  MAKE_A_PAYMENT,
  VALIDATE_PAYMENT,
} from './actionTypes';
import {
  getInstruments,
  preAuthInstrument,
  validateInstrument,
  createOrder,
  validateOrder,
  getPaymentMethods,
  getPaymentPurchaseMethods,
  makePayment,
  validatePayment,
  getContentNote,
} from './api';
import { loader } from '../loader';
import { captureException } from '../../helpers/helpers';
import LOADER from '../../constants/loader';
import CONFIG from '../../constants/config';
import { PAYMENT_METHODS } from '../../constants/types';
import { REQUIRED_3DS, ERROR, BACK, CALLBACK_METHOD } from './constants';
import {
  convertObjectToParam,
  convertParamToObject,
  transformPaymentResponse,
} from './util';
import getLocale from '../../i18n/getLocale';

const DELIMITER = '&&';
const COMPARISON = '==';

const sentryLog = data => {
  if (CONFIG.enableSentryPayment) {
    captureMessage(JSON.stringify(data), 'log');
  }
};

export function getResponseUrl(path) {
  return typeof window !== 'undefined'
    ? `${window.location.origin}/${path}`
    : '';
}

export function redirectToUrl(callBackUrl, data) {
  const form = document.createElement('form');
  form.style.visibility = 'hidden';
  form.method = 'POST';
  form.action = callBackUrl;

  const responseInput = document.createElement('input');
  responseInput.name = 'response';
  responseInput.value = data;
  form.appendChild(responseInput);

  document.body.appendChild(form);
  form.submit();
}

export function redirectToUrlByGet(callbackUrl) {
  window.open(callbackUrl, '_self');
}

export function handleUnexpectedPaymentErrors(callBackUrl, data) {
  redirectToUrl(callBackUrl, data);
}

export const RESPONSE_URL = getResponseUrl('preauth-result');
export const CHECK_OUT_RESPONSE_URL = getResponseUrl('payment-shop-result');
export const MAKE_PAYMENT_RESPONSE_URL = getResponseUrl(
  'payment-purchase-result',
);

export function doThreeDsCheck(threeDs, callBackUrl, clientInfo) {
  sentryLog({ 'preThreeDs-raw': threeDs });
  const { acsUrl, paReq, MD } = threeDs;
  const {
    timestamp,
    merchantOrderId,
    purchaseId,
    digest,
  } = convertParamToObject(MD);

  const form = document.createElement('form');
  form.style.visibility = 'hidden';
  form.method = 'POST';
  form.action = acsUrl;

  const ascUrlInput = document.createElement('input');
  ascUrlInput.name = 'TermUrl';
  ascUrlInput.value = callBackUrl;
  form.appendChild(ascUrlInput);

  const paReqInput = document.createElement('input');
  paReqInput.name = 'PaReq';
  paReqInput.value = paReq;
  form.appendChild(paReqInput);

  const mdInput = document.createElement('input');
  mdInput.name = 'MD';
  mdInput.value = convertObjectToParam(
    {
      ...clientInfo,
      ...{
        timestamp,
        merchantOrderId,
        purchaseId,
        digest,
      },
    },
    COMPARISON,
    DELIMITER,
  );
  form.appendChild(mdInput);

  document.body.appendChild(form);
  sentryLog({ preThreeDsCheck: { MD } });
  form.submit();
}

export function threeDsCheck(
  response,
  threeDsCallbackUrl,
  callBackUrl,
  paymentInfo,
) {
  const { callbackMethod = CALLBACK_METHOD.POST } = paymentInfo;
  const { merchantOrderId, status, paymentMethods } = response;
  const payByCreditCard = paymentMethods.find(
    m => m.name === PAYMENT_METHODS.CREDIT_CARD,
  );
  const threeDs =
    get(payByCreditCard, ['extData', 'threeDs']) ||
    get(payByCreditCard, ['threeDs']);

  if (threeDs) {
    doThreeDsCheck(threeDs, threeDsCallbackUrl, paymentInfo);
  } else if (callbackMethod === CALLBACK_METHOD.POST) {
    redirectToUrl(callBackUrl, JSON.stringify({ merchantOrderId, status }));
  } else {
    redirectToUrlByGet(callBackUrl);
  }
}

export function* getInstrumentSaga({ payload: { query } }) {
  yield* loader(function*() {
    const data = yield call(getInstruments, query.clientId, query.userId);
    if (data.error) {
      handleUnexpectedPaymentErrors(
        query.callbackUrl,
        JSON.stringify(data.data),
      );
    } else {
      yield put(updateInstrument(data));
    }
  }, LOADER.page);
}

export function* submitPreAuthSaga({
  payload: { data, userId, clientId, callBackUrl },
}) {
  const clientInfo = { userId, clientId, callBackUrl };

  yield* loader(function*() {
    const response = yield call(preAuthInstrument, clientId, userId, data);

    if (response.error) {
      handleUnexpectedPaymentErrors(callBackUrl, JSON.stringify(response.data));
    } else {
      doThreeDsCheck(response.threeDs, RESPONSE_URL, clientInfo);
    }
  }, LOADER.page);
}

export function* validateInstrumentSaga({ payload: { paRes, MD } }) {
  sentryLog({ 'postThreeDsCheck-raw': { MD, paRes } });
  const {
    merchantOrderId,
    callBackUrl,
    clientId,
    userId,
    timestamp,
    digest,
  } = convertParamToObject(MD, COMPARISON, DELIMITER);

  sentryLog({
    postThreeDsCheck: {
      merchantOrderId,
      callBackUrl,
      clientId,
      userId,
      timestamp,
      digest,
    },
  });

  try {
    const data = yield call(
      validateInstrument,
      clientId,
      userId,
      merchantOrderId,
      {
        paRes,
        // Backend required the order of field is timestamp, merchantOrderId and digest
        MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
      },
    );

    sentryLog({
      validateTransaction: {
        MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
      },
    });

    if (data.error) {
      handleUnexpectedPaymentErrors(callBackUrl, JSON.stringify(data.data));
    } else {
      redirectToUrl(
        callBackUrl,
        JSON.stringify({
          merchantOrderId,
          status: data.status,
        }),
      );
    }
  } catch (e) {
    captureException(e);
    redirectToUrl(
      callBackUrl,
      JSON.stringify({
        merchantOrderId,
        status: ERROR,
      }),
    );
  }
}

export function* validateOrderSaga({ payload: { paRes, MD } }) {
  yield* loader(function*() {
    const {
      merchantOrderId,
      callBackUrl,
      clientId,
      userId,
      timestamp,
      digest,
    } = convertParamToObject(MD, COMPARISON, DELIMITER);

    try {
      const data = yield call(
        validateOrder,
        clientId,
        userId,
        merchantOrderId,
        {
          paRes,
          MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&digest=${digest}`,
        },
      );
      const { status } = data;

      if (data.error) {
        handleUnexpectedPaymentErrors(callBackUrl, JSON.stringify(data.data));
      } else {
        redirectToUrl(callBackUrl, JSON.stringify({ merchantOrderId, status }));
      }
    } catch (e) {
      captureException(e);
      redirectToUrl(
        callBackUrl,
        JSON.stringify({ merchantOrderId, status: ERROR }),
      );
    }
  }, LOADER.page);
}

export function* getPaymentMethodsSaga({ payload: { query } }) {
  const { clientId, userId, callbackUrl, ...params } = query;
  yield* loader(function*() {
    const data = yield call(getPaymentMethods, clientId, userId, params);
    if (data.error) {
      handleUnexpectedPaymentErrors(callbackUrl, JSON.stringify(data.data));
    } else {
      yield put(updatePaymentMethods(data));
    }
  }, LOADER.page);
}

export function* checkOutOrderSaga({
  payload: { order, clientId, userId, callBackUrl },
}) {
  yield* loader(function*() {
    const response = yield call(createOrder, clientId, userId, order);
    const { merchantOrderId, status } = response;

    const clientInfo = { userId, clientId, callBackUrl };

    if (response.error) {
      handleUnexpectedPaymentErrors(callBackUrl, JSON.stringify(response.data));
    } else if (status === REQUIRED_3DS) {
      threeDsCheck(response, CHECK_OUT_RESPONSE_URL, callBackUrl, clientInfo);
    } else {
      redirectToUrl(callBackUrl, JSON.stringify({ merchantOrderId, status }));
    }
  }, LOADER.page);
}

export function* goBackSaga({
  payload: { url, callbackMethod = CALLBACK_METHOD.POST },
}) {
  if (callbackMethod === CALLBACK_METHOD.POST) {
    yield redirectToUrl(url, JSON.stringify({ status: BACK }));
  } else {
    redirectToUrlByGet(url);
  }
}

const getNoteContent = (contentTypesResponse = [], type) => {
  const note = contentTypesResponse.find(c => c.type === type) || {};

  return note.content;
};

export function* getPaymentPurchaseMethodsSaga({
  payload: { purchaseId, callbackUrl },
}) {
  yield* loader(function*() {
    const response = yield call(getPaymentPurchaseMethods, purchaseId);
    if (response.error) {
      redirectToUrlByGet(callbackUrl);
    } else {
      const locale = getLocale();
      const { extData } = response;
      const {
        allowPayOptionWithoutWallet,
        allowSaveAsset,
        paymentFootnoteType,
        paymentInstructionInsufficientType,
        paymentInstructionSufficientType,
      } = extData;
      const contentTypesResponse = yield call(getContentNote, locale, [
        paymentFootnoteType,
        paymentInstructionInsufficientType,
        paymentInstructionSufficientType,
      ]);
      if (contentTypesResponse.error) {
        redirectToUrlByGet(callbackUrl);
      } else {
        response.extData = {
          ...extData,
          allowPayOptionWithoutWallet: allowPayOptionWithoutWallet === '1',
          allowSaveAsset: allowSaveAsset === '1',
          paymentFootnote: getNoteContent(
            contentTypesResponse,
            paymentFootnoteType,
          ),
          paymentInstructionInsufficient: getNoteContent(
            contentTypesResponse,
            paymentInstructionInsufficientType,
          ),
          paymentInstructionSufficient: getNoteContent(
            contentTypesResponse,
            paymentInstructionSufficientType,
          ),
        };
        yield put(updatePaymentPurchaseMethods(response));
      }
    }
  }, LOADER.page);
}

export function* makePaymentSaga({ payload: { data } }) {
  yield* loader(function*() {
    const { purchaseId, order, callbackUrl } = data;
    const { merchantOrderId, amount, payment } = order;
    const postData = {
      merchantOrderId,
      amount,
      payment,
    };
    const response = yield call(makePayment, purchaseId, postData);
    const { status } = response;
    const clientInfo = { callbackUrl, callbackMethod: CALLBACK_METHOD.GET };

    if (!response.error && status === REQUIRED_3DS) {
      threeDsCheck(
        transformPaymentResponse(response),
        MAKE_PAYMENT_RESPONSE_URL,
        callbackUrl,
        clientInfo,
      );
    } else {
      redirectToUrlByGet(callbackUrl);
    }
  }, LOADER.page);
}

export function* validatePaymentSaga({ payload: { paRes, MD } }) {
  yield* loader(function*() {
    const {
      callbackUrl,
      timestamp,
      purchaseId,
      merchantOrderId,
      digest,
    } = convertParamToObject(MD, COMPARISON, DELIMITER);

    yield call(validatePayment, purchaseId, {
      paRes,
      MD: `timestamp=${timestamp}&merchantOrderId=${merchantOrderId}&purchaseId=${purchaseId}&digest=${digest}`,
    });
    redirectToUrlByGet(callbackUrl);
  }, LOADER.page);
}

export default function* paymentSaga() {
  yield all([
    takeLatest(GET_INSTRUMENTS, getInstrumentSaga),
    takeLeading(SUBMIT_PRE_AUTH, submitPreAuthSaga),
    takeLeading(VALIDATE_INSTRUMENT, validateInstrumentSaga),
    takeLeading(VALIDATE_ORDER, validateOrderSaga),
    takeLatest(GET_PAYMENT_METHODS, getPaymentMethodsSaga),
    takeLeading(CHECK_OUT_ORDER, checkOutOrderSaga),
    takeLeading(GO_BACK, goBackSaga),
    takeLatest(GET_PAYMENT_PURCHASE_METHODS, getPaymentPurchaseMethodsSaga),
    takeLeading(MAKE_A_PAYMENT, makePaymentSaga),
    takeLeading(VALIDATE_PAYMENT, validatePaymentSaga),
  ]);
}
