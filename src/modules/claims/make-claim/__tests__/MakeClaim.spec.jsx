import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import MakeClaim from '../MakeClaim';

jest.mock('../MakeClaimForm', () => props => (
  <div>
    <span>Make Claim Form</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock('../MakeClaimHeader', () => props => (
  <div>
    <span>Make Claim Header</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('MakeClaim Component', () => {
  const memberToWalletBalanceMap = {};
  memberToWalletBalanceMap['12'] = 2000;
  memberToWalletBalanceMap['27'] = 1000;
  const props = {
    maxReceiptAmount: 800,
    insuranceClaim: true,
    referralRequired: true,
    tncModal: true,
    selectedPatientId: '12',
    patients: [
      {
        fullName: 'dummy name',
        memberId: '12',
      },
      {
        fullName: 'dummy dependant name',
        memberId: '1',
      },
    ],
    consultationTypes: {
      Outpatient: [
        {
          key: 1,
          value: 'General Medical Practitioner',
        },
      ],
      Wellness: [
        {
          key: 2,
          value: 'Dental Care',
        },
        {
          key: 3,
          value: 'General Medical Practitioner',
        },
      ],
    },
    diagnosisTypes: [
      {
        key: 4,
        value: 'Abdominal Pain',
        code: 'AP',
      },
      {
        key: 5,
        value: 'Abortion/Miscarriage',
        code: 'AM',
      },
    ],
    initialValues: {
      patient: {
        patientId: '12',
        contactNumber: '1234567890',
      },
      claim: {
        consultationDate: new Date(Date.UTC(2019, 6, 10)),
        anotherInsurer: false,
      },
      receipts: {
        files: [],
      },
      referral: {
        files: [],
      },
      settlementAdvices: {
        files: [],
      },
      prescriptions: {
        files: [],
      },
    },
    loader: {
      diagnosis: {
        loading: false,
        message: '',
      },
      walletBalance: {
        loading: false,
        message: '',
      },
    },
    walletBalance: {
      memberToWalletBalanceMap,
      error: false,
    },
    getMemberProfile: jest.fn(),
    getClaimTypes: jest.fn(),
    getClaimItems: jest.fn(),
    getClaimFields: jest.fn(),
    getWalletBalance: jest.fn(),
    submitClaim: jest.fn(),
    updateTNCModal: jest.fn(),
    updateTNCAction: jest.fn(),
    isChineseHerbalist: false,
    maxAdditionalDocumentAllowed: 1,
    isTerminatedPatient: false,
    terminatedDate: undefined,
    getTermAndCondition: jest.fn(),
    consultationCategoryName: {},
  };

  it('should match the snapshot', () => {
    const Component = withIntl(withTheme(MakeClaim));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
