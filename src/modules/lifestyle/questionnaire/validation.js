import { QUESTIONNAIRE_TYPES, BMI_UNIT } from './constants';

const {
  height: { CM, IN, FTIN },
  weight: { KG, LB },
} = BMI_UNIT;

const HEIGHT = {
  [CM]: {
    min: 50,
    max: 300,
  },
  [FTIN]: {
    min: 3,
    max: 10,
  },
  [IN]: {
    min: 0,
    max: 11,
  },
};

const WEIGHT = {
  [KG]: {
    min: 30,
    max: 650,
  },
  [LB]: {
    min: 50,
    max: 400,
  },
};

const WAIST = {
  [CM]: {
    min: 40,
    max: 300,
  },
  [IN]: {
    min: 20,
    max: 200,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const validate = (values, props) => {
  const { aboutMe = {} } = values;
  const {
    heightOne,
    heightTwo,
    heightUnit,
    weight,
    weightUnit,
    waistCircumference,
    waistUnit,
  } = aboutMe;
  const { choicesQuestions, healthQuestions } = props;
  const errors = {
    [QUESTIONNAIRE_TYPES.aboutMe]: {},
    [QUESTIONNAIRE_TYPES.choices]: {},
    [QUESTIONNAIRE_TYPES.health]: {},
  };
  const { min: minHeight, max: maxHeight } = HEIGHT[heightUnit] || {};
  const { min: minWeight, max: maxWeight } = WEIGHT[weightUnit] || {};
  const { min: minWaist, max: maxWaist } = WAIST[waistUnit] || {};

  if (!heightOne || heightOne < minHeight || heightOne > maxHeight) {
    errors.aboutMe.heightOne = {
      _error: true,
    };
  }
  if (heightUnit === FTIN) {
    const { min: minHeightTwo, max: maxHeightTwo } = HEIGHT[IN];
    if (!heightTwo || heightTwo < minHeightTwo || heightTwo > maxHeightTwo) {
      errors.aboutMe.heightTwo = {
        _error: true,
      };
    }
  }

  if (!weight || weight < minWeight || weight > maxWeight) {
    errors.aboutMe.weight = {
      _error: true,
    };
  }

  if (
    waistCircumference &&
    (waistCircumference < minWaist || waistCircumference > maxWaist)
  ) {
    errors.aboutMe.waistCircumference = {
      _error: true,
    };
  }

  const questionsValidation = (type, questions, ignored = []) => {
    const typeValues = values[type] || {};
    const typeErrors = errors[type];
    return questions.forEach(({ name }) => {
      if (!ignored.includes(name)) {
        const value = typeValues[name];
        if (
          (value !== 0 && !value) ||
          (Array.isArray(value) && value.length === 0)
        ) {
          typeErrors[name] = {
            _error: true,
          };
        }
      }
    });
  };

  questionsValidation(QUESTIONNAIRE_TYPES.choices, choicesQuestions);
  questionsValidation(QUESTIONNAIRE_TYPES.health, healthQuestions);

  return errors;
};
