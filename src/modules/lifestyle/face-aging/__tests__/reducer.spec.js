import reducer from '../reducer';

describe('Face aging reducer', () => {
  it('should update the state when update face aging categories action is dispatched', () => {
    const initialState = {
      faceAgingIsDone: false,
      categories: [],
    };

    const expected = {
      faceAgingIsDone: true,
      categories: [{ age: 35, category: 'healthy' }],
    };

    const action = {
      type: 'UPDATE_USER_FACE_AGING_CATEGORIES',
      payload: {
        faceAgingIsDone: true,
        categories: [{ age: 35, category: 'healthy' }],
      },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
