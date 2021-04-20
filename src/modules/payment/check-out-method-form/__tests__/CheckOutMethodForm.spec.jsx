import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import CheckOutMehodForm from '../CheckOutMethodForm';

import { PAYMENT_METHODS } from '../../../../constants/types';

// eslint-disable-next-line react/prop-types
jest.mock('../../../../uiComponents/Typography', () => ({ children }) => {
  return <div>{children}</div>;
});

// eslint-disable-next-line react/prop-types
jest.mock('../../AddNewCard', () => ({ submitEnrollInstrument }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      data-testid="mock-submit-newcard"
      onClick={() => submitEnrollInstrument('sessionId')}
    />
  );
});
describe('CheckOutMehodForm Component', () => {
  let props;
  let Component;

  const order = {
    merchantOrderId: '1',
    amount: 1,
    currency: 'SGD',
    redirectUrl: 'redirectUrl',
    instrumentId: 1,
    sessionId: 'sessionId',
    orderItems: [
      {
        name: 'name',
        description: 'description',
        sku: 'sku',
        qty: 1,
        unitPrice: 1,
        unit: 'unit',
      },
    ],
  };

  const paymentMethods = [
    {
      paymentMethod: PAYMENT_METHODS.WALLET,
      amount: {
        value: 700,
        currency: 'IDR',
      },
      isSufficient: true,
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
          id: 1,
          paymentMethod: 'Credit Card',
          card: {
            maskedCreditCardNumber: '0008',
            creditCardType: 'VISA',
          },
        },
      ],
    },
  ];

  beforeEach(() => {
    Component = withIntl(withTheme(CheckOutMehodForm));

    props = {
      paymentMethods,
      checkOutOrder: jest.fn(),
      order,
      isLoadingPaymentMethods: false,
      goBack: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when there is no payment methods', () => {
    props.paymentMethods = [];
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match to snapshot with dummy payment methods', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should show add new card form and checkout by new card', () => {
    const { getByLabelText, getByTestId } = render(<Component {...props} />);
    const addNewNode = getByLabelText(/New card/i, { selector: 'input' });
    fireEvent.click(addNewNode);

    const addNewCardBtnNode = getByTestId('mock-submit-newcard');
    fireEvent.click(addNewCardBtnNode);

    expect(props.checkOutOrder).toHaveBeenCalledTimes(1);
  });

  xit('should checkout by existed card', () => {
    const { getByLabelText, getByTestId } = render(<Component {...props} />);

    const creditCardNode = getByLabelText(/0008/i, { selector: 'input' });
    fireEvent.click(creditCardNode);

    const checkoutByExistCardBtnNode = getByTestId('btn-submit-checkout');
    fireEvent.click(checkoutByExistCardBtnNode);

    expect(props.checkOutOrder).toHaveBeenCalledTimes(1);
  });
});
