/* eslint-disable no-unused-vars,react/prop-types,react/no-array-index-key */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ClaimDetails from '../ClaimDetails';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

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

jest.mock('../helper', () => ({
  patientDetails: jest.fn((patientName, contactNumber) => [
    {
      label: 'Patient name',
      value: patientName,
    },
  ]),
  getBackgroundImage: jest.fn(() => '/static/pending_claim_background.svg'),
  claimSubmissionDetails: jest.fn(() => [
    {
      label: 'Claim number',
      value: '1121',
    },
    {
      label: 'Claim submission date',
      value: '16 Aug 2019',
    },
  ]),
  claimDetailsWithIntl: jest.fn(() => [
    {
      label: 'Consultation type',
      value: 'dummy',
    },
    {
      label: 'Consultation date',
      value: '01 Aug 2019',
    },
    {
      label: 'Claim amount',
      value: 'HK$ 123.01',
    },
    {
      label: 'Claim amount(other insurer)',
      value: 'HK$ 123',
    },
  ]),
}));

jest.mock('../Details', () => ({ header, details }) => (
  <div>
    <div>Dummy Details Component</div>
    <div>header</div>
    <div data-id="props">
      {details.map((detail, index) => (
        <div key={index}>
          <span>{detail.label}</span>
          <span>{detail.value}</span>
        </div>
      ))}
    </div>
  </div>
));

jest.mock(
  '../../../../uiComponents/FileItems',
  // eslint-disable-next-line react/prop-types
  () => ({ onClick, ...rest }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={() => onClick({ name: 'file-name', url: 'file-url' })}
      data-testid="file-items"
      {...rest}
    >
      Dummy FileComponent
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatAmount: jest.fn((intl, amount) => amount),
  openFile: jest.fn(),
}));

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

describe('ClaimDetails component', () => {
  let props;
  const Component = withTheme(withIntl(ClaimDetails));
  beforeEach(() => {
    props = {
      router: {
        query: {
          id: 12,
        },
      },
      getNewClaimDetails: jest.fn(),
      getMemberProfile: jest.fn(),
      claimDetails: {
        status: 'Pending',
        statusCode: 'PROCESSING',
        claimSubmissionDate: '11 Sep 2019',
        claimantId: '3',
        contactNumber: '123456',
        claimItemCategoryCode: 'outpatient',
        consultationType: 'Outpatient',
        diagnosis: 'Abdominal Colic',
        consultationDate: '11 Sep 2019',
        receiptAmount: 1,
        reimbursedAmount: 0,
        settlementDate: '11 Sep 2019',
        claimAmountOtherInsurer: 0,
        remark: 'this is a test remark',
        receipts: [
          {
            name: 'receipt.jpg',
            url: '/receipt.jpg',
          },
        ],
        referrals: [
          {
            name: 'referral.jpg',
            url: '/referral.jpg',
          },
        ],
      },
      membersMap: { 3: 'William Brown' },
      claims: [],
    };
  });
  it('should match the snapshot with Pending claims', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot with Approved claims', () => {
    props.claimDetails.statusCode = 'APPROVED';
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
  it('should match the snapshot with Rejected claims', () => {
    props.claimDetails.statusCode = 'REJECTED';
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with Request for information', () => {
    props.claimDetails.statusCode = 'REQUEST FOR INFORMATION';
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot without before claim data fetched', () => {
    props.claimDetails.statusCode = '';
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when claims list available', () => {
    props.claims = [
      {
        id: '12',
        status: 'Approved',
        statusCode: 'APPROVED',
        consultationDate: '2019-09-11T04:34:18.065384',
        consultationTypes: 'General practitioner',
        patientId: '3',
        claimedAmount: 1,
        approvedAmount: 0,
        originalClaim: {
          claimId: '12',
          clientId: 'cxadevclient1',
          memberId: '3',
          claimantId: '3',
          receiptDate: '2019-09-11T04:34:18.065384',
          amount: 1.0,
          reason: 'Abdominal Colic',
          reasonCode: 'COLIC',
          type: 'General practitioner',
          typeCode: 'MO-GP',
          category: 'Outpatient',
          categoryCode: 'outpatient',
          status: 'Approved',
          statusCode: 'APPROVED',
          approvedAmount: 0.0,
          acceptTermsAndConditions: true,
          contactNumber: '123456',
          otherInsurerAmount: 0.0,
          documents: {
            referrals: [],
            receipts: [
              {
                id: '1',
                contentType: 'application/pdf',
              },
            ],
          },
        },
      },
    ];
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
