import { formValueSelector } from 'redux-form';

import enQuestions from './questions/en-HK.json';
import zhQuestions from './questions/zh-HK.json';

import getAppContext from '../../../appContext';
import { QUESTIONNAIRE_TYPES, BMI_UNIT } from './constants';

const {
  height: { CM },
  weight: { KG },
} = BMI_UNIT;

const selector = formValueSelector('lifestyle-questionnaire');

const getTranslatedQuestions = () => {
  const locale = getAppContext().get('locale');
  return locale === 'zh-HK' ? zhQuestions : enQuestions;
};

const isDependentQuestionShowing = (questions, dependentQuestion, values) => {
  if (!dependentQuestion.parentQuestionId || !values) return false;

  const parentQuestion = questions.find(
    question => question.questionId === dependentQuestion.parentQuestionId,
  );
  const value = values[parentQuestion.name];

  if (Array.isArray(value)) {
    return value.some(v => {
      if (v === 'NoneTempting') {
        return false;
      }
      return dependentQuestion.activationAnswer.includes(v);
    });
  }
  return dependentQuestion.activationAnswer.includes(`${value}`);
};

export const questionsSelector = (state, { type }) => {
  const translatedQuestions = getTranslatedQuestions();
  const questions = translatedQuestions.questionGroups[type];
  const values = selector(state, type);
  return questions.filter(
    question =>
      !question.dependentQuestion ||
      isDependentQuestionShowing(questions, question, values),
  );
};

export const answerSelector = (state, type) => {
  const { details } = state.lifestyle.overview;
  if (details === null) {
    return type === QUESTIONNAIRE_TYPES.aboutMe
      ? {
          heightUnit: CM,
          weightUnit: KG,
          waistUnit: CM,
        }
      : {};
  }
  const {
    heightOne,
    heightTwo,
    heightUnit,
    weight,
    weightUnit,
    waistCircumference,
    waistUnit,
    ethnicity,
  } = details;
  if (type === QUESTIONNAIRE_TYPES.aboutMe) {
    return {
      heightOne,
      heightTwo,
      heightUnit,
      weight,
      weightUnit,
      waistCircumference,
      waistUnit,
      isAsian: ethnicity === 'EastAsian',
    };
  }
  const questions = getTranslatedQuestions().questionGroups[type];
  const answers = {};
  questions.forEach(({ name }) => {
    answers[name] = details[name];
  });
  return answers;
};
