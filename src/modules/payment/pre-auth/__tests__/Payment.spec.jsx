import React from 'react';

import { render, fireEvent, cleanup } from '@testing-library/react';
import 'jest-dom/extend-expect';

import Payment from '../Payment';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ children, props }) => (
    <div {...props}>
      GridItem Component
      {children}
    </div>
  ),
);

describe('Payment Component', () => {
  let props;
  const Component = withTheme(withIntl(Payment));

  beforeEach(() => {
    props = {
      router: {
        query: {
          query: {
            user_id: 3,
          },
        },
      },
      instruments: [],
      getInstrument: jest.fn(),
      preAuthInstrument: jest.fn(),
      submitEnrollInstrument: jest.fn(),
      callbackUrl: 'https://httpbin.org/post',
      jwt: 'JWT',
      isLoadingInstruments: false,
      isSubmittingPreAuth: false,
      mpgsSessionUrl:
        'https://ap-gateway.mastercard.com/form/version/53/merchant/TEST97485401/session.js',
    };

    window.PaymentSession = {};
    window.PaymentSession.configure = jest.fn().mockReturnValue({});
    window.PaymentSession.updateSessionFromForm = jest.fn();
  });

  afterEach(cleanup);

  it('should match the snapshot with loading circle', () => {
    props.isSubmittingPreAuth = true;
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with add new card', () => {
    props.instruments = [
      {
        id: 'ADD_NEW_CARD',
        card: {
          maskedCreditCardNumber: 'Formatted message',
        },
      },
    ];

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with 2 instrument', () => {
    props.instruments = [
      {
        id: 'ADD_NEW_CARD',
        card: {
          maskedCreditCardNumber: 'Formatted message',
        },
      },
      {
        id: 2,
        card: {
          maskedCreditCardNumber: 'xxx2',
        },
      },
      {
        id: 3,
        card: {
          maskedCreditCardNumber: 'xxx3',
        },
      },
    ];

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should change selected instrument when click on radio button', () => {
    props.instruments = [
      {
        id: 'ADD_NEW_CARD',
        card: {
          maskedCreditCardNumber: 'Formatted message',
        },
      },
      {
        id: 2,
        card: {
          id: 2,
          maskedCreditCardNumber: 'xxx2',
        },
      },
      {
        id: 3,
        card: {
          id: 3,
          maskedCreditCardNumber: 'xxx3',
        },
      },
    ];

    const { getByLabelText } = render(<Component {...props} />);

    const addNewRadioNode = getByLabelText(/formatted message/i);
    const card1RadioNode = getByLabelText(/xxx2/i);
    const card2RadioNode = getByLabelText(/xxx3/i);

    expect(addNewRadioNode.value).toEqual('ADD_NEW_CARD');
    expect(card1RadioNode.value).toEqual('2');
    expect(card2RadioNode.value).toEqual('3');

    fireEvent.click(card1RadioNode);
    expect(card1RadioNode.checked).toEqual(true);
    expect(card2RadioNode.checked).toEqual(false);
    expect(addNewRadioNode.checked).toEqual(false);

    fireEvent.click(card2RadioNode);
    expect(card2RadioNode.checked).toEqual(true);
    expect(card1RadioNode.checked).toEqual(false);
    expect(addNewRadioNode.checked).toEqual(false);

    fireEvent.click(addNewRadioNode);
    expect(addNewRadioNode.checked).toEqual(true);
    expect(card1RadioNode.checked).toEqual(false);
    expect(card2RadioNode.checked).toEqual(false);
  });

  it('should have the add card form in document', () => {
    props.instruments = [
      {
        id: 'ADD_NEW_CARD',
        card: {
          maskedCreditCardNumber: 'Formatted message',
        },
      },
    ];

    const { getByTestId } = render(<Component {...props} />);
    const masterCardButtonNode = getByTestId('btn-submit-card');

    expect(masterCardButtonNode).toBeInTheDocument();
  });

  it('should submit preauth', () => {
    props.instruments = [
      {
        id: 'ADD_NEW_CARD',
        card: {
          maskedCreditCardNumber: 'Formatted message',
        },
      },
      {
        id: 2,
        card: {
          id: 2,
          maskedCreditCardNumber: 'xxx2',
        },
      },
    ];

    const { getByLabelText, getByTestId } = render(<Component {...props} />);
    const card1RadioNode = getByLabelText(/xxx2/i);

    fireEvent.click(card1RadioNode);

    const submitPreAuthNode = getByTestId('btn-submit-preauth');
    fireEvent.click(submitPreAuthNode);

    expect(props.preAuthInstrument).toHaveBeenCalled();
  });
});
