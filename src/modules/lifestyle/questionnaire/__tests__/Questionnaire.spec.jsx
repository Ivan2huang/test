/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import Questionnaire from '../Questionnaire';

jest.mock('../QuestionnaireHeader', () => props => (
  <div>
    QuestionnaireHeader Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

jest.mock('../QuestionnaireForm', () => props => (
  <div>
    QuestionnaireForm Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

describe('Questionnaire Component', () => {
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
    initialValues: {
      aboutMe: { height: 120 },
      choices: { smokingBehaviour: 'Yes' },
      health: { diabetic: 'Yes' },
    },
    futureMeImageChanged: false,
    getLifestyleDetails: jest.fn(),
    submitQuestionnaire: jest.fn(),
    toggleErrorModal: jest.fn(),
    faceAgingImageError: false,
  };
  const setUp = (componentProps = props) => {
    return render(<Questionnaire {...componentProps} />);
  };

  afterEach(() => {
    props.getLifestyleDetails.mockReset();
    props.submitQuestionnaire.mockReset();
    props.toggleErrorModal.mockReset();
  });

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should get lifestyle details on load', () => {
    setUp();

    expect(props.getLifestyleDetails).toHaveBeenCalled();
  });
});
