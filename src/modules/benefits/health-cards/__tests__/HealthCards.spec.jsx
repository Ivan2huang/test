/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import HealthCards from '../HealthCards';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../HealthCard',
  // eslint-disable-next-line react/prop-types
  () => props => (
    <div>
      HealthCard Component
      <span>{mockPropsCapture(props)}</span>
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('HealthCards Component', () => {
  const props = {
    memberProfile: {
      firstName: 'William',
      lastName: 'Brown',
      memberId: '3',
      membershipNumber: '123',
      certificateNumber: 'CERT123',
      role: 'Employee',
      planId: 1,
      category: 'Tier 1',
      relationships: [
        {
          firstName: 'William',
          lastName: 'Black',
          memberId: '111',
          membershipNumber: '123',
          planId: 1,
        },
        {
          firstName: 'William',
          lastName: 'White',
          memberId: '112',
          membershipNumber: '124',
          planId: 1,
          status: 'Terminated',
        },
      ],
      coPayments: { 1: { GP: 10, SP: 10, PHY: 10 } },
      healthCards: [
        { memberId: '3', type: 'PRIMARY' },
        { memberId: '111', type: 'SECONDARY' },
        { memberId: '112', type: 'SECONDARY' },
      ],
      policy: {
        policyNumber: 'PN123',
        expiryDate: '12-3-2020',
        insurer: {
          code: 'IC123',
          name: 'ABC insurer',
          eHealthCardName: 'test eHealth card name',
          cardType: 'HSBC',
        },
      },
    },
    getMemberProfile: jest.fn(),
    setIsLoaded: jest.fn(),
    loaded: true,
  };

  it('should match the snapshot', () => {
    const Component = withIntl(HealthCards);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when member role not employee', () => {
    const Component = withIntl(HealthCards);
    const newProps = {
      ...props,
      memberProfile: {
        ...props.memberProfile,
        role: 'Dependent',
      },
    };
    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when not render copayment section', () => {
    const Component = withIntl(HealthCards);
    const newProps = {
      ...props,
      memberProfile: {
        ...props.memberProfile,
        category: 'Tier 3',
      },
    };
    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when not rendering health cards', () => {
    props.memberProfile.healthCards = [{ memberId: '111', type: 'PRIMARY' }];
    const Component = withIntl(HealthCards);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when not provide policy data', () => {
    const nextProps = {
      memberProfile: {
        ...props.memberProfile,
        policy: [],
      },
      loaded: true,
    };
    const Component = withIntl(HealthCards);
    const { container } = render(<Component {...nextProps} />);

    expect(container).toMatchSnapshot();
  });
});
