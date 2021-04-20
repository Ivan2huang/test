/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import ReviewClaim from '../ReviewClaim';
import { navigateTo } from '../../../../helpers/helpers';

jest.mock('../../../../helpers/helpers', () => ({
  formatAmount: jest.fn((intl, amount) => amount),
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatDate: jest.fn(date => date.toString()),
  openFile: jest.fn(),
  navigateTo: jest.fn(),
}));

jest.mock('../../../../uiComponents/Typography', () => props => (
  <div {...props}>Typography Component</div>
));

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock(
  '../../../../uiComponents/FileItems',
  // eslint-disable-next-line react/prop-types
  () => ({ onClick, responsiveMode, ...rest }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={() =>
        onClick({ file: { name: 'dummy_file', src: 'dummy_src' } })
      }
      data-testid="file-items"
      {...rest}
    >
      Dummy FileComponent
    </div>
  ),
);

describe('Review Claim Component', () => {
  const props = {
    submitClaim: jest.fn(),
    patient: {
      patientName: 'dummy name',
      contactNumber: '0123',
    },
    claimData: {
      claim: {
        anotherInsurer: false,
        consultationDate: new Date(Date.UTC(2019, 6, 10)),
        claimId: 1,
        diagnosis: 2,
        receiptAmount: 100,
        isMaternity: false,
        otherInsurerAmount: null,
      },
      consultationType: 'dummy consultation',
      selectedClaimReason: 'dummy reason',
      referralRequired: false,
      isChineseHerbalist: false,
      receipts: { files: [] },
      referral: { files: [] },
      settlementAdvices: { files: [] },
      prescriptions: { files: [] },
    },
    termAndCondition: { 'en-HK': 'eng' },
    updatePreviewModal: jest.fn(),
    previewModal: false,
    tncModal: false,
    updateTNCAction: jest.fn(),
    updateTNCModal: jest.fn(),
  };

  beforeEach(() => {
    URL.createObjectURL = jest.fn(({ name }) => name);
  });

  it('should match the snapshot', () => {
    const Component = withIntl(withTheme(ReviewClaim));
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with files', () => {
    const Component = withIntl(withTheme(ReviewClaim));
    const newProps = {
      ...props,
      claimData: {
        ...props.claimData,
        claim: {
          ...props.claimData.claim,
          anotherInsurer: true,
        },
        referralRequired: true,
        isChineseHerbalist: true,
        receipts: { files: [{ name: 'dummy_file.jpg' }] },
        referral: { files: [{ name: 'dummy_file.jpg' }] },
        settlementAdvices: { files: [{ name: 'dummy_file.jpg' }] },
        prescriptions: { files: [{ name: 'dummy_file.jpg' }] },
      },
    };
    const { container } = render(<Component {...newProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should open file item', () => {
    const Component = withIntl(withTheme(ReviewClaim));
    const newProps = {
      ...props,
      claimData: {
        ...props.claimData,
        receipts: { files: [{ name: 'dummy_file.jpg', file: {} }] },
      },
      updatePreviewModal: jest.fn(),
    };
    const { container } = render(<Component {...newProps} />);

    const fileItems = container.querySelector('[data-testid=file-items]');
    fireEvent.click(fileItems);
    expect(container).toMatchSnapshot();
  });

  it('should submit claim', () => {
    const Component = withIntl(withTheme(ReviewClaim));
    const newProps = {
      ...props,
      claimData: {
        ...props.claimData,
        receipts: { files: [{ name: 'dummy_file.jpg' }] },
      },
    };
    const { container } = render(<Component {...newProps} />);

    const submitButton = container.querySelector(
      '[data-testid=btn-submit-claim]',
    );
    fireEvent.click(submitButton);

    expect(newProps.submitClaim).toHaveBeenCalled();
  });

  it('should navigate to home if there are no data', () => {
    const Component = withIntl(withTheme(ReviewClaim));
    const emptyProps = {
      ...props,
      patient: null,
      claimData: null,
    };
    render(<Component {...emptyProps} />);
    expect(navigateTo).toHaveBeenCalled();
  });
});
