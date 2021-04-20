import reducer from '../reducer';

describe('News Letter Content reducer', () => {
  it('should update the state when update new letter action is dispatched', () => {
    const initialState = {
      content: {},
    };

    const expected = {
      content: { 'en-HK': 'News Letter Content' },
    };

    const action = {
      type: 'UPDATE_NEWS_LETTER',
      payload: { content: { 'en-HK': 'News Letter Content' } },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
