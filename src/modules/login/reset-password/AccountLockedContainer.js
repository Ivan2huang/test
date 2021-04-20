import { connect } from 'react-redux';
import ERROR from '../../../constants/error';
import AccountLocked from './AccountLocked';

export const mapStateToProps = state => {
  const error = state.error[ERROR.resetPassword.accountLocked] || {};
  return {
    messsage: error.errorState,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AccountLocked);
