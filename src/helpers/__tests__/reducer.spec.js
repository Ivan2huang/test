import createReducer from '../reducer';

describe('Reducer Helper', () => {
  it('should create reducer', () => {
    const initialState = {
      test: 'something',
    };
    const actionHandler = jest.fn();
    const handlers = {
      actionHandler,
    };
    const action = {
      type: 'actionHandler',
    };

    createReducer(initialState, handlers)(undefined, action);

    expect(actionHandler).toHaveBeenCalledWith(initialState, action);
  });

  it('should return initial state if action is not defined', () => {
    const initialState = {
      test: 'something',
    };
    const actionHandler = jest.fn();
    const handlers = {
      actionHandler,
    };
    const action = {
      type: undefined,
    };

    const state = createReducer(initialState, handlers)(undefined, action);

    expect(state).toBe(initialState);
  });
});
