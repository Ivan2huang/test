/* eslint-disable no-shadow */

import React from 'react';
import {
  render,
  fireEvent,
  getByText,
  getAllByText,
} from '@testing-library/react';
import { reduxForm } from 'redux-form';
import { addDays } from '../../../../helpers/helpers';

import ClaimDetails from '../ClaimDetails';
import withIntl from '../../../../i18n/withIntlProvider';
import withRedux from '../../../../redux/withReduxProvider';
import withTheme from '../../../../themes/withThemeProvider';
import { logAction } from '../../../../helpers/firebase';

jest.mock('../../../../helpers/helpers', () => ({
  formatAmount: jest.fn((intl, amount) => amount),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  addDays: jest.fn(),
  getCurrentDate: jest.fn(),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

// eslint-disable-next-line react/prop-types
jest.mock('../WalletBalance', () => ({ walletBalance, onRefresh, ...rest }) => (
  <div>
    Wallet Balance Component
    <span data-id="props">
      {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
    </span>
    <button type="button" onClick={onRefresh} data-testid="btn-refresh">
      refresh
    </button>
    {`wallet balance ${walletBalance}`}
  </div>
));

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
  logEvent: jest.fn(),
}));

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment');
  const moment = jest.fn(() => {
    return originalMoment(new Date('2020/03/01'));
  });
  moment.utc = jest.fn(date => {
    return originalMoment.utc(new Date(date));
  });
  return moment;
});

