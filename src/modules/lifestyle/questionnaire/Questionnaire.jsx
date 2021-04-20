import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import QuestionnaireHeader from './QuestionnaireHeader';
import QuestionnaireForm from './QuestionnaireForm';

const Questionnaire = ({
  initialValues,
  choicesQuestions,
  healthQuestions,
  faceAgingImageError,
  toggleErrorModal,
  getLifestyleDetails,
  submitQuestionnaire,
  futureMeImageChanged,
}) => {
  useEffect(() => {
    getLifestyleDetails();
    toggleErrorModal(false);
  }, []);

  return (
    <>
      <QuestionnaireHeader />
      <QuestionnaireForm
        choicesQuestions={choicesQuestions}
        healthQuestions={healthQuestions}
        submitQuestionnaire={submitQuestionnaire}
        initialValues={initialValues}
        futureMeImageChanged={futureMeImageChanged}
        faceAgingImageError={faceAgingImageError}
        toggleErrorModal={toggleErrorModal}
      />
    </>
  );
};

const questionPropTypes = PropTypes.arrayOf(
  PropTypes.exact({
    questionOrder: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    dependentQuestion: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    section: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.exact({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        hasInversion: PropTypes.bool,
      }),
    ).isRequired,
    activationAnswer: PropTypes.arrayOf(PropTypes.string),
    hasDefaultValue: PropTypes.bool,
    parentQuestionId: PropTypes.string,
    titleLabel: PropTypes.string,
    selectFieldLabel: PropTypes.string,
    buttonLabel: PropTypes.string,
  }).isRequired,
);

Questionnaire.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  choicesQuestions: questionPropTypes.isRequired,
  healthQuestions: questionPropTypes.isRequired,
  faceAgingImageError: PropTypes.bool.isRequired,
  toggleErrorModal: PropTypes.func.isRequired,
  getLifestyleDetails: PropTypes.func.isRequired,
  submitQuestionnaire: PropTypes.func.isRequired,
  futureMeImageChanged: PropTypes.bool.isRequired,
};

export default Questionnaire;
