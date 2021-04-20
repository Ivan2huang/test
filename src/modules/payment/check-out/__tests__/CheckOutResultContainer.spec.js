import * as actionTypes from '../../actionTypes';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../CheckOutResultContainer';

describe('Checkout Result Container', () => {
  it('should validate order', () => {
    const dispatch = jest.fn();
    const expected = {
      type: actionTypes.VALIDATE_ORDER,
      payload: {
        paRes: '',
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.validateOrder(expected.payload.paRes);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should init empty state', () => {
    const state = {};

    const stateProps = mapStateToProps(state);

    const expected = {};

    expect(stateProps).toEqual(expected);
  });
});
