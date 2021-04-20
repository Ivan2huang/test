/* eslint-disable eslint-disable-next-line,react/no-array-index-key,react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,no-undef */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import BenefitSummary from '../BenefitSummary';
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
jest.mock('../FootNotes', () => ({ footNotes, footNotesHalf, ...rest }) => (
  <div>
    <div>Dummy Footnotes</div>
    <span data-id="props">
      {footNotesHalf}
      {footNotes.length}
      {Object.entries(rest).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));
jest.mock(
  '../../../../uiComponents/Table',
  () => ({ onRowClick, columnDefs, data }) => (
    <>
      <div>Dummy Table</div>
      <table>
        <tbody>
          {data.map((claim, index) => (
            <tr
              data-testid={`row-${index}`}
              key={`row-${index}`}
              onClick={() => onRowClick(claim)}
            >
              {columnDefs.map((column, colIndex) => (
                <td key={`col-${index}-${colIndex}`}>
                  {column.template(claim)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ),
);

jest.mock('../../../../helpers/firebase', () => ({
  logAction: jest.fn(),
}));

jest.mock('../ServiceList', () => ({ services, ...rest }) => (
  <div data-services={services}>
    Services List Component
    <span>{mockPropsCapture(rest)}</span>
  </div>
));

describe('BenefitsSummary Component', () => {
  const memberToWalletBalanceMap = {};
  memberToWalletBalanceMap['12'] = 2000;
  memberToWalletBalanceMap['27'] = 1000;
  const props = {
    isWalletsDisabled: false,
    benefitedList: [
      {
        displayName:
          'William Brown ( Tier III(Employee) - Employee and dependant)',
        planId: 5,
        memberId: '1',
        checkpointVisits: [
          {
            serviceId: 'GP',
            usedCount: 1,
          },
        ],
        relationship: 'Employee',
      },
      {
        displayName: 'Brown ( Tier I - Employee and dependant)',
        planId: 2,
        memberId: '2',
        checkpointVisits: [],
        relationship: 'Child',
      },
      {
        displayName: 'Foo ( Tier III(Dependant) - Employee and dependant)',
        planId: 3,
        memberId: '3',
        checkpointVisits: [],
        relationship: 'Spouse',
      },
    ],
    plans: {
      5: {
        name: 'III(Employee)',
        products: [
          {
            name: 'Outpatient',
            productType: 'Outpatient',
            services: [
              {
                name: 'General medical practitioner',
                id: 'GP',
                metaText: 'Consultation inclusive of medications',
                details: [
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                ],
              },
            ],
            footnote: 'footnote',
            unlimitedCheckpoint: false,
          },
        ],
      },
      2: {
        name: 'I',
        products: [
          {
            name: 'Outpatient',
            productType: 'Outpatient',
            services: [
              {
                name: 'General medical practitioner',
                id: 'GP',
                metaText: 'Consultation inclusive of medications',
                details: [
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                ],
              },
            ],
            footnote: null,
            unlimitedCheckpoint: true,
          },
        ],
      },
      3: {
        name: 'III(Dependant)',
        products: [
          {
            name: 'Outpatient',
            productType: 'Outpatient',
            services: [
              {
                name: 'General medical practitioner',
                id: 'GPP',
                metaText: 'Consultation inclusive of medications',
                details: [
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                  {
                    coPayment: 30,
                    description: '',
                    panelVisit: 'Up to $375 per visit',
                    nonPanelVisit: 'Up to $375 per visit',
                    checkpointVisits: {
                      active: 30,
                      limit: 30,
                    },
                  },
                ],
              },
            ],
            footnote: 'footnote',
            unlimitedCheckpoint: false,
          },
        ],
      },
    },
    memberToWalletBalanceMap,
  };
  const Component = withIntl(withTheme(BenefitSummary));
  it('should match snapshot', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
  it('should match snapshot with empty plans and benefits list', () => {
    const { container } = render(
      <Component
        isWalletsDisabled={false}
        benefitedList={[]}
        plans={{}}
        walletBalance={props.walletBalance}
        memberToWalletBalanceMap={{}}
      />,
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
    const item = result.getByText('Brown ( Tier I - Employee and dependant)');
    fireEvent.click(item);
    const selectedPlan = result
      .getByTestId('select-benefit-plan')
      .querySelector('input');

    expect(selectedPlan.value).toEqual('2');
  });

  it('should call logAction when click on product link', () => {
    const { getByTestId } = render(<Component {...props} />);
    const link = getByTestId('product-link-Outpatient');
    fireEvent.click(link);

    expect(logAction).toHaveBeenCalledWith({
      category: 'Profile, benefits summary',
      action: 'View Child benefit',
    });
  });
});
