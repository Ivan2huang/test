import * as actionTypes from '../../actionTypes';
import { mapDispatchToProps, mapStateToProps } from '../CheckOutContainer';

const order = {
  merchantOrderId: '001',
  amount: 100,
  currency: '$',
  redirectUrl: 'https://httpbin.org',
  instrumentId: 3,
  sessionId: 'XXX001',
  orderItems: [
    {
      name: 'ORDER-1',
      description: 'DESCRIPTION',
      sku: 'SKU-1',
      qty: 1,
      unitPrice: 100,
      unit: 'UNIT-1',
    },
  ],
};

describe('Checkout Container', () => {
  it('should get list payment methods', () => {
    const dispatch = jest.fn();
    const expected = {
      type: actionTypes.GET_PAYMENT_METHODS,
      payload: {
        query: {
          clientId: '3',
          userId: '3',
          params: {
            dummy: 'test',
          },
        },
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getPaymentMethods(expected.payload.query);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should checkout order', () => {
    const dispatch = jest.fn();
    const expected = {
      type: actionTypes.CHECK_OUT_ORDER,
      payload: {
        order,
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.checkOutOrder(order);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should init state', () => {
    const state = {
      payment: { isLoadingPaymentMethods: false, isCheckingOut: false },
    };

    const stateProps = mapStateToProps(state);

    const expected = {
      isLoadingPaymentMethods: false,
      isCheckingOut: false,
    };

    expect(stateProps).toEqual(expected);
  });
});
