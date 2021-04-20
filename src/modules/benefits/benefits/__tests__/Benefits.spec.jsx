/* eslint-disable eslint-disable-next-line,react/no-array-index-key,react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { render } from '@testing-library/react';

import Benefits from '../Benefits';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';
import { buildBenefitsSummaryList } from '../helper';

jest.mock('../BenefitSummary', () => props => (
  <div>
    <span>Benefit Summary Component</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../PolicyDetails', () => props => (
  <div>
    <span>Policy Details Component</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../helper', () => ({
  buildBenefitsSummaryList: jest.fn(),
}));

describe('Benefits Component', () => {
  it('should match snapshot', () => {
    const benefittedList = [
      {
        displayName:
          'William Brown ( Tier III(Employee) - Employee and dependant)',
        planId: 5,
      },
      {
        displayName: 'Brown ( Tier I - Employee and dependant)',
        planId: 2,
      },
      {
        displayName: 'Foo ( Tier III(Dependant) - Employee and dependant)',
        planId: 3,
      },
    ];

    const memberToWalletBalanceMap = {};
    memberToWalletBalanceMap['12'] = 2000;
    memberToWalletBalanceMap['27'] = 1000;
    const props = {
      memberProfile: {
        fullName: 'test',
        memberId: '3',
        planId: 5,
        relationship: 'Employee',
        relationships: [
          {
            fullName: 'test1',
            memberId: '4',
            planId: 2,
            relationship: 'Child',
            status: 'None',
          },
          {
            fullName: 'test2',
            memberId: '5',
            planId: 3,
            relationship: 'Spouse',
            status: 'None',
          },
        ],
        policy: {
          policyNumber: 'testNumber',
          expiryDate: 'data',
          initialDate: 'date',
          insurer: {
            code: 123,
            myBenefitsName: 'test benefits name',
          },
          plans: {},
        },
      },
      memberToWalletBalanceMap,
      loaded: true,
      isWalletsDisabled: false,
    };
    buildBenefitsSummaryList.mockReturnValue(benefittedList);
    const Component = withTheme(withIntl(Benefits));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
