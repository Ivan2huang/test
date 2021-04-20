import { connect } from 'react-redux';

import { getContactInfo } from '../action';
import ContactUs from './ContactUs';

export const mapStateToProps = ({ miscData: { contactInfo } }) => ({
  contactInfo,
});

export const mapDispatchToProps = dispatch => ({
  getContactInfo: locale => dispatch(getContactInfo(locale)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactUs);
