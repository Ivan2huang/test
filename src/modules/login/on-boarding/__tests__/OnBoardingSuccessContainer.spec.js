import {
  mapStateToProps,
  mapDispatchToProps,
} from '../OnBoardingSuccessContainer';

jest.mock('../../reset-password/action', () => ({
  getProductName: jest.fn((locale, fallbackName) => ({
    type: 'GET_PRODUCT_NAME',
    payload: {
      locale,
      fallbackName,
    },
  })),
}));

describe('OnBoardingSuccessContainer', () => {
  it('should pass the props and state to the component', () => {
    const state = {
      resetPassword: {
        productName: 'ProductA',
      },
    };
    const expected = {
      productName: 'ProductA',
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch the get product name action', () => {
    const dispatch = jest.fn();

    const dispatchToProps = mapDispatchToProps(dispatch);
    const expected = {
      type: 'GET_PRODUCT_NAME',
      payload: {
        locale: 'en-HK',
        fallbackName: 'Default',
      },
    };

    dispatchToProps.getProductName('en-HK', 'Default');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
