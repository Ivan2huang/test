import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import FutureMe from './FutureMe';
import { QUESTIONNAIRE_TYPES } from '../constants';
import { getFaceAgingImage } from '../action';

const selector = formValueSelector('lifestyle-questionnaire');

export const mapStateToProps = (state, { fieldChange }) => ({
  futureMeImage: selector(state, `${QUESTIONNAIRE_TYPES.futureMe}.image`),
  image: state.lifestyle.questionnaire.faceAgingImage,
  fieldChange,
});

export const mapDispatchToProps = dispatch => ({
  getFaceAgingImage: () => dispatch(getFaceAgingImage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FutureMe);
