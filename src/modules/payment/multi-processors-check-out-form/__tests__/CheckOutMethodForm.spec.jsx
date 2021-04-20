import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import CheckOutMehodForm from '../CheckOutMethodForm';

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

  const optionConsult = {
    merchantOrderId: '87fca44b-2ef7-4a64-93fa-47de749b6455',
    purchaseId: '9127a283-bce2-480c-9e7b-4e03228decd5',
    amount: {
      value: 200,
      currency: 'SGD',
    },
    maxWalletAmount: {
      value: 100,
      currency: 'SGD',
    },
    balance: {
      value: 49500,
      currency: 'SGD',
    },
    isSufficient: true,
    payments: [
      {
        paymentProcessors: [
          {
            name: 'CREDIT_CARD',
            amount: {
              value: 200,
              currency: 'SGD',
            },
            cards: [
              {
                instrumentId: 15,
                maskedCreditCardNumber: '512345xxxxxx0008',
                creditCardType: 'MASTERCARD',
                expiryMonth: '10',
                expiryYear: '22',
              },
              {
                instrumentId: 14,
                maskedCreditCardNumber: '512345xxxxxx0008',
                creditCardType: 'MASTERCARD',
                expiryMonth: '05',
                expiryYear: '21',
              },
            ],
            sessionUrl:
              'https://ap-gateway.mastercard.com/form/version/53/merchant/TEST97485402/session.js',
          },
        ],
        paymentMethod: 'CREDIT_CARD',
      },
      {
        paymentProcessors: [
          {
            name: 'WALLET',
            amount: {
              value: 100,
              currency: 'SGD',
            },
          },
          {
            name: 'CREDIT_CARD',
            amount: {
              value: 100,
              currency: 'SGD',
            },
            cards: [
              {
                instrumentId: 15,
                maskedCreditCardNumber: '512345xxxxxx0008',
                creditCardType: 'MASTERCARD',
                expiryMonth: '10',
                expiryYear: '22',
              },
              {
                instrumentId: 14,
                maskedCreditCardNumber: '512345xxxxxx0008',
                creditCardType: 'MASTERCARD',
                expiryMonth: '05',
                expiryYear: '21',
              },
            ],
            sessionUrl:
              'https://ap-gateway.mastercard.com/form/version/53/merchant/TEST97485402/session.js',
          },
        ],
        paymentMethod: 'MIX_CC_WALLET',
      },
    ],
    extData: {
      paymentFootnoteType: 'PAYMENT_FOOTNOTE_HEALS',
      paymentInstructionSufficientType: 'PAYMENT_INSTRUCTION_SUFFICIENT_HEALS',
      paymentInstructionInsufficientType:
        'PAYMENT_INSTRUCTION_INSUFFICIENT_HEALS',
      allowPayOptionWithoutWallet: '1',
      allowSaveAsset: '1',
    },
  };

  const order = {
    merchantOrderId: '1',
    amount: 1,
    balance: 500,
    currency: 'SGD',
    balanceCurrency: 'SGD',
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

  const paymentMethods = optionConsult.payments;

  beforeEach(() => {
    Component = withIntl(withTheme(CheckOutMehodForm));

    props = {
      paymentMethods,
      checkOutOrder: jest.fn(),
      order,
      isLoadingPaymentMethods: false,
      extData: {
        paymentFootnote: 'paymentFootnote',
        paymentInstructionSufficient: 'paymentInstructionSufficient',
        paymentInstructionInsufficient: 'paymentInstructionInsufficient',
      },
      callbackUrl: '',
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
    window.PaymentSession = { updateSessionFromForm: jest.fn() };
    const { getByLabelText, getByTestId } = render(<Component {...props} />);
    const addNewNode = getByLabelText(/Pay by ADD_NEW_CARD/i, {
      selector: 'input',
    });
    fireEvent.click(addNewNode);

    const addNewCardBtnNode = getByTestId('btn-submit-checkout');
    fireEvent.click(addNewCardBtnNode);

    expect(window.PaymentSession.updateSessionFromForm).toHaveBeenCalledTimes(
      1,
    );
  });

  it('should checkout by existed card', () => {
    const { getByTestId } = render(<Component {...props} />);

    const creditCardNode = getByTestId('card_14', {
      selector: 'input',
    });
    fireEvent.click(creditCardNode);

    const checkoutByExistCardBtnNode = getByTestId('btn-submit-checkout');
    fireEvent.click(checkoutByExistCardBtnNode);

    expect(props.checkOutOrder).toHaveBeenCalledTimes(1);
  });
});
