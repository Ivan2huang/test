/* eslint-disable eslint-disable-next-line,react/no-array-index-key,react/prop-types,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import ClaimDetails from '../ClaimList';
import withTheme from '../../../themes/withThemeProvider';
import withIntl from '../../../i18n/withIntlProvider';
import { navigateTo } from '../../../helpers/helpers';

const createMatchMedia = width => {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  });
};

jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>
    {children}
    (Typography)
  </div>
));

jest.mock('../ClaimStatus', () => props => (
  <div {...props}>ClaimStatus Component</div>
));

jest.mock('../MoreInformationRequired', () => props => (
  <div {...props}>MoreInformationRequired Component</div>
));

jest.mock('../ClaimListItems', () => ({ onItemClick, ...rest }) => (
  <div
    {...rest}
    data-testid="claim-list-item"
    onClick={() => onItemClick({ id: '12' })}
  >
    ClaimListItems Component
  </div>
));

jest.mock(
  '../../../uiComponents/Table',
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

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  formatAmount: jest.fn((intl, amount) => amount),
  navigateTo: jest.fn(),
  formatDate: jest.fn(date => date),
}));

jest.mock('../../../helpers/paths', () => ({
  common: {
    claimDetails: '/claims/claim-details',
  },
}));

jest.mock('../../../i18n/getLocale', () => ({
  __esModule: true,
  default: jest.fn(() => 'en-HK'),
}));

describe('ClaimList Component', () => {
  const props = {
    header: 'Dummy Header',
    claims: [
      {
        id: '12',
        status: 'Pending',
        statusCode: 'PENDING',
        consultationDate: '2019-04-24T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '3',
        claimedAmount: 500,
        isCashlessClaim: false,
        originalClaim: {},
      },
      {
        id: '13',
        status: 'Approved',
        statusCode: 'APPROVED',
        consultationDate: '2019-04-25T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '4',
        claimedAmount: 500,
        approvedAmount: 400,
        isCashlessClaim: false,
        originalClaim: {},
      },
      {
        id: '14',
        status: 'Rejected',
        statusCode: 'REJECTED',
        consultationDate: '2019-04-26T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '5',
        claimedAmount: 500,
        isCashlessClaim: false,
        originalClaim: {},
      },
    ],
    members: {
      '3': 'willom',
      '4': 'brown',
    },
  };

  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  it('should match the snapshot', () => {
    props.tableBottomBorderRequire = true;
    const Component = withIntl(withTheme(ClaimDetails));

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should navigate to claim details page when row is clicked', () => {
    props.tableBottomBorderRequire = true;
    const Component = withIntl(withTheme(ClaimDetails));

    const { getByTestId } = render(<Component {...props} />);
    const row = getByTestId('row-0');
    fireEvent.click(row, {});

    expect(navigateTo).toHaveBeenCalledWith(
      '/claims/claim-details',
      { id: '12' },
      '/claims/claim-details/12',
    );
  });

  it('should navigate to claim details page when item is clicked', () => {
    window.matchMedia = createMatchMedia(300);
    const Component = withIntl(withTheme(ClaimDetails));

    const { getByTestId } = render(<Component {...props} />);
    const item = getByTestId('claim-list-item');
    fireEvent.click(item, {});

    expect(navigateTo).toHaveBeenCalledWith(
      '/claims/claim-details',
      { id: '12' },
      '/claims/claim-details/12',
    );
  });
});
