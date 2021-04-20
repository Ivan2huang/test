import { mapDispatchToProps, mapStateToProps } from '../GeneralTipsContainer';

jest.mock('../../../loader', () => ({
  loaderDetail: jest.fn((loader, id) => ({ loading: loader[id].loading })),
}));

jest.mock('../../../error', () => ({
  errorDetails: jest.fn(() => ({
    errorState: false,
  })),
}));

describe('GeneralTips Container', () => {
  it('should dispatch get life style tips action', () => {
    const dispatch = jest.fn();
    const action = {
      type: 'GET_LIFESTYLE_TIPS',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getLifestyleTips(action);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should pass props to component', () => {
    const state = {
      loader: {
        generalTips: {
          loading: true,
        },
      },
      error: {
        generalTips: {
          errorState: true,
        },
      },
      lifestyle: {
        tips: {
          details: {
            general: [
              {
                topic: 'xyz',
              },
            ],
          },
        },
      },
    };

    const expected = {
      loading: true,
      tips: [
        {
          topic: 'xyz',
        },
      ],
      errorState: false,
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
