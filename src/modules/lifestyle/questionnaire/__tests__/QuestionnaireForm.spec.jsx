/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import QuestionnaireForm from '../QuestionnaireForm';
import withRedux from '../../../../redux/withReduxProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import { validate } from '../validation';

jest.mock('../validation', () => ({
  validate: jest.fn(() => ({})),
}));

jest.mock('../AboutMeContainer', () => props => {
  // eslint-disable-next-line global-require
  const { Field } = require('redux-form');
  return (
    <div>
      AboutMeContainer Component
      <span data-id="height" />
      <Field component="input" name="height" />
      <span>{mockPropsCapture(props)}</span>
    </div>
  );
});

jest.mock('../QuestionsSection', () => props => (
  <div>
    QuestionsSection Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

jest.mock('../future-me', () => ({
  FutureMeContainer: props => (
    <div>
      FutureMeContainer Component
      <span>{mockPropsCapture(props)}</span>
    </div>
  ),
}));

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: (intl, id, defaultMessage) => defaultMessage,
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div>
    Typography Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

describe('QuestionnaireForm Component', () => {
  const props = {
    choicesQuestions: [
      {
        questionOrder: '1',
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        text:
          'What is your current cigarettes (including hand-rolled cigarettes) smoking behaviour?',
        section: 'choices',
        options: [
          {
            label: 'Non-smoker',
            value: 'NonSmoker',
          },
          {
            label: 'Ex-smoker',
            value: 'ExSmoker',
          },
        ],
      },
      {
        questionOrder: '2',
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
        text:
          'How often you have a drink containing alcohol? 12.5 grams of alcohol per drink - Beer - 12oz (355ml), Wine - 5 oz (148ml), Spirits - 1.5 oz (44ml).',
        section: 'choices',
        options: [
          {
            label: 'Never',
            value: 'Never',
          },
          {
            label: 'Monthly or less',
            value: 'MonthlyOrLess',
          },
        ],
      },
    ],
    healthQuestions: [
      {
        questionOrder: '1',
        questionId: 'health_3.1',
        dependentQuestion: false,
        name: 'hereditaryDiabetes',
        type: 'radio',
        text:
          'Have any of your parents or siblings been diagnosed with diabetes?',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
      },
      {
        questionOrder: '2',
        questionId: 'health_3.2',
        dependentQuestion: false,
        name: 'highBloodPressure',
        type: 'radio',
        text:
          'Has a doctor told you previously that you’ve got high blood pressure or are you on medication for high blood pressure?',
        options: [
          {
            label: 'Yes',
            value: 'Yes',
          },
          {
            label: 'No',
            value: 'No',
          },
        ],
      },
    ],
    submitQuestionnaire: jest.fn(),
    change: jest.fn(),
    futureMeImageChanged: true,
    faceAgingImageError: false,
    toggleErrorModal: jest.fn(),
  };
  const setUp = (componentProps = props) => {
    const Component = withIntl(withTheme(withRedux(QuestionnaireForm)));
    return render(<Component {...componentProps} />);
  };

  afterEach(() => {
    props.submitQuestionnaire.mockReset();
  });

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should submit the questionnaire form', () => {
    const newProps = {
      ...props,
      initialValues: {
        aboutMe: {
          height: 150,
          weight: 75,
          waistCircumference: 100,
          isAsian: true,
        },
        choices: {
          smokingBehaviour: 'NonSmoker',
          alcoholConsumptionFrequency: 'Never',
          alcoholConsumptionAmount: 'OneOrTwo',
        },
        health: {
          hereditaryDiabetes: 'Yes',
          highBloodPressure: 'No',
          sleepDuration: 'Long',
        },
        futureMe: {
          image: 'test.png',
        },
      },
    };
    const formData = {
      aboutMe: {
        height: 150,
        weight: 75,
        waistCircumference: 100,
        isAsian: true,
      },
      choices: {
        smokingBehaviour: 'NonSmoker',
        alcoholConsumptionFrequency: 'Never',
      },
      health: {
        hereditaryDiabetes: 'Yes',
        highBloodPressure: 'No',
      },
      futureMe: {
        image: 'test.png',
      },
      isFaceAgingImageChanged: true,
    };

    const { getByTestId } = setUp(newProps);
    const submitButton = getByTestId('btn-submit-questionnaire');
    fireEvent.click(submitButton);

    expect(props.submitQuestionnaire).toHaveBeenCalledWith(formData);
  });

  it('should scroll to first validation error', () => {
    validate.mockReturnValue({
      aboutMe: {
        height: {
          _error: true,
        },
      },
      choices: {},
    });

    const { container, getByTestId } = setUp();
    const firstErrorElement = container.querySelector('[data-id=height]');
    firstErrorElement.scrollIntoView = jest.fn();

    const submitButton = getByTestId('btn-submit-questionnaire');
    fireEvent.click(submitButton);

    expect(firstErrorElement.scrollIntoView).toHaveBeenCalledWith(true);
  });
});
