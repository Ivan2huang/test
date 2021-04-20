import reducer from '../reducer';

describe('Lifestyle reducer', () => {
  const initialState = {
    details: null,
  };
  it('should create the lifestyle reducer widthout BMI unit', () => {
    const action = {
      type: 'UPDATE_LIFESTYLE_DETAILS',
      payload: {
        lifestyleDetails: { height: 120, weight: 35 },
      },
    };
    const expected = {
      details: {
        height: 120,
        weight: 35,
      },
    };

    const actual = reducer(initialState, action);
    expect(actual).toEqual(expected);
  });

  it('should create the lifestyle reducer width custom BMI unit', () => {
    const action = {
      type: 'UPDATE_LIFESTYLE_DETAILS',
      payload: {
        lifestyleDetails: {
          heightOne: 48,
          heightTwo: 48,
          heightUnit: 'In',
          weight: 35,
          weightUnit: 'Kg',
          waistCircumference: 56,
          waistUnit: 'Cm',
        },
      },
    };
    const expected = {
      details: {
        heightOne: 48,
        heightTwo: 48,
        heightUnit: 'In',
        weight: 35,
        weightUnit: 'Kg',
        waistCircumference: 56,
        waistUnit: 'Cm',
      },
    };

    const actual = reducer(initialState, action);
    expect(actual).toEqual(expected);
  });
});
