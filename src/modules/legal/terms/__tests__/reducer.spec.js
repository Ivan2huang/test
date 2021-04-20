import reducer from '../reducer';

describe('Terms and conditions reducer', () => {
  it('should update the state when update terms and conditions action is dispatched', () => {
    const initialState = {
      content: {},
    };

    const expected = {
      content: { 'en-HK': 'Terms and conditions' },
    };

    const action = {
      type: 'UPDATE_TERMS_CONDITIONS',
      payload: { content: { 'en-HK': 'Terms and conditions' } },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
