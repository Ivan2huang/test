import {
  getInstruments,
  preAuthInstrument,
  validateInstrument,
  createOrder,
  validateOrder,
  getPaymentMethods,
  getMPGSSessionUrl,
  getPaymentPurchaseMethods,
  makePayment,
  validatePayment,
} from '../api';
import URL from '../../../helpers/url';
import { PAYMENT_METHODS } from '../../../constants/types';
import { fetchData } from '../fetch';

jest.mock('../fetch', () => ({
  fetchData: jest.fn(),
}));

jest.mock('../../../helpers/auth', () => ({
  getCookie: jest.fn(() => 'payment_jwt'),
}));

describe('Payment Api', () => {
  const userId = 1;
  const clientId = 3;

  beforeEach(() => {
    fetchData.mockClear();
  });

  describe('Get Instrument Api', () => {
    it('should return the instrument list', async () => {
      const expected = [
        {
          id: 1,
          card: {
            maskedCreditCardNumber: '1',
          },
        },
      ];
      fetchData.mockReturnValue(expected);

      const actual = await getInstruments(clientId, userId);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        URL.paymentListInstruments(clientId, userId),
        null,
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await getInstruments(clientId, userId);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        URL.paymentListInstruments(clientId, userId),
        null,
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });

    it('should return payment methods list', async () => {
      const expected = [
        {
          paymentMethod: PAYMENT_METHODS.WALLET,
          amount: {
            value: 700,
            currency: 'IDR',
          },
        },
        {
          paymentMethod: PAYMENT_METHODS.CREDIT_CARD,
          originalAmount: {
            value: 300,
            currency: 'IDR',
          },
          amount: {
            value: 0.029,
            currency: 'SGD',
          },
          cards: [
            {
              id: '1',
              paymentMethod: 'Credit Card',
              card: {
                maskedCreditCardNumber: '0008',
                creditCardType: 'VISA',
              },
            },
          ],
        },
      ];
      fetchData.mockReturnValue(expected);

      const actual = await getPaymentMethods(clientId, userId, {});

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        URL.getPaymentMethods(clientId, userId, {}),
        null,
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Pre Auth Instrument Api', () => {
    it('should return order id', async () => {
      const data = {};
      const expected = 1;
      fetchData.mockReturnValue(expected);

      const actual = await preAuthInstrument(clientId, userId, data);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'post',
        URL.paymentSubmitInstruments(clientId, userId),
        data,
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const data = {};
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await preAuthInstrument(clientId, userId, data);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'post',
        URL.paymentSubmitInstruments(clientId, userId),
        data,
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Validate Instrument Api', () => {
    it('should return true', async () => {
      const data = { paRes: 'paRes' };
      const orderId = 1;
      const expected = true;
      fetchData.mockReturnValue(expected);

      const actual = await validateInstrument(clientId, userId, orderId, data);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'put',
        URL.validateInstrument(clientId, userId, orderId),
        { paRes: data.paRes },
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const data = { paRes: 'paRes' };
      const orderId = 1;
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await validateInstrument(clientId, userId, orderId, data);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'put',
        URL.validateInstrument(clientId, userId, orderId),
        { paRes: data.paRes },
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Create Order Api', () => {
    it('should return created order', async () => {
      const expected = { id: 1 };
      fetchData.mockReturnValue(expected);

      const actual = await createOrder(clientId, userId, expected);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'post',
        URL.createOrder(clientId, userId),
        expected,
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await createOrder(clientId, userId, expected);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'post',
        URL.createOrder(clientId, userId),
        expected,
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Validate Order Api', () => {
    it('should return true', async () => {
      const merchantOrderId = 1;
      const data = { paRes: 'paRes' };
      const expected = true;
      fetchData.mockReturnValue(expected);

      const actual = await validateOrder(
        clientId,
        userId,
        merchantOrderId,
        data,
      );

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'put',
        URL.validateOrder(clientId, userId, merchantOrderId),
        { paRes: data.paRes },
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const merchantOrderId = 1;
      const data = { paRes: 'paRes' };
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await validateOrder(
        clientId,
        userId,
        merchantOrderId,
        data,
      );

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'put',
        URL.validateOrder(clientId, userId, merchantOrderId),
        { paRes: data.paRes },
        { Authorization: 'Bearer payment_jwt' },
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Get MPGS Session Url', () => {
    const jwt = 'mock_jwt';
    beforeEach(() => {
      process.env = Object.assign(process.env, {
        PAYMENT_SERVICE: 'http://localhost:3000/',
      });
    });

    it('should return MPGS Session Url', async () => {
      const expected = {
        mpgsSessionUrl:
          'https://ap-gateway.mastercard.com/form/version/53/merchant/TEST97485401/session.js',
      };
      fetchData.mockReturnValue(expected);

      const actual = await getMPGSSessionUrl(jwt);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        `${process.env.PAYMENT_SERVICE}${URL.getMPGSSessionUrl}`,
        {},
        { Authorization: `Bearer ${jwt}` },
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await getMPGSSessionUrl(jwt);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        `${process.env.PAYMENT_SERVICE}${URL.getMPGSSessionUrl}`,
        {},
        { Authorization: `Bearer ${jwt}` },
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Get Payment purchase methods Api', () => {
    const purchaseId = 'purchaseId';
    it('should return the instrument list', async () => {
      const expected = [
        {
          id: 1,
          card: {
            maskedCreditCardNumber: '1',
          },
        },
      ];
      fetchData.mockReturnValue(expected);

      const actual = await getPaymentPurchaseMethods(purchaseId);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        URL.getPaymentPurchaseMethods(purchaseId),
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await getPaymentPurchaseMethods(purchaseId);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        URL.getPaymentPurchaseMethods(purchaseId),
      );
      expect(actual).toEqual(expected);
    });

    it('should return payment methods list', async () => {
      const expected = {
        merchantOrderId: 'baec812c-0020-4cf7-a3ac-0239fd519888',
        purchaseId: 'e7383366-40d8-4449-acec-019623dd1e26',
        amount: { value: 10000, currency: 'HKD' },
        isSufficient: true,
        payments: [
          {
            paymentProcessors: [
              {
                name: 'CREDIT_CARD',
                amount: { value: 10000, currency: 'HKD' },
                cards: [
                  {
                    instrumentId: 1,
                    maskedCreditCardNumber: '450875xxxxxx1019',
                    creditCardType: 'VISA',
                    expiryMonth: '05',
                    expiryYear: '21',
                  },
                ],
                sessionUrl:
                  'https://ap-gateway.mastercard.com/form/version/53/merchant/TEST010826278/session.js',
              },
            ],
            paymentMethod: 'CREDIT_CARD',
          },
        ],
      };
      fetchData.mockReturnValue(expected);

      const actual = await getPaymentPurchaseMethods(purchaseId);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'get',
        URL.getPaymentPurchaseMethods(purchaseId),
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Make Payment Api', () => {
    const purchaseId = 'purchaseId';

    it('should return created order', async () => {
      const expected = { merchantOrderId: 'merchantOrderId' };
      fetchData.mockReturnValue(expected);

      const actual = await makePayment(purchaseId, expected);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'post',
        URL.makePayment(purchaseId),
        expected,
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await makePayment(purchaseId, expected);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'post',
        URL.makePayment(purchaseId),
        expected,
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('Validate Payment Api', () => {
    const purchaseId = 'purchaseId';

    it('should return true', async () => {
      const data = { paRes: 'paRes' };
      const expected = true;
      fetchData.mockReturnValue(expected);

      const actual = await validatePayment(purchaseId, data);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'put',
        URL.makePayment(purchaseId),
        data,
      );
      expect(actual).toEqual(expected);
    });

    it('should return an error object if there is any error', async () => {
      const data = { paRes: 'paRes' };
      const expected = { error: {} };
      fetchData.mockReturnValue(expected);

      const actual = await validatePayment(purchaseId, data);

      expect(fetchData).toBeCalledTimes(1);
      expect(fetchData).toBeCalledWith(
        'put',
        URL.makePayment(purchaseId),
        data,
      );
      expect(actual).toEqual(expected);
    });
  });
});
