import { connect } from 'react-redux';
import CheckOutResult from './CheckOutResult';
import { validateOrder } from '../action';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  validateOrder: (paRes, MD) => dispatch(validateOrder(paRes, MD)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckOutResult);
