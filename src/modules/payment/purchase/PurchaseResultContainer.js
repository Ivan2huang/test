import { connect } from 'react-redux';
import PurchaseResult from './PurchaseResult';
import { validatePayment } from '../action';

export const mapDispatchToProps = {
  validatePayment,
};

export default connect(
  null,
  mapDispatchToProps,
)(PurchaseResult);
