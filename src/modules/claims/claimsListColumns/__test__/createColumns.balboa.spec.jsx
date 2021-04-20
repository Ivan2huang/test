/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import Table from '../../../../uiComponents/Table';
import createColumns from '../createColumns.balboa';

jest.mock('../../claim-details/helper', () => ({
  formatClaimDate: () => '01 Jan 2020',
}));
jest.mock(
  '../../../../uiComponents/Table',
  () => ({ onRowClick, columnDefs, data }) => {
    return (
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
    );
  },
);
jest.mock('../../ClaimStatus', () => () => <div>status</div>);
jest.mock('../../MoreInformationRequired', () => () => (
  <div>information required</div>
));

const intl = {
  formatMessage: jest.fn(({ id, defaultMessage }) => defaultMessage || id),
};
const data = [
  {
    statusCode: 'Approved',
    consultationDate: '01 Jun 2020',
    consultationTypes: 'Clinical',
    patientId: '001',
  },
  {
    statusCode: 'Approved',
    consultationDate: '01 Jun 2020',
    consultationTypes: 'Clinical',
    patientId: '002',
  },
];

const mockMembers = {
  '001': 'Test Member 1',
  '002': 'Test Member 2',
};
const claimsListTableColumns = createColumns(intl, mockMembers);

describe('Balboa Claims List Column Def', () => {
  it('should provide the template text for service column ', () => {
    const { container } = render(
      <Table columnDefs={claimsListTableColumns} data={data} />,
    );
    expect(container).toMatchSnapshot();
  });
});
