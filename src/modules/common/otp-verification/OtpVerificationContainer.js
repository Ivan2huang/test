import { connect } from 'react-redux';
import { loaderDetail } from '../../loader/util';
import LOADER from '../../../constants/loader';
import OtpVerification from './OtpVerification';

export const mapStateToProps = ({ loader }) => ({
  ...loaderDetail(loader, LOADER.page),
});

export default connect(mapStateToProps)(OtpVerification);
