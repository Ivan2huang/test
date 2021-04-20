/* eslint-disable eslint-disable-next-line,react/no-array-index-key,react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,no-undef */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import BenefitSummaryForConsumer from '../BenefitSummaryForConsumer';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';
import { logAction } from '../../../../helpers/firebase';

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);
jest.mock('../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

describe('BenefitsSummary Component', () => {
  const props = {
    benefits: [
      {
        memberId: '1',
        groupMedicalBenefits: [
          {
            benefitName: 'Hospital Cash',
            panelLabel: '',
            nonPanelLabel: 'Non panel doctor 100% coverage',
            checkpointLabel: '',
            annualLimitLabel: 'Annual limit',
            remark: '',
            annualLimit: {
              text: '90 days per disability per year²',
              footnoteSuperscript: '2',
              footnote:
                '² Daily cash payment if insured is hospitalised for more than 6 hours, up to a maximum of 90 days per disability per year',
            },
            benefitDetails: [
              {
                benefitType: 'Plan 1',
                coPaymentText: '',
                footnoteSuperscript: '',
                footnote: '',
                checkpoint: '',
                subBenefits: [
                  {
                    text: '',
                    panel: '',
                    nonPanel: 'Max limit HKD 350 per day',
                  },
                ],
              },
            ],
            sublimits: [
              {
                label: '',
                text: '',
                footnoteSuperscript: '',
                footnote: '',
              },
            ],
          },
        ],
        groupLifeBenefits: [
          {
            benefitName: 'Term Life',
            benefitLabel: 'Benefit',
            descriptionLabel: 'Description',
            sumAssuredLabel: 'Sum assured',
            benefitDetails: [
              {
                benefitType: 'Plan 5¹',
                text: '',
                description: 'Monthly Based Salary x 12',
                sumAssured: 'HKD 600,000',
                footnoteSuperscript: '1',
                footnote:
                  '¹ All MBS coverage shall be subject to maximum cap of HKD5,000,000.',
              },
            ],
          },
        ],
      },
      {
        memberId: '2',
        groupMedicalBenefits: [
          {
            benefitName: 'Hospital Cash',
            panelLabel: '',
            nonPanelLabel: 'Non panel doctor 100% coverage',
            checkpointLabel: '',
            annualLimitLabel: 'Annual limit',
            remark: '',
            annualLimit: {
              text: '90 days per disability per year²',
              footnoteSuperscript: '2',
              footnote:
                '² Daily cash payment if insured is hospitalised for more than 6 hours, up to a maximum of 90 days per disability per year',
            },
            benefitDetails: [
              {
                benefitType: 'Plan 1',
                coPaymentText: '',
                footnoteSuperscript: '',
                footnote: '',
                checkpoint: '',
                subBenefits: [
                  {
                    text: '',
                    panel: '',
                    nonPanel: 'Max limit HKD 350 per day',
                  },
                ],
              },
            ],
            sublimits: [
              {
                label: '',
                text: '',
                footnoteSuperscript: '',
                footnote: '',
              },
            ],
          },
        ],
        groupLifeBenefits: [
          {
            benefitName: 'Term Life',
            benefitLabel: 'Benefit',
            descriptionLabel: 'Description',
            sumAssuredLabel: 'Sum assured',
            benefitDetails: [
              {
                benefitType: 'Plan 5¹',
                text: '',
                description: 'Monthly Based Salary x 12',
                sumAssured: 'HKD 600,000',
                footnoteSuperscript: '1',
                footnote:
                  '¹ All MBS coverage shall be subject to maximum cap of HKD5,000,000.',
              },
            ],
          },
        ],
      },
    ],
    members: [
      {
        memberId: '1',
        displayName: 'member1',
      },
      {
        memberId: '2',
        displayName: 'member2',
      },
    ],
    isWalletsDisabled: false,
  };
  const Component = withIntl(withTheme(BenefitSummaryForConsumer));
  it('should match snapshot', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with empty benefits list', () => {
    const { container } = render(
      <Component benefits={[]} members={[]} isWalletsDisabled />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should have the employee plan selected by default', () => {
    const { getByTestId } = render(<Component {...props} />);

    const benefitSelect = getByTestId('select-benefit-plan').querySelector(
      'input',
    );

    expect(benefitSelect.value).toEqual('1');
  });

  it('should render the selected item on select', () => {
    const result = render(<Component {...props} />);
    const dropdown = result.container.querySelector(
      '#select-select-benefit-plan',
    );
    fireEvent.click(dropdown);
    const item = result.getByText('member2');
    fireEvent.click(item);
    const selectedPlan = result
      .getByTestId('select-benefit-plan')
      .querySelector('input');

    expect(selectedPlan.value).toEqual('2');
  });

  it('should call logAction when click on product link', () => {
    const { getByTestId } = render(<Component {...props} />);
    const link = getByTestId('product-link-HospitalCash');
    fireEvent.click(link);

    expect(logAction).toHaveBeenCalledWith({
      action: 'Hospital Cash for undefined',
      category: 'Profile, benefits summary',
    });
  });
});
