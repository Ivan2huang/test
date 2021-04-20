import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import MakeClaimForm from '../MakeClaimForm';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import withRedux from '../../../../redux/withReduxProvider';
import { validate } from '../validation';
import { isEmpty, navigateTo } from '../../../../helpers/helpers';

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  validateFiles: jest.fn(files => files),
  isEmpty: jest.fn(() => true),
  addDays: jest.fn(),
  getCurrentDate: jest.fn(),
  navigateTo: jest.fn(),
}));

jest.mock('../validation', () => ({
  validate: jest.fn(() => {}),
}));

jest.mock('../ClaimDetails', () => props => (
  <div>
    <span>Claim Details Section</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../uploadReceipts', () => props => (
  <div>
    <span>Upload Receipts Section</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../uploadReferral', () => props => (
  <div>
    <span>Upload Referral Section</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../PatientDetails', () => props => (
  <div>
    <span>Patient Details Section</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('MakeClaimForm Component', () => {
  const memberToWalletBalanceMap = {};
  memberToWalletBalanceMap['12'] = 2000;
  memberToWalletBalanceMap['27'] = 1000;
  const props = {
    maxReceiptAmount: 800,
    insuranceClaim: true,
    referralRequired: false,
    anotherInsurerEnabled: false,
    selectedPatientId: '12',
    planId: '2019',
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
          value: 'General Medical Practitioner Wellness',
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
    router: {
      location: {
        pathname: '/login',
      },
    },
    initialValues: {
      patient: {
        patientId: '12',
        contactNumber: '12345678',
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
    getTermAndCondition: jest.fn(),
    submitClaim: jest.fn(),
    isChineseHerbalist: false,
    maxAdditionalDocumentAllowed: 5,
    isTerminatedPatient: false,
    terminatedDate: undefined,
    consultationCategoryName: {},
  };

  const setUp = (componentProps = props) => {
    const Component = withRedux(withIntl(withTheme(MakeClaimForm)));
    return render(<Component {...componentProps} />);
  };

  beforeEach(() => {
    URL.createObjectURL = jest.fn(file => file.name);
  });

  afterEach(() => {
    props.getMemberProfile.mockReset();
    props.getClaimTypes.mockReset();
    props.getClaimItems.mockReset();
    props.getClaimFields.mockReset();
    props.submitClaim.mockReset();
    cleanup();
  });

  it('should call submit claim on form submit', () => {
    const newProps = {
      ...props,
      initialValues: {
        patient: {
          patientId: '1',
          contactNumber: '908715',
        },
        claim: {
          claimId: 1,
          diagnosis: 'Abdominal Pain',
          receiptAmount: '1234',
          anotherInsurer: true,
          otherInsurerAmount: '123',
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
      selectedClaimId: 1,
      anotherInsurerEnabled: true,
      referralRequired: true,
    };

    const result = setUp(newProps);
    const button = result.getByTestId('btn-submit-claim');
    fireEvent.click(button, {});

    expect(navigateTo).toHaveBeenCalledWith('/claims/review');
  });

  it('should not submit claim if validation fails', () => {
    validate.mockReturnValue({
      referral: { files: { _error: 'Required' } },
    });
    isEmpty.mockReturnValue(false);

    const newProps = {
      ...props,
      initialValues: {
        patient: {
          patientId: '1',
          contactNumber: '908715',
        },
        claim: {
          claimId: 1,
          diagnosis: 'Abdominal Pain',
          receiptAmount: '1234',
          anotherInsurer: true,
          otherInsurerAmount: '123',
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
      selectedClaimId: 1,
      anotherInsurerEnabled: true,
      referralRequired: true,
    };

    const result = setUp(newProps);
    const button = result.getByTestId('btn-submit-claim');
    fireEvent.click(button, {});

    expect(props.submitClaim).not.toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const result = setUp();
    expect(result.container).toMatchSnapshot();
  });

  it('should match the snapshot with chinese herbalist documents enabled', () => {
    const result = setUp({ ...props, isChineseHerbalist: true });
    expect(result.container).toMatchSnapshot();
  });

  it('should get user profile on load', () => {
    setUp();
    expect(props.getMemberProfile).toHaveBeenCalledTimes(1);
  });

  it('should get claim types on load', () => {
    setUp();
    expect(props.getClaimTypes).toHaveBeenCalledTimes(1);
  });

  it('should disabled the submit button when wallet balance is zero', () => {
    const memberToWalletBalanceMapTemp = {};
    memberToWalletBalanceMapTemp['12'] = 0;
    memberToWalletBalanceMapTemp['27'] = 1000;
    const result = setUp({
      ...props,
      selectedClaimId: 2,
      insuranceClaim: false,
      walletBalance: {
        memberToWalletBalanceMap: memberToWalletBalanceMapTemp,
        error: false,
      },
    });

    const button = result.getByTestId('btn-submit-claim');

    expect(button).toMatchSnapshot();
  });

  it('should not disabled the submit button when wallet balance is not zero', () => {
    const memberToWalletBalanceMapTemp = {};
    memberToWalletBalanceMapTemp['12'] = 100;
    memberToWalletBalanceMapTemp['27'] = 1000;
    const result = setUp({
      ...props,
      selectedClaimId: 2,
      insuranceClaim: false,
      walletBalance: {
        memberToWalletBalanceMap: memberToWalletBalanceMapTemp,
        error: false,
      },
    });

    const button = result.getByTestId('btn-submit-claim');

    expect(button).toMatchSnapshot();
  });

  it('should not disabled submit button when wallet balance api fail', () => {
    const result = setUp({
      ...props,
      selectedClaimId: 2,
      insuranceClaim: false,
      walletBalance: {
        memberToWalletBalanceMap: {},
        error: true,
      },
    });

    const button = result.getByTestId('btn-submit-claim');

    expect(button).toMatchSnapshot();
  });
});
