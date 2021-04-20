import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import withIntl from '../../../../../../i18n/withIntlProvider';
import VerifyOTPContainer, {
  mapDispatchToProps,
  mapStateToProps,
} from '../VerifyOTPContainer';

// eslint-disable-next-line react/prop-types
jest.mock(
  '../../../../Me',
  // eslint-disable-next-line react/prop-types
  () => ({ children, isLoaded, memberProfile, isMobileOnly, ...rest }) => {
    return (
      <div {...rest}>
        Me Component
        {children}
      </div>
    );
  },
);

jest.mock('../../../../action', () => ({
  verifyOTP: jest.fn(() => ({
    type: 'VERIFY_OTP',
    payload: {},
  })),
  getMemberProfileWithMembershipNumber: jest.fn(() => ({
    type: 'GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER',
    payload: {},
  })),
  requestMobileNumberStatus: jest.fn(() => ({
    type: 'REQUEST_MOBILE_NUMBER_STATUS',
    payload: {},
  })),
  resendOTP: jest.fn(() => ({
    type: 'RESEND_OTP',
    payload: {},
  })),
}));

jest.mock('../../../../../loader/util', () => ({
  loaderDetail: () => ({
    loading: false,
    message: '',
  }),
}));

const mockStore = configureStore([]);

const me = {
  member: {
    profile: {
      role: 'Employee',
      memberId: 1,
      fullName: 'test name',
      dependants: [
        {
          memberId: 2,
          fullName: 'test name 2',
        },
        {
          memberId: 3,
          fullName: 'test name 3',
        },
      ],
    },
    mobileNumberStatus: {
      newValue: '',
      allowedToVerify: false,
      attemptCount: 0,
      nextOTPRequestAllowedAtUtc: '',
    },
  },
};

describe('VerifyOTP Container', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      me,
      loader: {},
    });
  });

  it('should match snapshot', () => {
    const Component = withIntl(VerifyOTPContainer);
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should dispatch request to get mobile number status action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'REQUEST_MOBILE_NUMBER_STATUS',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getMobileNumberStatus();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch request to get member profile action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getMemberProfile();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch request to verify otp action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'VERIFY_OTP',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.verifyOTP();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch resend otp action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'RESEND_OTP',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.resendOTP();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should pass props to component', () => {
    const state = {
      me: {
        member: {
          profile: {
            role: 'Employee',
            memberId: 1,
            fullName: 'test name',
            dependants: [
              {
                memberId: 2,
                fullName: 'test name 2',
              },
              {
                memberId: 3,
                fullName: 'test name 3',
              },
            ],
          },
          mobileNumberStatus: {
            newValue: '',
            allowedToVerify: false,
            attemptCount: 0,
            nextOTPRequestAllowedAtUtc: '',
          },
        },
      },
    };

    const expected = {
      profile: {
        role: 'Employee',
        memberId: 1,
        fullName: 'test name',
        dependants: [
          {
            memberId: 2,
            fullName: 'test name 2',
          },
          {
            memberId: 3,
            fullName: 'test name 3',
          },
        ],
      },
      mobileNumberStatus: {
        newValue: '',
        allowedToVerify: false,
        attemptCount: 0,
        nextOTPRequestAllowedAtUtc: '',
      },
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
