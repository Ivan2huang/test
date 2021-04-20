/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import withIntl from '../../../../i18n/withIntlProvider';
import Details from '../Details';
import PersonInfo from '../PersonInfo';

jest.mock('../PersonInfo', () => props => (
  <div>
    <span>Person Info</span>
    <span data-id="props">
      {props.fields.map(f => `${f.label} = ${f.value}`)}
    </span>
  </div>
));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => <div {...rest}>{children}</div>,
);

jest.mock('../PendingEmailStatus', () => () => (
  <div>Warning Pending Email Box</div>
));

jest.mock('../PendingMobileNumberStatus', () => () => (
  <div>Warning Pending Mobile Number Box</div>
));

describe('Details Component', () => {
  const props = {
    memberProfile: {
      policyNumber: '002',
      memberProfileOrder: [
        {
          memberId: '110',
          fullName: 'Mark Tan',
          relationship: 'Employee',
          workEmail: 'testing@company.com',
          email: 'testing@test.com',
          membershipNumber: '000110',
          validAgeRange: true,
          hasLoggedIn: true,
          policyNumber: '001',
        },
        {
          memberId: '111',
          fullName: 'William Born',
          relationship: 'Spouse',
          email: 'william@test.com',
          membershipNumber: '000111',
          validAgeRange: true,
          hasLoggedIn: true,
          status: 'Terminated',
          limitedAccessUntil: '2019-12-01T00:00:00',
        },
        {
          memberId: '112',
          fullName: 'Dash Born',
          relationship: 'Spouse',
          email: 'william@test.com',
          membershipNumber: '000112',
          validAgeRange: true,
          hasLoggedIn: true,
          status: 'Terminated',
        },
      ],
      fullName: 'Mark Tan',
      membershipNumber: '12345',
      email: 'testing@test.com',
      role: 'Employee',
      workEmail: 'testing@company.com',

      relationships: [
        {
          fullName: 'William Born',
          memberId: '100',
          membershipNumber: '8907',
          relationship: 'Spouse',
          relationshipCategory: 'Spouse',
        },
      ],
      policy: {
        plans: [],
      },
    },
    components: {
      PersonInfo,
    },
    getMemberProfile: jest.fn(),
    setIsLoaded: jest.fn(),
    personalEmailStatus: {
      email: '',
      status: 'None',
    },
    mobileNumberStatus: {
      newValue: '',
      allowedToVerify: false,
      attemptCount: 0,
      nextOTPRequestAllowedAtUtc: '',
    },
  };

  it('should match the snapshot with dependents', () => {
    const Component = withIntl(Details);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot without dependents', () => {
    const Component = withIntl(Details);
    const newProps = {
      ...props,
    };
    newProps.memberProfile.relationships = [];

    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when user is dependent', () => {
    const Component = withIntl(Details);
    const dependentProps = {
      memberProfile: {
        memberProfileOrder: [
          {
            memberId: '110',
            fullName: 'Mark Tan',
            relationship: 'Employee',
            relationshipCategory: 'Employee',
            role: 'Employee',
            workEmail: 'testing@company.com',
            email: 'testing@test.com',
            membershipNumber: '12345',
          },
          {
            memberId: '100',
            fullName: 'William Born',
            relationship: 'Spouse',
            relationshipCategory: 'Spouse',
            role: 'Dependent',
            dateOfBirth: '2001-10-23',
            email: 'william@test.com',
            membershipNumber: '8907',
            validAgeRange: true,
            hasLoggedIn: false,
          },
          {
            memberId: '101',
            fullName: 'Dash Born',
            relationship: 'Child',
            relationshipCategory: 'Child',
            role: 'Dependent',
            dateOfBirth: '2001-10-23',
            email: 'william@test.com',
            membershipNumber: '8907',
            validAgeRange: false,
            hasLoggedIn: false,
          },
          {
            memberId: '102',
            fullName: 'Catherine Tan',
            relationship: 'Child',
            relationshipCategory: 'Child',
            role: 'Dependent',
            dateOfBirth: undefined,
            email: 'catherine@test.com',
            membershipNumber: '8908',
            validAgeRange: false,
            hasLoggedIn: false,
          },
        ],
        fullName: 'Mark Tan',
        membershipNumber: '12345',
        email: 'testing@test.com',
        role: 'Dependent',
        relationships: [
          {
            memberId: '100',
            fullName: 'William Born',
            relationship: 'Spouse',
            relationshipCategory: 'Spouse',
            email: 'william@test.com',
            membershipNumber: '8907',
          },
          {
            memberId: '101',
            fullName: 'Catherine Tan',
            relationship: 'Child',
            relationshipCategory: 'Child',
            email: 'catherine@test.com',
            membershipNumber: '8908',
          },
        ],
        policy: {
          plans: [],
        },
      },
      components: {
        PersonInfo,
      },
      getMemberProfile: jest.fn(),
      setIsLoaded: jest.fn(),
      personalEmailStatus: {
        email: '',
        status: 'None',
      },
      mobileNumberStatus: {
        newValue: '',
        allowedToVerify: false,
        attemptCount: 0,
        nextOTPRequestAllowedAtUtc: '',
      },
    };

    const { container } = render(<Component {...dependentProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when user is dependent and logged in', () => {
    const Component = withIntl(Details);
    const dependentProps = {
      memberProfile: {
        memberId: '100',
        memberProfileOrder: [
          {
            memberId: '110',
            fullName: 'Mark Tan',
            relationship: 'Employee',
            relationshipCategory: 'Employee',
            role: 'Employee',
            email: 'testing@test.com',
            workEmail: 'testing@company.com',
            membershipNumber: '12345',
          },
          {
            memberId: '100',
            fullName: 'William Born',
            relationship: 'Spouse',
            relationshipCategory: 'Spouse',
            role: 'Dependent',
            dateOfBirth: '2001-10-23',
            email: 'william@test.com',
            membershipNumber: '8907',
            validAgeRange: true,
            hasLoggedIn: false,
          },
          {
            memberId: '101',
            fullName: 'Dash Born',
            relationship: 'Child',
            relationshipCategory: 'Child',
            role: 'Dependent',
            dateOfBirth: '2001-10-23',
            email: 'william@test.com',
            membershipNumber: '8907',
            validAgeRange: false,
            hasLoggedIn: false,
          },
          {
            memberId: '102',
            fullName: 'Catherine Tan',
            relationship: 'Child',
            relationshipCategory: 'Child',
            role: 'Dependent',
            dateOfBirth: undefined,
            email: 'catherine@test.com',
            membershipNumber: '8908',
            validAgeRange: false,
            hasLoggedIn: false,
          },
        ],
        fullName: 'Mark Tan',
        membershipNumber: '12345',
        email: 'testing@test.com',
        role: 'Dependent',
        relationships: [
          {
            memberId: '100',
            fullName: 'William Born',
            relationship: 'Spouse',
            relationshipCategory: 'Spouse',
            email: 'william@test.com',
            membershipNumber: '8907',
          },
          {
            memberId: '101',
            fullName: 'Catherine Tan',
            relationship: 'Child',
            relationshipCategory: 'Child',
            email: 'catherine@test.com',
            membershipNumber: '8908',
          },
        ],
        policy: {
          plans: [],
        },
      },
      components: {
        PersonInfo,
      },
      getMemberProfile: jest.fn(),
      setIsLoaded: jest.fn(),
      personalEmailStatus: {
        email: '',
        status: 'None',
      },
      mobileNumberStatus: {
        newValue: '',
        allowedToVerify: false,
        attemptCount: 0,
        nextOTPRequestAllowedAtUtc: '',
      },
    };

    const { container } = render(<Component {...dependentProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with pending email status warning box', () => {
    const newProps = {
      ...props,
      personalEmailStatus: {
        email: 'test@example.com',
        status: 'Processing',
      },
      mobileNumberStatus: {
        newValue: '',
        allowedToVerify: false,
        attemptCount: 0,
        nextOTPRequestAllowedAtUtc: '',
      },
    };
    const Component = withIntl(Details);
    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with pending mobile number status warning box', () => {
    const newProps = {
      ...props,
      personalEmailStatus: {
        email: 'test@example.com',
        status: 'Processing',
      },
      mobileNumberStatus: {
        newValue: '+84 111111',
        allowedToVerify: false,
        attemptCount: 0,
        nextOTPRequestAllowedAtUtc: '',
      },
    };
    const Component = withIntl(Details);
    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });
});
