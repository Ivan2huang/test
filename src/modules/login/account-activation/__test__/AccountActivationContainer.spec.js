import {
  mapStateToProps,
  mapDispatchToProps,
} from '../AccountActivationContainer';

jest.mock('../action', () => ({
  resend: jest.fn(() => ({
    type: 'RESEND',
    payload: {},
  })),
  checkOTPStatus: jest.fn(() => ({
    type: 'CHECK_OTP_STATUS',
    payload: {},
  })),
  verify: jest.fn(otpCode => ({
    type: 'VERIFY',
    payload: { otpCode },
  })),
}));

const props = {
  isFirstTimeUser: false,
};

describe('Account activation container', () => {
  it('should pass the props and state to the component', () => {
    const state = {
      accountActivation: {
        otpStatus: {
          nextOtpRequestAllowedAtUtc: '2020-01-03T11:22:33',
        },
      },
    };

    const expected = {
      otpStatus: {
        nextOtpRequestAllowedAtUtc: '2020-01-03T11:22:33',
      },
    };

    const actual = mapStateToProps(state, props);
    expect(actual).toEqual(expected);
  });

  it('should dispatch resend otp action', () => {
    const dispatch = jest.fn();
    const dispatchToProps = mapDispatchToProps(dispatch);

    const expected = {
      type: 'RESEND',
      payload: {},
    };

    dispatchToProps.resend();
    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch check otp status action', () => {
    const dispatch = jest.fn();
    const dispatchToProps = mapDispatchToProps(dispatch);

    const expected = {
      type: 'CHECK_OTP_STATUS',
      payload: {},
    };

    dispatchToProps.checkStatus();
    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch verify otp action', () => {
    const dispatch = jest.fn();
    const dispatchToProps = mapDispatchToProps(dispatch);

    const expected = {
      type: 'VERIFY',
      payload: { otpCode: '123456' },
    };

    dispatchToProps.verify('123456');
    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
