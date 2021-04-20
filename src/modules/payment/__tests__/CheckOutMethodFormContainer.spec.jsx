import { mapStateToProps, mergeProps } from '../CheckOutMethodFormContainer';

describe('CheckOutMethodFormContainer', () => {
  it('should init state', () => {
    const state = {
      payment: {
        paymentMethods: [],
      },
    };

    const stateProps = mapStateToProps(state);

    const expected = {
      paymentMethods: [],
    };

    expect(stateProps).toEqual(expected);
  });

  it('should payment methods from own props', () => {
    const result = mergeProps(
      { paymentMethods: [{ a: 2 }] },
      {},
      { paymentMethods: [{ a: 1 }] },
    );

    expect(result).toEqual({
      paymentMethods: [{ a: 1 }],
    });
  });

  it('should payment methods from redux', () => {
    const result = mergeProps({ paymentMethods: [{ a: 2 }] }, {}, {});

    expect(result).toEqual({
      paymentMethods: [{ a: 2 }],
    });
  });
});
