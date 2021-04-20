import { validate } from '../validation';

describe('Questionnaire Validation', () => {
  describe('Height', () => {
    it('should return error if height is undefined', () => {
      const values = {};
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.heightOne).toEqual(expected);
    });

    it('should return error if height is less than min value', () => {
      const values = {
        aboutMe: {
          heightOne: 49,
          heightUnit: 'Cm',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.heightOne).toEqual(expected);
    });

    it('should return error if height is less than min value in FTIN unit', () => {
      const values = {
        aboutMe: {
          heightOne: 2,
          heightUnit: 'FtIn',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.heightOne).toEqual(expected);
    });

    it('should return error if height is greater than max value', () => {
      const values = {
        aboutMe: {
          heightOne: 301,
          heightUnit: 'Cm',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.heightOne).toEqual(expected);
    });

    it('should not return error if height is valid', () => {
      const values = {
        aboutMe: {
          height: 150,
        },
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.height).toBeUndefined();
    });

    it('should not return error if height is valid in IN unit', () => {
      const values = {
        aboutMe: {
          height: 60,
          unitHeight: 'In',
        },
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.height).toBeUndefined();
    });
  });

  describe('Weight', () => {
    it('should return error if weight is undefined', () => {
      const values = {};
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.weight).toEqual(expected);
    });

    it('should return error if weight is less than min value', () => {
      const values = {
        aboutMe: {
          weight: 29,
          weightUnit: 'Kg',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.weight).toEqual(expected);
    });

    it('should return error if weight is less than min value in LB unit', () => {
      const values = {
        aboutMe: {
          weight: 40,
          weightUnit: 'Lb',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.weight).toEqual(expected);
    });

    it('should return error if weight is greater than max value', () => {
      const values = {
        aboutMe: {
          weight: 652,
          weightUnit: 'Kg',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.weight).toEqual(expected);
    });

    it('should not return error if weight is valid', () => {
      const values = {
        aboutMe: {
          weight: 100,
        },
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.weight).toBeUndefined();
    });

    it('should not return error if weight is valid in LB', () => {
      const values = {
        aboutMe: {
          weight: 220,
          unitWeight: 'Lb',
        },
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.weight).toBeUndefined();
    });
  });

  describe('Waist Circumference', () => {
    it('should return error if waist circumference is less than min value', () => {
      const values = {
        aboutMe: {
          waistCircumference: 39,
          waistUnit: 'Cm',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.waistCircumference).toEqual(expected);
    });

    it('should return error if waist circumference is greater than max value', () => {
      const values = {
        aboutMe: {
          waistCircumference: 301,
          waistUnit: 'Cm',
        },
      };
      const expected = {
        _error: true,
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.waistCircumference).toEqual(expected);
    });

    it('should not return error if waist circumference is undefined', () => {
      const values = {};

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.waistCircumference).toBeUndefined();
    });

    it('should not return error if waist circumference is valid', () => {
      const values = {
        aboutMe: {
          waistCircumference: 100,
        },
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.waistCircumference).toBeUndefined();
    });

    it('should not return error if waist circumference is empty', () => {
      const values = {
        aboutMe: {
          waistCircumference: '',
        },
      };

      const actual = validate(values, {
        choicesQuestions: [],
        healthQuestions: [],
      });

      expect(actual.aboutMe.waistCircumference).toBeUndefined();
    });
  });

  describe('My Choices', () => {
    it('should return error if all questions are not answered', () => {
      const props = {
        choicesQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
        healthQuestions: [],
      };
      const values = {};
      const expected = {
        question1: {
          _error: true,
        },
        question2: {
          _error: true,
        },
      };

      const actual = validate(values, props);

      expect(actual.choices).toStrictEqual(expected);
    });

    it('should return error if some questions are not answered', () => {
      const props = {
        choicesQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
        healthQuestions: [],
      };
      const values = {
        choices: {
          question1: 'value1',
        },
      };
      const expected = {
        question2: {
          _error: true,
        },
      };

      const actual = validate(values, props);

      expect(actual.choices).toStrictEqual(expected);
    });

    it('should return error if multiple select question is not answered', () => {
      const props = {
        choicesQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
        healthQuestions: [],
      };
      const values = {
        choices: {
          question1: [],
          question2: 'value2',
        },
      };
      const expected = {
        question1: {
          _error: true,
        },
      };

      const actual = validate(values, props);

      expect(actual.choices).toStrictEqual(expected);
    });

    it('should not return error if all questions are answered', () => {
      const props = {
        choicesQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
        healthQuestions: [],
      };
      const values = {
        choices: {
          question1: 'value1',
          question2: 'value2',
        },
      };

      const actual = validate(values, props);

      expect(actual.choices).toStrictEqual({});
    });
  });

  describe('My Health', () => {
    it('should return error if all questions are not answered', () => {
      const props = {
        choicesQuestions: [],
        healthQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
      };
      const values = {};
      const expected = {
        question1: {
          _error: true,
        },
        question2: {
          _error: true,
        },
      };

      const actual = validate(values, props);

      expect(actual.health).toStrictEqual(expected);
    });

    it('should return error if some questions are not answered', () => {
      const props = {
        choicesQuestions: [],
        healthQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
      };
      const values = {
        health: {
          question1: 'value1',
        },
      };
      const expected = {
        question2: {
          _error: true,
        },
      };

      const actual = validate(values, props);

      expect(actual.health).toStrictEqual(expected);
    });

    it('should return error if multiple select question is not answered', () => {
      const props = {
        choicesQuestions: [],
        healthQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
      };
      const values = {
        health: {
          question1: [],
          question2: 'value2',
        },
      };
      const expected = {
        question1: {
          _error: true,
        },
      };

      const actual = validate(values, props);

      expect(actual.health).toStrictEqual(expected);
    });

    it('should not return error if all questions are answered', () => {
      const props = {
        choicesQuestions: [],
        healthQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'question2',
          },
        ],
      };
      const values = {
        health: {
          question1: 'value1',
          question2: 'value2',
        },
      };

      const actual = validate(values, props);

      expect(actual.health).toStrictEqual({});
    });

    it('should not return error if questions are ignored', () => {
      const props = {
        choicesQuestions: [
          {
            name: 'question1',
          },
          {
            name: 'exerciseFrequency',
          },
        ],
        healthQuestions: [],
      };
      const values = {
        choices: {
          question1: 'value1',
          question2: [],
        },
      };

      const actual = validate(values, props);

      expect(actual.health).toStrictEqual({});
    });
  });
});
