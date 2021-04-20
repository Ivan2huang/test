import { compose } from 'redux';
import withPaymentLayout from '../../layouts/withPaymentLayoutProvider';
import { Purchase } from '../../modules/payment';
import withAuth from '../../authentication/withAuthProvider';

export default compose(
  withAuth,
  withPaymentLayout,
)(Purchase);
