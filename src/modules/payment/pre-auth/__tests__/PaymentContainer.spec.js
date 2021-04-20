import { mapStateToProps, mapDispatchToProps } from '../PaymentContainer';

describe('Payment Container', () => {
  const instrumentId = 1;
  const sessionId = 'SESSIONID';
  const userId = 3;
  const clientId = 'ocbc2';
  const callBackUrl = 'http://redirect.com';

  it('should get list instruments', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_INSTRUMENTS',
      payload: {
        query: '3',
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getInstrument('3');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should submit preauth with selected instrument', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'SUBMIT_PRE_AUTH',
      payload: {
        data: {
          instrumentId,
        },
        userId,
        clientId,
        callBackUrl,
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.preAuthInstrument(
      {
        instrumentId,
      },
      userId,
      clientId,
      callBackUrl,
    );

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should enroll new instrument', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'SUBMIT_PRE_AUTH',
      payload: {
        data: {
          sessionId,
        },
        userId,
        clientId,
        callBackUrl,
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.preAuthInstrument(
      {
        sessionId,
      },
      userId,
      clientId,
      callBackUrl,
    );

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should add new instrument and render empty instrument list when init', () => {
    const state = {
      payment: {
        instruments: [],
        isLoadingInstruments: false,
        isSubmittingPreAuth: false,
      },
    };

    const ownProps = {
      intl: {
        formatMessage: jest.fn().mockReturnValue('New Card'),
      },
    };

    const stateProps = mapStateToProps(state, ownProps);

    const expected = {
      instruments: [
        {
          id: 'ADD_NEW_CARD',
          card: {
            maskedCreditCardNumber: 'New Card',
          },
        },
      ],
      isLoadingInstruments: false,
      isSubmittingPreAuth: false,
    };

    expect(stateProps).toEqual(expected);
  });
});
