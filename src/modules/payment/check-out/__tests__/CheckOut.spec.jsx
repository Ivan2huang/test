import React from 'react';

import { render, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import CheckOut from '../CheckOut';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import withRedux from '../../../../redux/withReduxProvider';

jest.mock(
  '../../CheckOutMethodFormContainer',
  // eslint-disable-next-line react/prop-types
  () => ({ children, props }) => (
    <div {...props}>
      Dummy CheckOutMethodFormContainer Component
      {children}
    </div>
  ),
);

describe('CheckOut Component', () => {
  let props;
  const Component = withRedux(withTheme(withIntl(CheckOut)));

  beforeEach(() => {
    props = {
      router: {
        query: {
          query: {
            user_id: '3',
            client_id: '3',
          },
        },
      },
      getPaymentMethods: jest.fn(),
      checkOutOrder: jest.fn(),
      callbackUrl: 'https://httpbin.org',
      isLoadingPaymentMethods: false,
      isCheckingOut: false,
      goBack: jest.fn(),
      order: {
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
      },
      mpgsSessionUrl: 'http://localhost',
    };

    window.PaymentSession = {};
    window.PaymentSession.configure = jest.fn().mockReturnValue({});
    window.PaymentSession.updateSessionFromForm = jest.fn();
  });

  afterEach(cleanup);

  it('should match the snapshot with loading circle', () => {
    props.isCheckingOut = true;
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with dummy checkout form', () => {
    props.isCheckingOut = false;
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should call get payment methods', () => {
    const postParams = {
      clientId: props.router.query.query.client_id,
      userId: props.router.query.query.user_id,
      amount: props.order.amount,
      currency: props.order.currency,
      callbackUrl: 'https://httpbin.org',
    };

    render(<Component {...props} />);

    expect(props.getPaymentMethods).toHaveBeenCalledTimes(1);
    expect(props.getPaymentMethods).toHaveBeenCalledWith(postParams);
  });
});
