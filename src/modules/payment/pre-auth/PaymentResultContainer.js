import { connect } from 'react-redux';
import PaymentResult from './PaymentResult';
import { validateInstrument } from '../action';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  validateInstrument: (paRes, MD) => dispatch(validateInstrument(paRes, MD)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentResult);
