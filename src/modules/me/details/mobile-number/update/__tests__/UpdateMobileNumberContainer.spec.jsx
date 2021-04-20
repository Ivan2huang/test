import React from 'react';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import withIntl from '../../../../../../i18n/withIntlProvider';
import UpdateMobileNumberContainer, {
  mapDispatchToProps,
  mapStateToProps,
} from '../UpdateMobileNumberContainer';

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
  changeMobileNumber: jest.fn(() => ({
    type: 'CHANGE_MOBILE_NUMBER',
    payload: {},
  })),
  getMemberProfileWithMembershipNumber: jest.fn(() => ({
    type: 'GET_MEMBER_PROFILE_WITH_MEMBERSHIP_NUMBER',
    payload: {},
  })),
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
  },
};

describe('UpdateMobileNumber Container', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      me,
    });
  });

  it('should match snapshot', () => {
    const Component = withIntl(UpdateMobileNumberContainer);
    const { container } = render(
      <Provider store={store}>
        <Component />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should dispatch request change mobile number action', () => {
    const dispatch = jest.fn();
    const expected = {
      type: 'CHANGE_MOBILE_NUMBER',
      payload: {},
    };

    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.changeMobileNumber();

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
    };

    const actual = mapStateToProps(state);

    expect(actual).toStrictEqual(expected);
  });
});
