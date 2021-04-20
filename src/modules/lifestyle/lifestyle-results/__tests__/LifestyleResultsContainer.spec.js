import {
  mapDispatchToProps,
  mapStateToProps,
} from '../LifestyleResultsContainer';

jest.mock('../../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

jest.mock('../../../error', () => ({
  errorDetails: jest.fn(() => ({
    errorState: false,
  })),
}));

describe('LifestyleResultsContainer', () => {
  it('should dispatch get life style results action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_LIFESTYLE_RESULTS',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getLifestyleResults(action);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should pass props to component', () => {
    const initialState = {
      loader: {
        generalTips: {
          loading: true,
        },
      },
      error: {
        lifestyleResults: {
          errorState: false,
        },
        lifestyleTips: {
          errorState: false,
        },
      },
      lifestyle: {
        results: {
          details: 'dummy',
        },
        tips: {
          details: 'dummy',
        },
      },
    };

    const expected = {
      lifestyleResults: { details: 'dummy' },
      loading: true,
      errorState: false,
      lifestyleTips: 'dummy',
      lifestyleTipsErrorState: false,
    };

    const actual = mapStateToProps(initialState);

    expect(actual).toEqual(expected);
  });
});
