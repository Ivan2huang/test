import reducer from '../reducer';

describe('Questionnaire reducer', () => {
  it('should create the questionnaire reducer', () => {
    const initialState = {
      faceAgingImage: null,
      faceAgingImageError: false,
    };
    const action = {
      type: 'UPDATE_FACE_AGING_IMAGE',
      payload: {
        image: 'http://test.jpeg',
      },
    };
    const expected = {
      faceAgingImage: 'http://test.jpeg',
      faceAgingImageError: false,
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);

    const toggleErrorAction = {
      type: 'TOGGLE_ERROR_MODAL',
      payload: { error: true },
    };

    const toggleErrorExpected = {
      faceAgingImage: null,
      faceAgingImageError: true,
    };

    const actualError = reducer(initialState, toggleErrorAction);

    expect(actualError).toEqual(toggleErrorExpected);
  });
});
