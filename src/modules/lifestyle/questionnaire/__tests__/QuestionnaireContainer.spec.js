import { isDirty } from 'redux-form';
import { mapStateToProps, mapDispatchToProps } from '../QuestionnaireContainer';

jest.mock('../action', () => ({
  submitLifeStyleQuestionnaire: jest.fn(data => ({
    type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
    payload: {
      data,
    },
  })),
  toggleErrorModal: jest.fn(error => ({
    type: 'TOGGLE_ERROR_MODAL',
    payload: {
      error,
    },
  })),
}));

jest.mock('../../action', () => ({
  getLifestyleDetails: jest.fn(() => ({
    type: 'GET_LIFESTYLE_DETAILS',
    payload: {},
  })),
}));

jest.mock('../Questionnaire', () => jest.fn());

jest.mock('redux-form', () => ({
  isDirty: jest.fn(() =>
    jest.fn((_, fieldName) => fieldName === 'futureMe.image'),
  ),
}));

jest.mock('../selector', () => ({
  questionsSelector: jest.fn((_, { type }) => {
    const questions = {
      choices: [
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
      health: [
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
    };
    return questions[type];
  }),
  answerSelector: jest.fn((_, type) => {
    const answers = {
      aboutMe: {
        height: 120,
      },
      choices: {
        smokingBehaviour: 'Nonsmoking',
      },
      health: {
        diet: 'Yes',
      },
    };
    return answers[type];
  }),
}));

describe('Questionnaire Container', () => {
  it('should pass props to component ', () => {
    const expected = {
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
        choices: {
          smokingBehaviour: 'Nonsmoking',
        },
        health: {
          diet: 'Yes',
        },
        futureMe: {
          image: 'testimage.jpg',
        },
      },
      futureMeImageChanged: true,
      faceAgingImageError: false,
    };
    const state = {
      lifestyle: {
        questionnaire: {
          faceAgingImage: 'testimage.jpg',
          faceAgingImageError: false,
        },
      },
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
    expect(isDirty).toHaveBeenCalledWith('lifestyle-questionnaire');
  });

  it('should dispatch get lifestyle details action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_LIFESTYLE_DETAILS',
      payload: {},
    };

    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getLifestyleDetails();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch submit lifestyle questionnaire action', () => {
    const dispatch = jest.fn();
    const data = {
      height: 150,
      weight: 75,
    };
    const expected = {
      type: 'SUBMIT_LIFESTYLE_QUESTIONNAIRE',
      payload: {
        data: {
          height: 150,
          weight: 75,
        },
      },
    };

    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.submitQuestionnaire(data);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch toggle error modal action', () => {
    const dispatch = jest.fn();
    const isShow = true;
    const expected = {
      type: 'TOGGLE_ERROR_MODAL',
      payload: { error: true },
    };

    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.toggleErrorModal(isShow);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
