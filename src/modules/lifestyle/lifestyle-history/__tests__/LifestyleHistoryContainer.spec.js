import {
  mapDispatchToProps,
  mapStateToProps,
} from '../LifestyleHistoryContainer';

jest.mock('../../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

jest.mock('../../../error', () => ({
  errorDetails: jest.fn(() => ({
    errorState: false,
  })),
}));

describe('Lifestyle history Container', () => {
  it('should dispatch get life style history action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_LIFESTYLE_HEALTH_SCORES_HISTORY',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getLifestyleHealthScoresHistory(action);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should pass props to component', () => {
    const state = {
      loader: {
        lifestyleHistory: {
          loading: true,
        },
      },
      error: {
        lifestyleHistory: {
          errorState: true,
        },
      },
      lifestyle: {
        history: {
          healthScoresHistory: [
            {
              score: 12,
            },
          ],
        },
      },
    };

    const expected = {
      loading: true,
      healthScoresHistory: [
        {
          score: 12,
        },
      ],
      errorState: false,
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
