import { questionsSelector, answerSelector } from '../selector';
import getAppContext from '../../../../appContext';

jest.mock('../../../../appContext', () =>
  jest.fn(() => ({
    get: () => 'en-HK',
  })),
);

jest.mock('../questions/en-HK.json', () => ({
  questionGroups: {
    choices: [
      {
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        options: [
          {
            label: 'Non-smoker',
            value: 'NonSmoker',
          },
        ],
      },
      {
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
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
      {
        questionId: 'choices_2.2.1',
        name: 'alcoholConsumptionAmount',
        section: 'choices',
        type: 'radio',
        parentQuestionId: 'choices_2.2',
        dependentQuestion: true,
        activationAnswer: ['MonthlyOrLess'],
        options: [
          {
            label: '1 or 2',
            value: 'OneOrTwo',
          },
        ],
      },
      {
        questionId: 'choices_2.4',
        dependentQuestion: false,
        name: 'temptingFoodItems',
        type: 'multiselect',
        options: [
          {
            value: 'Chocolate',
            label: 'Chocolate',
          },
          {
            value: 'PotatoChips',
            label: 'Potato chips',
          },
          {
            value: 'FrenchFries',
            label: 'French fries',
          },
        ],
      },
      {
        questionId: 'choices_2.4.1',
        dependentQuestion: true,
        parentQuestionId: 'choices_2.4',
        name: 'avoidingTemptingFood',
        type: 'radio',
        options: [
          {
            value: 'Yes',
            label: 'Yes',
          },
          {
            value: 'No',
            label: 'No',
          },
        ],
        activationAnswer: ['Chocolate', 'PotatoChips'],
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
          'Has a doctor told you previously that you???ve got high blood pressure or are you on medication for high blood pressure?',
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
        questionOrder: '3',
        questionId: 'health_3.3',
        dependentQuestion: false,
        name: 'uninterestFrequency',
        type: 'radio',
        text:
          'Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?',
        options: [
          {
            label: 'Not at all',
            value: 'Never',
          },
          {
            label: 'Several days',
            value: 'Sometimes',
          },
          {
            label: 'More than one- half the days',
            value: 'Often',
          },
          {
            label: 'Nearly every day',
            value: 'Regularly',
          },
        ],
      },
      {
        questionOrder: '4',
        questionId: 'health_3.4',
        dependentQuestion: false,
        name: 'depressionFrequency',
        type: 'radio',
        text:
          'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
        options: [
          {
            label: 'Not at all',
            value: 'Never',
          },
          {
            label: 'Several days',
            value: 'Sometimes',
          },
          {
            label: 'More than one- half the days',
            value: 'Often',
          },
          {
            label: 'Nearly every day',
            value: 'Regularly',
          },
        ],
      },
      {
        questionOrder: '5',
        questionId: 'health_3.5',
        dependentQuestion: false,
        name: 'drowsinessFrequency',
        type: 'radio',
        text:
          'During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?',
        options: [
          {
            label: 'Not during the past month',
            value: 'Never',
          },
          {
            label: 'Less than once a week',
            value: 'Sometimes',
          },
          {
            label: '1 - 2 times a week',
            value: 'Often',
          },
          {
            label: '3 or more times a week',
            value: 'Regularly',
          },
        ],
      },
      {
        questionOrder: '6',
        questionId: 'health_3.6',
        dependentQuestion: false,
        name: 'sleepDuration',
        type: 'radio',
        text: 'On average, how many hours of sleep do you get per night?',
        options: [
          {
            label: 'Less than 5 hours',
            value: 'Brief',
          },
          {
            label: '5 - 6 hours',
            value: 'Short',
          },
          {
            label: '6 - 7 hours',
            value: 'Long',
          },
          {
            label: 'More than 7 hours',
            value: 'VeryLong',
          },
        ],
      },
    ],
  },
}));

jest.mock('../questions/zh-HK.json', () => ({
  questionGroups: {
    choices: [
      {
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        text: '???????????????????????????...??????????????????????????????????????????)???',
        section: 'choices',
        options: [
          {
            label: '???????????????',
            value: 'NonSmoker',
          },
          {
            label: '???????????????????????????',
            value: 'ExSmoker',
          },
        ],
      },
      {
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
        text: '????????????????????????',
        section: 'choices',
        options: [
          {
            label: '????????????',
            value: 'Never',
          },
          {
            label: '?????????????????????',
            value: 'MonthlyOrLess',
          },
        ],
      },
      {
        questionId: 'choices_2.2.1',
        dependentQuestion: true,
        name: 'alcoholConsumptionAmount',
        section: 'choices',
        type: 'radio',
        text: '????????????????????????????????????????????????????????????????????????',
        parentQuestionId: 'choices_2.2',
        activationAnswer: [
          'MonthlyOrLess',
          'TwoToFourTimesAMonth',
          'TwoToThreeTimesAWeek',
          'FourOrMoreTimesAWeek',
        ],
        options: [
          {
            label: '1 ??? 2 ???',
            value: 'OneOrTwo',
          },
          {
            label: '3 ??? 4 ???',
            value: 'ThreeOrFour',
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
        text: '???????????????????????????? (??????????????????????????????)',
        options: [
          {
            label: '???',
            value: 'Yes',
          },
          {
            label: '??????',
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
        text: '?????????????????????????????????????????????????????????????????????????',
        options: [
          {
            label: '???',
            value: 'Yes',
          },
          {
            label: '???',
            value: 'No',
          },
        ],
      },
      {
        questionOrder: '3',
        questionId: 'health_3.3',
        dependentQuestion: false,
        name: 'uninterestFrequency',
        type: 'radio',
        text:
          '?????????????????????????????????????????????????????????????????????????????????????????????????',
        options: [
          {
            label: '????????????',
            value: 'Never',
          },
          {
            label: '??????',
            value: 'Sometimes',
          },
          {
            label: '??????????????????',
            value: 'Often',
          },
          {
            label: '????????????',
            value: 'Regularly',
          },
        ],
      },
      {
        questionOrder: '4',
        questionId: 'health_3.4',
        dependentQuestion: false,
        name: 'depressionFrequency',
        type: 'radio',
        text: '?????????????????????????????????????????????????????????????????????????',
        options: [
          {
            label: '????????????',
            value: 'Never',
          },
          {
            label: '??????',
            value: 'Sometimes',
          },
          {
            label: '??????????????????',
            value: 'Often',
          },
          {
            label: '????????????',
            value: 'Regularly',
          },
        ],
      },
      {
        questionOrder: '5',
        questionId: 'health_3.5',
        dependentQuestion: false,
        name: 'drowsinessFrequency',
        type: 'radio',
        text:
          '????????????????????????????????????????????????????????????????????????????????????????????????? ',
        options: [
          {
            label: '????????????',
            value: 'Never',
          },
          {
            label: '?????????????????????',
            value: 'Sometimes',
          },
          {
            label: '????????????????????????',
            value: 'Often',
          },
          {
            label: '???????????????????????????',
            value: 'Regularly',
          },
        ],
      },
      {
        questionOrder: '6',
        questionId: 'health_3.6',
        dependentQuestion: false,
        name: 'sleepDuration',
        type: 'radio',
        text: '?????????????????????????????????????',
        options: [
          {
            label: '??????5??????',
            value: 'Brief',
          },
          {
            label: '5 ???6??????',
            value: 'Short',
          },
          {
            label: '6 ???7 ??????',
            value: 'Long',
          },
          {
            label: '??????7 ??????',
            value: 'VeryLong',
          },
        ],
      },
    ],
  },
}));

describe('Questionnaire Selector', () => {
  it('should return questions when no question is answered', () => {
    const expected = [
      {
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        options: [
          {
            label: 'Non-smoker',
            value: 'NonSmoker',
          },
        ],
      },
      {
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
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
      {
        questionId: 'choices_2.4',
        dependentQuestion: false,
        name: 'temptingFoodItems',
        type: 'multiselect',
        options: [
          {
            value: 'Chocolate',
            label: 'Chocolate',
          },
          {
            value: 'PotatoChips',
            label: 'Potato chips',
          },
          {
            value: 'FrenchFries',
            label: 'French fries',
          },
        ],
      },
    ];
    const state = {
      form: {
        'lifestyle-questionnaire': {
          values: {},
        },
      },
    };

    const actual = questionsSelector(state, { type: 'choices' });

    expect(actual).toStrictEqual(expected);
  });

  it('should return dependent questions when parent question is answered and it is active answer', () => {
    const expected = [
      {
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        options: [
          {
            label: 'Non-smoker',
            value: 'NonSmoker',
          },
        ],
      },
      {
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
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
      {
        questionId: 'choices_2.2.1',
        name: 'alcoholConsumptionAmount',
        section: 'choices',
        type: 'radio',
        parentQuestionId: 'choices_2.2',
        dependentQuestion: true,
        activationAnswer: ['MonthlyOrLess'],
        options: [
          {
            label: '1 or 2',
            value: 'OneOrTwo',
          },
        ],
      },
      {
        questionId: 'choices_2.4',
        dependentQuestion: false,
        name: 'temptingFoodItems',
        type: 'multiselect',
        options: [
          {
            value: 'Chocolate',
            label: 'Chocolate',
          },
          {
            value: 'PotatoChips',
            label: 'Potato chips',
          },
          {
            value: 'FrenchFries',
            label: 'French fries',
          },
        ],
      },
      {
        questionId: 'choices_2.4.1',
        dependentQuestion: true,
        parentQuestionId: 'choices_2.4',
        name: 'avoidingTemptingFood',
        type: 'radio',
        options: [
          {
            value: 'Yes',
            label: 'Yes',
          },
          {
            value: 'No',
            label: 'No',
          },
        ],
        activationAnswer: ['Chocolate', 'PotatoChips'],
      },
    ];
    const state = {
      form: {
        'lifestyle-questionnaire': {
          values: {
            choices: {
              alcoholConsumptionFrequency: 'MonthlyOrLess',
              temptingFoodItems: ['Chocolate'],
            },
          },
        },
      },
    };

    const actual = questionsSelector(state, { type: 'choices' });

    expect(actual).toStrictEqual(expected);
  });

  it('should not return tempting food dependent questions when parent question is answered with NoneTempting', () => {
    const expected = [
      {
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        options: [
          {
            label: 'Non-smoker',
            value: 'NonSmoker',
          },
        ],
      },
      {
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
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
      {
        questionId: 'choices_2.4',
        dependentQuestion: false,
        name: 'temptingFoodItems',
        type: 'multiselect',
        options: [
          {
            value: 'Chocolate',
            label: 'Chocolate',
          },
          {
            value: 'PotatoChips',
            label: 'Potato chips',
          },
          {
            value: 'FrenchFries',
            label: 'French fries',
          },
        ],
      },
    ];
    const state = {
      form: {
        'lifestyle-questionnaire': {
          values: {
            choices: {
              alcoholConsumptionFrequency: 'Never',
              temptingFoodItems: ['NoneTempting'],
            },
          },
        },
      },
    };

    const actual = questionsSelector(state, { type: 'choices' });

    expect(actual).toStrictEqual(expected);
  });

  it('should not return dependent questions when parent question is answered but it is not active answer', () => {
    const expected = [
      {
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        options: [
          {
            label: 'Non-smoker',
            value: 'NonSmoker',
          },
        ],
      },
      {
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
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
      {
        questionId: 'choices_2.4',
        dependentQuestion: false,
        name: 'temptingFoodItems',
        type: 'multiselect',
        options: [
          {
            value: 'Chocolate',
            label: 'Chocolate',
          },
          {
            value: 'PotatoChips',
            label: 'Potato chips',
          },
          {
            value: 'FrenchFries',
            label: 'French fries',
          },
        ],
      },
    ];
    const state = {
      form: {
        'lifestyle-questionnaire': {
          values: {
            choices: {
              alcoholConsumptionFrequency: 'Never',
              temptingFoodItems: ['FrenchFries'],
            },
          },
        },
      },
    };

    const actual = questionsSelector(state, { type: 'choices' });

    expect(actual).toStrictEqual(expected);
  });

  it('should return questions based on selected language', () => {
    getAppContext.mockReturnValue({ get: () => 'zh-HK' });

    const expected = [
      {
        questionId: 'choices_2.1',
        dependentQuestion: false,
        name: 'smokingBehaviour',
        type: 'radio',
        text: '???????????????????????????...??????????????????????????????????????????)???',
        section: 'choices',
        options: [
          {
            label: '???????????????',
            value: 'NonSmoker',
          },
          {
            label: '???????????????????????????',
            value: 'ExSmoker',
          },
        ],
      },
      {
        questionId: 'choices_2.2',
        dependentQuestion: false,
        name: 'alcoholConsumptionFrequency',
        type: 'radio',
        text: '????????????????????????',
        section: 'choices',
        options: [
          {
            label: '????????????',
            value: 'Never',
          },
          {
            label: '?????????????????????',
            value: 'MonthlyOrLess',
          },
        ],
      },
    ];
    const state = {
      form: {
        'lifestyle-questionnaire': {
          values: {},
        },
      },
    };

    const actual = questionsSelector(state, { type: 'choices' });

    expect(actual).toStrictEqual(expected);
  });
});

describe('Answer selector', () => {
  const state = {
    lifestyle: {
      overview: {
        details: {
          heightOne: 160,
          waistCircumference: 200,
          weight: 78,
          ethnicity: 'EastAsian',
          smokingBehaviour: 'NonSmoker',
          alcoholConsumptionFrequency: 'Never',
          alcoholConsumptionAmount: 'OneOrTwo',
          avoidingTemptingFood: 'Yes',
          temptingFoodItems: ['FrenchFries', 'IceCream'],
          hereditaryDiabetes: 'No',
          highBloodPressure: 'No',
          uninterestFrequency: 'OneOrTwo',
          depressionFrequency: 'one',
          drowsinessFrequency: 'often',
          sleepDuration: 'poor',
        },
      },
    },
  };
  it('should return about me answers', () => {
    const expected = {
      heightOne: 160,
      waistCircumference: 200,
      weight: 78,
      isAsian: true,
    };

    const actual = answerSelector(state, 'aboutMe');

    expect(actual).toEqual(expected);
  });

  it('should return choices answers', () => {
    getAppContext.mockReturnValue({ get: () => 'en-HK' });
    const expected = {
      smokingBehaviour: 'NonSmoker',
      alcoholConsumptionFrequency: 'Never',
      alcoholConsumptionAmount: 'OneOrTwo',
      avoidingTemptingFood: 'Yes',
      temptingFoodItems: ['FrenchFries', 'IceCream'],
    };

    const actual = answerSelector(state, 'choices');

    expect(actual).toEqual(expected);
  });

  it('should return health answers', () => {
    getAppContext.mockReturnValue({ get: () => 'en-HK' });
    const expected = {
      hereditaryDiabetes: 'No',
      highBloodPressure: 'No',
      uninterestFrequency: 'OneOrTwo',
      depressionFrequency: 'one',
      drowsinessFrequency: 'often',
      sleepDuration: 'poor',
    };

    const actual = answerSelector(state, 'health');

    expect(actual).toEqual(expected);
  });

  it('should return empty answers when answer details is null', () => {
    const expected = {};
    const actual = answerSelector(
      { lifestyle: { overview: { details: null } } },
      'answers',
    );

    expect(actual).toEqual(expected);
  });

  it('should return default about me when details is null', () => {
    const expected = {
      heightUnit: 'Cm',
      waistUnit: 'Cm',
      weightUnit: 'Kg',
    };
    const actual = answerSelector(
      { lifestyle: { overview: { details: null } } },
      'aboutMe',
    );

    expect(actual).toEqual(expected);
  });
});