describe('ClaimDetails Component', () => {
  beforeEach(() => {
    logAction.mockClear();
  });

  const memberToWalletBalanceMap = {};
  memberToWalletBalanceMap['12'] = 2000;
  memberToWalletBalanceMap['27'] = 1000;
  const props = {
    consultationTypes: {
      Outpatient: [
        {
          key: 1,
          value: 'General Medical Practitioner',
        },
        {
          key: 2,
          value: 'Another General Medical Practitioner',
        },
      ],
      Wellness: [
        {
          key: 3,
          value: 'Dental Care',
        },
        {
          key: 4,
          value: 'General Medical Practitioner Wellness',
        },
      ],
    },
    diagnosisTypes: [
      {
        key: 6,
        value: 'Abdominal Pain',
        code: 'ABDOMINAL_PAIN',
      },
      {
        key: 7,
        value: 'Abortion/Miscarriage',
        code: 'ABORTION_MISCARRIAGE',
      },
      {
        key: 25,
        value: 'Others',
        code: 'OTHERS',
      },
    ],
    consultationDate: new Date(Date.UTC(2019, 6, 10)),
    selectedClaimId: 1,
    maxReceiptAmount: 1000,
    insuranceClaim: true,
    anotherInsurerEnabled: false,
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
    fieldChange: jest.fn(),
    fieldUntouch: jest.fn(),
    getWalletBalance: jest.fn(),
    selectedMemberId: '12',
    walletBalance: {
      memberToWalletBalanceMap,
      error: false,
    },
    isWellnessClaim: false,
    isTerminatedPatient: false,
    terminatedDate: undefined,
    consultationCategoryName: {
      outpatient: 'Outpatient',
      wellness: 'Wellness',
    },
  };

  const getInputElement = (renderResult, testId, value) => {
    const element = renderResult.getByTestId(testId).querySelector('input');
    fireEvent.change(element, { target: { value } });

    return element;
  };

  const getDateElement = (renderResult, testId, value) => {
    const dialogButton = renderResult
      .getByTestId(testId)
      .querySelector('button');
    fireEvent.click(dialogButton);

    const dialog = document.querySelector('[role=dialog]');
    const selectDate = getAllByText(dialog, value);
    fireEvent.click(selectDate[0]);

    const okButton = getByText(dialog, 'OK');
    fireEvent.click(okButton);

    return dialog;
  };

  const getSelectElement = (renderResult, testId, label) => {
    const dropdown = renderResult.container.querySelector(`#select-${testId}`);
    fireEvent.click(dropdown);
    const item = renderResult.getByText(label);
    fireEvent.click(item);

    return dropdown;
  };

  const setUp = (componentProps = props) => {
    const Component = withRedux(
      withIntl(
        withTheme(
          reduxForm({
            form: 'form',
            enableReinitialize: true,
            destroyOnUnmount: false,
            keepDirtyOnReinitialize: true,
            initialValues: {
              anotherInsurer: false,
              claim: {},
            },
          })(ClaimDetails),
        ),
      ),
    );
    return render(<Component {...componentProps} />);
  };

  afterEach(() => {
    props.fieldChange.mockReset();
    props.fieldUntouch.mockReset();
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });
  it('should call the addDays function with the correct value ', () => {
    setUp({
      ...props,
      selectedClaimId: 4,
      insuranceClaim: false,
    });

    expect(addDays).toHaveBeenCalledWith(-90);
  });

  it('should match snapshot with wellness consultation type selected ', () => {
    const { container } = setUp({
      ...props,
      selectedClaimId: 4,
      insuranceClaim: false,
    });

    expect(container).toMatchSnapshot();
  });

  it('should show receipt amount helper text if max receipt amount is present', () => {
    const newProps = {
      ...props,
      maxReceiptAmount: 800,
    };

    const { container } = setUp(newProps);

    expect(container.innerHTML).toMatch(/Max receipt amount HK\$800/);
  });

  it('should not show receipt amount helper text if max receipt amount is not present', () => {
    const newProps = {
      ...props,
      maxReceiptAmount: undefined,
    };

    const { container } = setUp(newProps);

    expect(container.innerHTML).not.toMatch(/Max receipt amount HK/);
  });

  it('should validate that consultation type is required', () => {
    const { container, getByText } = setUp();

    const dropdown = container.querySelector(
      '#select-select-consultation-type',
    );
    fireEvent.blur(dropdown);

    expect(getByText(/^Select a consultation type$/)).toBeInTheDocument();
  });

  it('should get wallet balance on wellness consultation type selection and memberToWalletBalanceMap is empty', () => {
    const result = setUp({
      ...props,
      insuranceClaim: false,
      walletBalance: {
        memberToWalletBalanceMap: {},
        error: false,
      },
      isWellnessClaim: true,
    });

    getSelectElement(result, 'select-consultation-type', 'Dental Care');

    expect(props.getWalletBalance).toHaveBeenCalledWith();
  });

  it('should not call get wallet balance when consultation type is not wellness', () => {
    const result = setUp();

    getSelectElement(
      result,
      'select-consultation-type',
      'Another General Medical Practitioner',
    );

    expect(props.getWalletBalance).not.toHaveBeenCalled();
  });

  it('should not call get wallet balance when memberToWalletBalanceMap is empty', () => {
    const result = setUp();

    getSelectElement(
      result,
      'select-consultation-type',
      'General Medical Practitioner Wellness',
    );

    expect(props.getWalletBalance).not.toHaveBeenCalled();
  });

  it('should validate that diagnosis type is required', () => {
    const { container, getByText } = setUp();

    const dropdown = container.querySelector('#select-select-diagnosis');
    fireEvent.blur(dropdown);

    expect(getByText(/^Select a diagnosis$/)).toBeInTheDocument();
  });

  it('should disable diagnosis type dropdown if diagnosis types are not present', () => {
    const newProps = {
      ...props,
      diagnosisTypes: [],
      selectedClaimId: '',
    };
    const result = setUp(newProps);

    const diagnosisDropdown = result.getByTestId('select-diagnosis');

    expect(diagnosisDropdown.className).toMatch(/disabled/);
  });

  it('should validate that receipt amount is required', () => {
    const { getByTestId, container } = setUp();

    const input = getByTestId('input-receipt-amount').querySelector('input');
    fireEvent.blur(input);

    expect(container.innerHTML).toMatch(/Enter a valid amount/);
  });

  it('should validate that receipt amount is not greater than max receipt amount', () => {
    const { getByTestId, container } = setUp();

    const input = getByTestId('input-receipt-amount').querySelector('input');
    fireEvent.change(input, {
      target: {
        value: '1,001',
      },
    });
    fireEvent.blur(input);

    expect(container.innerHTML).toMatch(
      /For amounts above HK\$ 1000 submit a physical claim form/,
    );
  });

  it('should render another insurer checkbox for wellness claim', () => {
    const newProps = {
      ...props,
      insuranceClaim: false,
      selectedClaimId: 'MO-GS',
    };
    const result = setUp(newProps);

    const anotherInsurerField = result.queryByTestId('input-another-insurer');
    // fireEvent.click(anotherInsurerField);

    expect(anotherInsurerField).toBeInTheDocument();
  });

  it('should render another insurer checkbox even there is no claim selected', () => {
    const newProps = {
      ...props,
      insuranceClaim: false,
      selectedClaimId: '',
    };
    const result = setUp(newProps);

    const anotherInsurerField = result.queryByTestId('input-another-insurer');

    expect(anotherInsurerField).toBeInTheDocument();
  });

  it('should render another insurer checkbox for outpatient claim', () => {
    const result = setUp();

    getSelectElement(
      result,
      'select-consultation-type',
      'General Medical Practitioner',
    );
    const anotherInsurerField = result.queryByTestId('input-another-insurer');

    expect(anotherInsurerField).toBeInTheDocument();
  });

  it('should not render other insurer amount field if another insurer checkbox is not checked', () => {
    const result = setUp();

    const anotherInsurerField = result.queryByTestId('other-insurer-amount');

    expect(anotherInsurerField).toBeNull();
  });

  it('should render other insurer amount field if another insurer checkbox is checked', () => {
    const result = setUp();

    const anotherInsurerField = result.queryByTestId('other-insurer-amount');

    expect(anotherInsurerField).toBeNull();
  });

  it('should change consultation date', () => {
    const result = setUp();

    getDateElement(result, 'date-consultation', '10');

    expect(props.fieldChange).toHaveBeenCalledWith(
      'claim.consultationDate',
      expect.anything(),
    );
  });

  it('should change receipt amount', () => {
    const result = setUp();

    getInputElement(result, 'input-receipt-amount', '1234');

    expect(props.fieldChange).toHaveBeenCalledWith(
      'claim.receiptAmount',
      '1234',
    );
  });

  it('should change another insurer amount', () => {
    const newProps = {
      ...props,
      anotherInsurerEnabled: true,
    };
    const result = setUp(newProps);

    getInputElement(result, 'other-insurer-amount', '123');

    expect(props.fieldChange).toHaveBeenCalledWith(
      'claim.otherInsurerAmount',
      '123',
    );
  });

  it('should refresh wallet balance on refresh button click', () => {
    const { getByTestId } = setUp({
      ...props,
      insuranceClaim: false,
      selectedClaimId: 4,
      isWellnessClaim: true,
    });
    const refreshButton = getByTestId('btn-refresh');

    fireEvent.click(refreshButton);

    expect(props.getWalletBalance).toHaveBeenCalledTimes(1);
  });

  it('should hide Diagnosis text when init', () => {
    const { queryByTestId } = setUp({
      ...props,
      insuranceClaim: false,
      selectedClaimId: 4,
    });

    expect(queryByTestId('input-diagnosis-text')).toBeFalsy();
  });

  it('should show Diagnosis text when change reason into ORTHERS', () => {
    const result = setUp({
      ...props,
      insuranceClaim: false,
      selectedClaimId: 4,
    });

    getSelectElement(result, 'select-diagnosis', 'Others');

    const diagnosisTextNode = getInputElement(
      result,
      'input-diagnosis-text',
      'x',
    );

    expect(diagnosisTextNode).toBeTruthy();
  });

  it('should call firebase when  another insurer checkbox checked', () => {
    const newProps = {
      ...props,
      insuranceClaim: true,
      selectedClaimId: 'MO-GS',
    };
    const result = setUp(newProps);

    const anotherInsurerField = result.queryByTestId('input-another-insurer');
    fireEvent.click(anotherInsurerField.querySelector('input'));

    expect(logAction).toHaveBeenCalled();
  });

  it('should not call firebase when change insurer receipt amount to empty', () => {
    const newProps = {
      ...props,
      insuranceClaim: true,
      selectedClaimId: 'MO-GS',
    };
    const result = setUp(newProps);

    const receiptAmountNode = result.queryByTestId('input-receipt-amount');
    fireEvent.change(receiptAmountNode.querySelector('input'), {
      target: {
        value: '',
      },
    });

    expect(logAction).not.toHaveBeenCalled();
  });

  it('should not call firebase when change insurer other amount to empty', () => {
    const newProps = {
      ...props,
      insuranceClaim: true,
      selectedClaimId: 'MO-GS',
      anotherInsurerEnabled: true,
    };
    const result = setUp(newProps);

    const otherAmountNode = result.queryByTestId('other-insurer-amount');
    fireEvent.change(otherAmountNode.querySelector('input'), {
      target: {
        value: '',
      },
    });

    expect(logAction).not.toHaveBeenCalled();
  });

  it('should not call firebase when unchecked another insurer', () => {
    const newProps = {
      ...props,
      insuranceClaim: true,
      selectedClaimId: 'MO-GS',
      anotherInsurerEnabled: true,
    };
    const result = setUp(newProps);

    const inputAnotherNode = result.queryByTestId('input-another-insurer');
    fireEvent.click(inputAnotherNode.querySelector('input'));

    expect(logAction).not.toHaveBeenCalled();
  });

  it('should show max length message when value greater than 20 on diagnosis text', () => {
    const newProps = {
      ...props,
      insuranceClaim: true,
      selectedClaimId: 'MO-GS',
      anotherInsurerEnabled: true,
      selectedDiagnosisKey: 25,
    };
    const result = setUp(newProps);
    const diagnosisTextNode = result.queryByTestId('input-diagnosis-text');
    fireEvent.change(diagnosisTextNode.querySelector('input'), {
      target: {
        value: 'xxxxxxxxxxxxxxxxxxxxxx',
      },
    });

    expect(result.getByText(/Must be less than/i)).toBeInTheDocument();
  });

  it('should clear claim amount when change consultation type', () => {
    const newProps = {
      ...props,
      selectedClaimId: 1,
    };
    const result = setUp(newProps);

    getSelectElement(result, 'select-consultation-type', 'Dental Care');

    expect(props.fieldChange).toHaveBeenCalledWith('claim.receiptAmount', '');
    expect(props.fieldUntouch).toHaveBeenCalled();
  });

  it('should clear another insurrer amount when another insurer checkbox unchecked', () => {
    const newProps = {
      ...props,
      insuranceClaim: true,
      selectedClaimId: 'MO-GS',
      anotherInsurerEnabled: true,
    };
    const result = setUp(newProps);

    const anotherInsurerField = result.getByTestId('input-another-insurer');
    fireEvent.click(anotherInsurerField.querySelector('input'));

    const anotherInsurerAmount = result.getByTestId('other-insurer-amount');
    fireEvent.change(anotherInsurerAmount.querySelector('input'), {
      target: {
        value: '1',
      },
    });

    // toggle other insurrer input to trigger clear another insurrer amount
    fireEvent.click(anotherInsurerField.querySelector('input'));
    fireEvent.click(anotherInsurerField.querySelector('input'));

    expect(props.fieldChange).toHaveBeenCalledWith(
      'claim.otherInsurerAmount',
      '',
    );
    expect(props.fieldUntouch).toHaveBeenCalledWith('claim.otherInsurerAmount');
  });

  it('should toggle maternity info box', () => {
    const { getByTestId, queryByTestId } = setUp();

    expect(queryByTestId('maternity-box')).not.toBeInTheDocument();

    fireEvent.click(
      getByTestId('checkbox-maternity-claim-type').querySelector('input'),
    );

    expect(queryByTestId('maternity-box')).toBeInTheDocument();
  });

  it('should match snapshot when employee terminated', () => {
    const { container } = setUp({
      ...props,
      isTerminatedPatient: true,
      terminatedDate: '2020/02/14',
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when employee terminated and terminatedDate > today', () => {
    const { container } = setUp({
      ...props,
      isTerminatedPatient: true,
      terminatedDate: '2120/02/14',
    });

    expect(container).toMatchSnapshot();
  });
});
