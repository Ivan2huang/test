import { connect } from 'react-redux';
import Payment from './Payment';
import { getInstrument, submitPreAuth } from '../action';
import { ADD_NEW_CARD } from '../constants';

export const mapStateToProps = (state, ownProps) => {
  return {
    instruments: [
      ...(state.payment.instruments || []),
      {
        id: ADD_NEW_CARD,
        card: {
          maskedCreditCardNumber: ownProps.intl.formatMessage({
            id: 'payment.paymentForm.newCard.label',
            defaultMessage: 'New card',
          }),
        },
      },
    ],
    isLoadingInstruments: state.payment.isLoadingInstruments,
    isSubmittingPreAuth: state.payment.isSubmittingPreAuth,
  };
};

export const mapDispatchToProps = dispatch => ({
  getInstrument: query => dispatch(getInstrument(query)),
  preAuthInstrument: (data, userId, clientId, callBackUrl) =>
    dispatch(submitPreAuth(data, userId, clientId, callBackUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payment);
