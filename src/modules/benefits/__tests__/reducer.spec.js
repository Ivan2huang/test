import reducer from '../reducer';

describe('Benefit status reducer', () => {
  it('should update wellness status', () => {
    const initialState = {
      hasWellness: false,
    };

    const action = {
      type: 'UPDATE_WELLNESS_STATUS',
      payload: {
        status: true,
      },
    };

    const expected = {
      hasWellness: true,
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should update outpatient status', () => {
    const initialState = {
      hasOutpatient: false,
    };

    const action = {
      type: 'UPDATE_OUTPATIENT_STATUS',
      payload: {
        status: true,
      },
    };

    const expected = {
      hasOutpatient: true,
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should update eHealth card status', () => {
    const initialState = {
      hasEHealthCard: false,
    };

    const action = {
      type: 'UPDATE_E_HEALTH_CARD_STATUS',
      payload: {
        status: true,
      },
    };

    const expected = {
      hasEHealthCard: true,
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
