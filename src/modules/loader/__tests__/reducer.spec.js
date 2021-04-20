import reducer from '../reducer';

describe('Loader Reducer', () => {
  it('should initialize loader on start loader', () => {
    const initialState = {
      loader1: {
        counter: 3,
        message: 'loader 1',
      },
    };
    const action = {
      type: 'START_LOADER',
      payload: {
        id: 'loader2',
        message: 'loading...',
      },
    };
    const expected = {
      loader1: {
        counter: 3,
        message: 'loader 1',
      },
      loader2: {
        counter: 1,
        message: 'loading...',
        loaded: false,
      },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should add loader counter on start loader', () => {
    const initialState = {
      loader1: {
        counter: 3,
        message: 'loader 1',
      },
    };
    const action = {
      type: 'START_LOADER',
      payload: {
        id: 'loader1',
        message: 'loading...',
      },
    };
    const expected = {
      loader1: {
        counter: 4,
        message: 'loading...',
        loaded: false,
      },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });

  it('should minus loader counter on stop loader', () => {
    const initialState = {
      loader1: {
        counter: 3,
        message: 'loading...',
      },
    };
    const action = {
      type: 'STOP_LOADER',
      payload: {
        id: 'loader1',
      },
    };
    const expected = {
      loader1: {
        counter: 2,
        message: 'loading...',
      },
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
  });
});
