import {
  mapDispatchToProps,
  mapStateToProps,
} from '../SuggestionRecommendationsContainer';

jest.mock('../action', () => ({
  getSuggestionRecommendations: jest.fn(() => ({
    type: 'GET_SUGGESTION_RECOMMENDATIONS',
    payload: {},
  })),
}));

jest.mock('../Recommendations', () => jest.fn());

jest.mock('../../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

jest.mock('../../../error', () => ({
  errorDetails: jest.fn((error, id) => ({ errorState: error[id].errorState })),
}));

describe('SuggestionRecommendations Container', () => {
  it('should pass props to component', () => {
    const state = {
      common: {
        recommendations: {
          suggestions: [
            {
              title: 'test 1',
            },
            {
              title: 'test 2',
            },
          ],
        },
      },
      loader: {
        suggestionRecommendations: {
          loading: true,
        },
      },
      error: {
        suggestionRecommendations: {
          errorState: true,
        },
      },
    };

    const expected = {
      recommendations: [
        {
          title: 'test 1',
        },
        {
          title: 'test 2',
        },
      ],
      errorState: true,
      loading: true,
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });

  it('should dispatch get tips action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_SUGGESTION_RECOMMENDATIONS',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getRecommendations();

    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
