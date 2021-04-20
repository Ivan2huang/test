import actionCreator from '../action';

describe('Action Helper', () => {
  it('should create action', () => {
    const action = actionCreator('ACTION_TYPE', 'arg1', 'arg2');
    const actual = action('test1', 2);
    const expected = {
      type: 'ACTION_TYPE',
      payload: {
        arg1: 'test1',
        arg2: 2,
      },
    };

    expect(actual).toEqual(expected);
  });
});
