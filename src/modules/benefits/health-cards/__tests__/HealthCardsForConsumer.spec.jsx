/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import HealthCards from '../HealthCardsForConsumer';
import withIntl from '../../../../i18n/withIntlProvider';
import withThemeProvider from '../../../../themes/withThemeProvider';

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
  today: () => '2020/09/09',
}));

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment');
  const moment = jest.fn(() => {
    return originalMoment(new Date('2020/09/09'));
  });
  moment.utc = originalMoment.utc;
  return moment;
});

describe('HealthCardsForConsumer Component', () => {
  let props;

  beforeEach(() => {
    props = {
      memberProfile: {
        firstName: 'William',
        lastName: 'Brown',
        memberId: '3',
        membershipNumber: '333',
        certificateNumber: 'CERT123',
        role: 'Employee',
        planId: 1,
        category: 'Tier 1',
        relationships: [
          {
            firstName: 'William',
            lastName: 'Black',
            memberId: '4',
            membershipNumber: '444',
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
          {
            memberId: '3',
            type: 'PRIMARY',
          },
          {
            memberId: '4',
            type: 'SECONDARY',
          },
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
        consumerBenefits: [
          {
            memberId: '3',
            membershipNumber: '333',
            currency: 'HKD',
            groupMedicalBenefits: [
              {
                remark: 'W8',
                benefitName: 'Outpatient Benefit',
                benefitDetails: [
                  {
                    coPaymentText: 'GP: 20',
                  },
                  {
                    coPaymentText: 'XR: 0',
                  },
                ],
              },
            ],
          },
          {
            memberId: '4',
            membershipNumber: '444',
            currency: 'HKD',
            groupMedicalBenefits: [
              {
                remark: 'W9',
                benefitName: 'Wellness Benefit',
                benefitDetails: [
                  {
                    coPaymentText: 'GP: 30',
                  },
                  {
                    coPaymentText: 'XR: 10',
                  },
                ],
              },
            ],
          },
        ],
      },
      eHealthCardDetails: {},
      cardType: 'default',
      cardTypeDetails: {},
      isClientGMM: false,
    };
  });

  it('should match the snapshot with default card type', () => {
    const Component = withThemeProvider(withIntl(HealthCards));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with default card type and role is not employee', () => {
    props.memberProfile.role = 'Dependent';
    const Component = withThemeProvider(withIntl(HealthCards));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with hase card type', () => {
    const Component = withThemeProvider(withIntl(HealthCards));
    const { container } = render(<Component {...props} cardType="hase" />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when client is GMM', () => {
    const Component = withThemeProvider(withIntl(HealthCards));
    const { container } = render(<Component {...props} isClientGMM />);

    expect(container).toMatchSnapshot();
  });
});
