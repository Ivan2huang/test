import {
  mapStateToProps,
  mapDispatchToProps,
} from '../LifestyleScoreContainer';

jest.mock('../../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

jest.mock('../../../error', () => ({
  errorDetails: jest.fn((error, id) => {
    return { errorState: error[id].errorState };
  }),
}));

describe('Lifestyle Score container', () => {
  it('should map state to props', () => {
    const state = {
      lifestyle: {
        healthScore: {
          healthScore: 21,
        },
      },
      loader: {
        lifestyleScore: {
          loading: true,
        },
      },
      error: {
        lifestyleScore: {
          errorState: true,
        },
      },
    };
    const expected = {
      healthScore: 21,
      errorState: true,
      loading: true,
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });

  it('should disaptch getLifestyleScore action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_LIFESTYLE_SCORE',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getLifestyleHealthScore(action);

    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
