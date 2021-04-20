import { mapDispatchToProps, mapStateToProps } from '../LifestyleContainer';

jest.mock('../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

describe('Lifestyle container', () => {
  it('should dispatch get claim details action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_LIFESTYLE_DETAILS',
      payload: {},
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.getLifestyleDetails();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should call mapStateToProps', () => {
    const state = {
      loader: {
        page: {
          loading: true,
        },
      },
      lifestyle: {
        overview: {
          details: {
            height: 150,
          },
        },
      },
    };
    const expected = {
      lifestyleDetails: { height: 150 },
      loading: true,
    };
    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });
});
