import { connect } from 'react-redux';

import { QUESTIONNAIRE_FORM } from './constants';
import AboutMe from './AboutMe';

export const mapStateToProps = state => {
  return { data: state.form[QUESTIONNAIRE_FORM].values.aboutMe };
};

export default connect(mapStateToProps)(AboutMe);
