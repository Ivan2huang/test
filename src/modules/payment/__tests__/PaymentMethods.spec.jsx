import React from 'react';

import { render } from '@testing-library/react';
import 'jest-dom/extend-expect';

import withIntl from '../../../i18n/withIntlProvider';
import withTheme from '../../../themes/withThemeProvider';
import { PAYMENT_METHODS } from '../../../constants/types';
import PaymentMethods from '../PaymentMethods';
import { ADD_NEW_CARD } from '../constants';

let props;
let Component;

beforeEach(() => {
  props = {
    selectedCardId: '',
    paymentMethods: [
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
    ],
    onCardChanged: jest.fn(),
  };

  Component = withIntl(withTheme(PaymentMethods));
});

describe('PaymentMethods Component', () => {
  it('should match snapshot when wallet is inSufficient', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when wallet is sufficient', () => {
    props = {
      ...props,
      paymentMethods: [
        {
          paymentMethod: PAYMENT_METHODS.WALLET,
          amount: {
            value: 700,
            currency: 'IDR',
          },
          isSufficient: true,
        },
      ],
    };
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should select add new card form when have no credit cards', () => {
    props.paymentMethods[1].cards = [];

    render(<Component {...props} />);

    expect(props.onCardChanged).toHaveBeenCalledTimes(1);
    expect(props.onCardChanged).toHaveBeenCalledWith(ADD_NEW_CARD);
  });

  it('should select first card when have credit cards', () => {
    render(<Component {...props} />);

    expect(props.onCardChanged).toHaveBeenCalledTimes(1);
    expect(props.onCardChanged).toHaveBeenCalledWith(
      props.paymentMethods[1].cards[0].id,
    );
  });
});
