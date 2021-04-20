import { mapDispatchToProps, mapStateToProps } from '../PaymentResultContainer';

describe('Payment Result Container', () => {
  it('should validate instrument', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'VALIDATE_INSTRUMENT',
      payload: {
        paRes: 'Test',
      },
    };
    const dispatchToProps = mapDispatchToProps(dispatch);
    dispatchToProps.validateInstrument('Test');

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should init empty state', () => {
    const state = {};
    const stateProps = mapStateToProps(state);
    const expected = {};

    expect(stateProps).toEqual(expected);
  });
});
