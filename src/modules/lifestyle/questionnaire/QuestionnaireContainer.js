import { connect } from 'react-redux';
import { isDirty } from 'redux-form';

import Questionnaire from './Questionnaire';
import { submitLifeStyleQuestionnaire, toggleErrorModal } from './action';
import { questionsSelector, answerSelector } from './selector';
import { QUESTIONNAIRE_TYPES } from './constants';
import { getLifestyleDetails } from '../action';

export const mapStateToProps = state => ({
  choicesQuestions: questionsSelector(state, {
    type: QUESTIONNAIRE_TYPES.choices,
  }),
  healthQuestions: questionsSelector(state, {
    type: QUESTIONNAIRE_TYPES.health,
  }),
  initialValues: {
    aboutMe: answerSelector(state, QUESTIONNAIRE_TYPES.aboutMe),
    choices: answerSelector(state, QUESTIONNAIRE_TYPES.choices),
    health: answerSelector(state, QUESTIONNAIRE_TYPES.health),
    futureMe: {
      image: state.lifestyle.questionnaire.faceAgingImage,
    },
  },
  futureMeImageChanged: isDirty('lifestyle-questionnaire')(
    state,
    'futureMe.image',
  ),
  faceAgingImageError: state.lifestyle.questionnaire.faceAgingImageError,
});

export const mapDispatchToProps = dispatch => ({
  getLifestyleDetails: () => dispatch(getLifestyleDetails()),
  submitQuestionnaire: data => dispatch(submitLifeStyleQuestionnaire(data)),
  toggleErrorModal: isShow => dispatch(toggleErrorModal(isShow)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Questionnaire);
