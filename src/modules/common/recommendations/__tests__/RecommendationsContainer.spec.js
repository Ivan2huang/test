import {
  mapDispatchToProps,
  mapStateToProps,
} from '../RecommendationsContainer';

jest.mock('../action', () => ({
  getRecommendations: jest.fn(tipCategory => ({
    type: 'GET_RECOMMENDATIONS',
    payload: {
      tipCategory,
    },
  })),
}));

jest.mock('../Recommendations', () => jest.fn());

jest.mock('../../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

jest.mock('../../../error', () => ({
  errorDetails: jest.fn((error, id) => ({ errorState: error[id].errorState })),
}));

describe('Recommendations Container', () => {
  it('should pass props to component', () => {
    const state = {
      common: {
        recommendations: {
          details: [
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
        recommendations: {
          loading: true,
        },
      },
      error: {
        recommendations: {
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
      tipCategory: 'alcohol',
    };

    const actual = mapStateToProps(state, { tipCategory: 'alcohol' });

    expect(actual).toStrictEqual(expected);
  });

  it('should dispatch get life style tips action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_RECOMMENDATIONS',
      payload: {
        tipCategory: 'alcohol',
      },
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getRecommendations('alcohol');

    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
