/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent, act, wait } from '@testing-library/react';
import withRedux from '../../../../redux/withReduxProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import OtpVerification from '../OtpVerification';
import { otp } from '../../../../helpers/validation';

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);
jest.mock('../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment');
  const moment = jest.fn(() => {
    return originalMoment('2020-01-01T12:01:12Z');
  });
  moment.utc = jest.fn(time => {
    return originalMoment.utc(time);
  });
  moment.duration = originalMoment.duration;
  return moment;
});

describe('OTP verification component', () => {
  const props = {
    loading: false,
    resend: jest.fn(),
    otpStatus: {
      nextOtpRequestAllowedAtUtc: '2020-01-01T12:01:12',
    },
    headerTitle: 'Text',
    headerDescription: 'Text',
    verify: jest.fn(),
    form: 'otp-form',
  };

  const updateOtpValue = (getByTestId, value) => {
    const otpField = getByTestId('input-token');
    const otpInput = otpField.querySelector('input');
    fireEvent.change(otpInput, { target: { value } });
  };

  it('should match snapshot', () => {
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when loading', () => {
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { container } = render(<Component {...props} loading />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when waiting resend status enabled', () => {
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { container } = render(
      <Component
        {...props}
        otpStatus={{
          nextOtpRequestAllowedAtUtc: '2020-01-01T12:01:15Z',
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should show required otp error message', () => {
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { container, getByTestId } = render(
      <Component {...props} initialValues={{ otp: '' }} />,
    );
    const verifyBtn = getByTestId('btn-submit-verify-otp');
    fireEvent.click(verifyBtn);
    expect(container).toMatchSnapshot();
  });

  it('should show invalid otp error message', () => {
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { container, getByTestId } = render(
      <Component {...props} validateOtp={otp} />,
    );

    updateOtpValue(getByTestId, 'invalid otp');

    const verifyBtn = getByTestId('btn-submit-verify-otp');
    fireEvent.click(verifyBtn);
    expect(container).toMatchSnapshot();
  });

  it('should call verify with valid otp', () => {
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { getByTestId } = render(<Component {...props} />);

    updateOtpValue(getByTestId, '123456');

    const verifyBtn = getByTestId('btn-submit-verify-otp');
    fireEvent.click(verifyBtn);
    expect(props.verify).toHaveBeenCalled();
  });

  it('should not call resend when counting', () => {
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { getByTestId } = render(
      <Component
        {...props}
        otpStatus={{
          nextOtpRequestAllowedAtUtc: '2020-01-01T12:01:15Z',
        }}
      />,
    );

    const resendBtn = getByTestId('resend-otp');
    fireEvent.click(resendBtn);
    expect(props.resend).not.toHaveBeenCalled();
  });

  it('should call resend', async () => {
    jest.useFakeTimers();
    const Component = withRedux(withTheme(withIntl(OtpVerification)));
    const { getByTestId } = render(
      <Component
        {...props}
        otpStatus={{
          nextOtpRequestAllowedAtUtc: '2020-01-01T12:01:15Z',
        }}
      />,
    );
    act(() => {
      jest.runAllTimers();
    });
    const resendBtn = getByTestId('resend-otp');
    fireEvent.click(resendBtn);
    await wait(() => expect(props.resend).toHaveBeenCalled());
  });
});
