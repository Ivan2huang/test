import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../i18n/withIntlProvider';
import AddCardForm from '../AddCardForm';

// eslint-disable-next-line react/prop-types
jest.mock('../../../uiComponents/Typography', () => ({ children }) => {
  return <div>{children}</div>;
});

// eslint-disable-next-line react/prop-types
jest.mock('../AddNewCard', () => ({ submitEnrollInstrument }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      data-testid="mock-submit-newcard"
      onClick={() => submitEnrollInstrument('sessionId')}
    />
  );
});

describe('AddCardForm Component', () => {
  let Component;
  const preAuthInstrument = jest.fn();
  const submitEnrollInstrument = jest.fn();
  const props = {
    instruments: [
      {
        id: 1,
        card: {
          maskedCreditCardNumber: 'xxxxxxxxxxx1234',
        },
      },
      {
        id: 'ADD_NEW_CARD',
        card: {
          maskedCreditCardNumber: 'New Card',
        },
      },
    ],
    preAuthInstrument,
    submitEnrollInstrument,
    isLoadingInstruments: false,
  };

  beforeEach(() => {
    Component = withIntl(AddCardForm);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match to snapshot when there is  at least one instrument', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match to snapshot when there is no instruments', () => {
    const { container } = render(
      <Component
        {...{
          ...props,
          instruments: [
            {
              id: 'ADD_NEW_CARD',
              card: {
                maskedCreditCardNumber: 'New Card',
              },
            },
          ],
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should change selected instrument when click on radio button', () => {
    const { getByLabelText } = render(<Component {...props} />);

    const addNewRadioNode = getByLabelText(/New Card/i);
    const card1RadioNode = getByLabelText(/1234$/i);

    expect(addNewRadioNode.value).toEqual('ADD_NEW_CARD');
    expect(card1RadioNode.value).toEqual('1');

    fireEvent.click(card1RadioNode);
    expect(card1RadioNode.checked).toEqual(true);
    expect(addNewRadioNode.checked).toEqual(false);

    fireEvent.click(addNewRadioNode);
    expect(addNewRadioNode.checked).toEqual(true);
    expect(card1RadioNode.checked).toEqual(false);
  });

  it('should submit the corrent info when submit by existing instrument', () => {
    const { getByTestId, getByLabelText } = render(<Component {...props} />);

    const card1RadioNode = getByLabelText(/1234$/i);
    fireEvent.click(card1RadioNode);
    const submitCheckout = getByTestId('btn-submit-preauth');
    fireEvent.click(submitCheckout);

    expect(preAuthInstrument).toBeCalledTimes(1);
    expect(preAuthInstrument).toBeCalledWith('1');
  });

  it('should checkout by new card correctly', () => {
    const { getByLabelText, getByTestId } = render(<Component {...props} />);

    const addNewRadioNode = getByLabelText(/New Card/i);
    fireEvent.click(addNewRadioNode);

    const submit = getByTestId('mock-submit-newcard');
    fireEvent.click(submit);

    expect(submitEnrollInstrument).toHaveBeenCalledTimes(1);
    expect(submitEnrollInstrument).toHaveBeenCalledWith('sessionId');
  });
});
