import React from 'react';
import { FormSection, reduxForm } from 'redux-form';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Box, Card, Divider, withStyles } from '@material-ui/core';

import AboutMe from './AboutMeContainer';
import QuestionsSection from './QuestionsSection';
import { validate } from './validation';
import { formatMessage } from '../../../helpers/helpers';
import { QUESTIONNAIRE_TYPES, QUESTIONNAIRE_FORM } from './constants';
import Images from '../../../constants/images';
import { FutureMeContainer } from './future-me';
import TrackingButton from '../../../uiComponents/TrackingButton';
import { CATEGORIES } from '../../../constants/analytics';
import Typography from '../../../uiComponents/Typography';

import FaceAgingErrorModal from './FaceAgingErrorModal';

const styles = theme => ({
  cardRoot: {
    backgroundColor: theme.background,
    boxShadow: 'none',
  },
});

const QuestionnaireForm = ({
  intl,
  choicesQuestions,
  healthQuestions,
  faceAgingImageError,
  toggleErrorModal,
  handleSubmit,
  change,
  classes,
}) => (
  <>
    <Card classes={{ root: classes.cardRoot }}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormSection name="aboutMe">
          <AboutMe fieldChange={change} />
        </FormSection>
        <Divider />
        <FormSection name={QUESTIONNAIRE_TYPES.choices}>
          <QuestionsSection
            title={formatMessage(
              intl,
              'lifestyle.questionnaire.myChoices.header',
              'My choices',
            )}
            imageUrl={Images.LIFESTYLE_QUESTIONNAIRE_MY_CHOICES}
            questions={choicesQuestions}
          />
        </FormSection>
        <Divider />
        <FormSection name={QUESTIONNAIRE_TYPES.health}>
          <QuestionsSection
            title={formatMessage(
              intl,
              'lifestyle.questionnaire.myHealth.header',
              'My health',
            )}
            imageUrl={Images.LIFESTYLE_QUESTIONNAIRE_MY_HEALTH}
            questions={healthQuestions}
          />
        </FormSection>
        <FutureMeContainer fieldChange={change} />
        <Divider />
        <Box display="flex" justifyContent="center" pt={11} pb={16}>
          <TrackingButton
            data-testid="btn-submit-questionnaire"
            type="submit"
            color="primary"
            variant="contained"
            trackingData={{
              category: CATEGORIES.HEALTH_QUESTIONNAIRE,
              action: 'Submit health questionaire',
            }}
          >
            {formatMessage(
              intl,
              'lifestyle.questionnaire.submitButton.label',
              'Show results',
            )}
          </TrackingButton>
        </Box>
      </form>
      <FaceAgingErrorModal
        open={faceAgingImageError}
        onClose={() => toggleErrorModal(false)}
      />
    </Card>
    <Box mt={{ xs: 0, md: 10 }}>
      <Typography type="style-8" color="highEmphasis">
        {formatMessage(
          intl,
          'lifestyle.questionnaire.disclaimerTitle',
          'Disclaimer',
        )}
      </Typography>
      <Typography type="style-8" color="mediumEmphasis">
        {formatMessage(
          intl,
          'lifestyle.questionnaire.disclaimerMessage',
          'This questionnaire is designed to provide you with an indication of your lifestyle and its impact on your health/wellness. It is NOT intended to constitute professional medical advice, diagnosis or treatment, and is NOT a substitute for a medical health assessment by a qualified medical professional. If you’re experiencing signs and symptoms we recommend you seek medical attention from a qualified medical professional. By submitting this questionnaire, you do so in at your own choice and in agreement with this disclaimer.',
        )}
      </Typography>
    </Box>
  </>
);

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

QuestionnaireForm.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  choicesQuestions: questionPropTypes.isRequired,
  healthQuestions: questionPropTypes.isRequired,
  faceAgingImageError: PropTypes.bool.isRequired,
  toggleErrorModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

const onSubmitFail = errors => {
  const {
    [QUESTIONNAIRE_TYPES.aboutMe]: aboutMe,
    [QUESTIONNAIRE_TYPES.choices]: choices,
    [QUESTIONNAIRE_TYPES.health]: health,
  } = errors;
  const flattenErrors = {
    ...aboutMe,
    ...choices,
    ...health,
  };
  const firstErrorId = Object.keys(flattenErrors)[0];
  const firstErrorElement = document.querySelector(`[data-id=${firstErrorId}]`);

  firstErrorElement.scrollIntoView(true);
};

const getFilteredValues = (type, questions, values) => {
  return questions.reduce((acc, cur) => {
    const key = cur.name;
    acc[key] = values[QUESTIONNAIRE_TYPES[type]][key];
    return acc;
  }, {});
};

const onSubmit = (values, _, props) => {
  const { choicesQuestions, healthQuestions, futureMeImageChanged } = props;
  props.submitQuestionnaire({
    ...values,
    [QUESTIONNAIRE_TYPES.choices]: getFilteredValues(
      QUESTIONNAIRE_TYPES.choices,
      choicesQuestions,
      values,
    ),
    [QUESTIONNAIRE_TYPES.health]: getFilteredValues(
      QUESTIONNAIRE_TYPES.health,
      healthQuestions,
      values,
    ),
    isFaceAgingImageChanged: futureMeImageChanged,
  });
};

const QuestionnaireFormWrapper = reduxForm({
  validate,
  onSubmitFail,
  onSubmit,
  form: QUESTIONNAIRE_FORM,
  enableReinitialize: true,
})(QuestionnaireForm);

QuestionnaireFormWrapper.propTypes = {
  intl: PropTypes.shape({}).isRequired,
  choicesQuestions: PropTypes.arrayOf(
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
  ).isRequired,
  submitQuestionnaire: PropTypes.func.isRequired,
};

export default injectIntl(withStyles(styles)(QuestionnaireFormWrapper));
