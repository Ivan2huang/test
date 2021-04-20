import React from 'react';
import * as PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';

import { Box, withStyles } from '@material-ui/core';

import Typography from '../../../uiComponents/Typography';
import renderDropdown from '../../../utils/renderDropdown';
import renderRadioGroup from '../../../utils/renderRadioGroup';
import renderCustomCheckboxGroup from './renderCustomCheckboxGroup';
import { formatMessage } from '../../../helpers/helpers';
import { logAction } from '../../../helpers/firebase';
import { CATEGORIES } from '../../../constants/analytics';

const styles = () => ({
  fieldset: {
    margin: 0,
    padding: 0,
    border: 0,
    '& legend': {
      width: '100%',
    },
  },
});

const questionTrackingActions = {
  smokingBehaviour: 'Smoke frequency question',
  alcoholConsumptionFrequency: 'Drink frequency question',
  exerciseFrequency: 'Exercise frequency question',
  eatingIntentionPerseverance: 'Give up dieting question',
  distractedFromTheWayIWantToEat: 'Distracted question',
  hereditaryDiabetes: 'Parents/siblings diabetes question',
  uninterestFrequency: 'Depressed question',
};

const trackingData = question => {
  if (questionTrackingActions[question]) {
    logAction({
      category: CATEGORIES.HEALTH_QUESTIONNAIRE,
      action: questionTrackingActions[question],
    });
  }
};

const renderRadio = (intl, question) => {
  const onChange = () => {
    trackingData(question.name);
  };

  return (
    <Field
      name={question.name}
      items={question.options}
      displayProperty="label"
      valueProperty="value"
      errorMessage={formatMessage(
        intl,
        'lifestyle.questionnaire.question.error',
        'Select an answer',
      )}
      component={renderRadioGroup}
      onChange={onChange}
    />
  );
};

const renderSingleSelect = (intl, question) => {
  const onChange = () => {
    trackingData(question.name);
  };
  return (
    <Field
      name={question.name}
      label={question.selectFieldLabel}
      items={question.options}
      displayProperty="label"
      valueProperty="value"
      errorMessage={formatMessage(
        intl,
        'lifestyle.questionnaire.question.error',
        'Select an answer',
      )}
      onChange={onChange}
      component={renderDropdown}
    />
  );
};

const renderMultiSelect = (intl, question) => (
  <Field
    name={question.name}
    items={question.options}
    displayProperty="label"
    valueProperty="value"
    errorMessage={formatMessage(
      intl,
      'lifestyle.questionnaire.question.error',
      'Select an answer',
    )}
    component={renderCustomCheckboxGroup}
  />
);

const componentMap = {
  radio: renderRadio,
  singleSelect: renderSingleSelect,
  multiselect: renderMultiSelect,
};

const Questions = ({ intl, classes, questions }) =>
  questions.map(question => (
    <Box
      key={question.questionId}
      mb={{ xs: 12, md: 14 }}
      data-id={question.name}
    >
      <fieldset className={classes.fieldset}>
        <legend>
          <Typography type="style-6">{question.text}</Typography>
        </legend>
        {componentMap[question.type](intl, question)}
      </fieldset>
    </Box>
  ));

Questions.propTypes = {
  questions: PropTypes.arrayOf(
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
};

export default injectIntl(withStyles(styles)(Questions));
