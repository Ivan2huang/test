import { connect } from 'react-redux';
import LanguageSelection from './language-selection';
import { updateLanguagePreference } from '../modules/me/settings/action';

const mapDispatchToProps = {
  updateLanguagePreference,
};

export default connect(
  null,
  mapDispatchToProps,
)(LanguageSelection);
