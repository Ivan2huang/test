import { connect } from 'react-redux';
import { getProductName } from '../reset-password/action';
import OnBoardingSuccess from './OnBoardingSuccess';

export const mapStateToProps = state => ({
  productName: state.resetPassword.productName,
});

export const mapDispatchToProps = dispatch => ({
  getProductName: (locale, fallbackName) =>
    dispatch(getProductName(locale, fallbackName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnBoardingSuccess);
