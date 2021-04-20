import reducer from '../reducer';

describe('legal content reducer', () => {
  it('should update the state when update privacy policy categories action is dispatched', () => {
    const initialState = {
      content: {},
    };

    const expected = {
      content: { 'en-HK': 'Privacy Policy' },
    };

    const action = {
      type: 'UPDATE_PRIVACY_POLICY',
      payload: { content: { 'en-HK': 'Privacy Policy' } },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
