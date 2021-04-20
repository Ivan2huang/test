import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import withIntl from '../../../i18n/withIntlProvider';

import ClaimListItems from '../ClaimListItems';

jest.mock('../ClaimStatus', () => props => (
  <div {...props}>ClaimStatus Component</div>
));

jest.mock('../MoreInformationRequired', () => props => (
  <div {...props}>MoreInformationRequired Component</div>
));

// eslint-disable-next-line react/prop-types
jest.mock('../../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
));

jest.mock('../../../helpers/helpers', () => ({
  formatDate: jest.fn(date => date),
}));

describe('ClaimListItems Component', () => {
  const props = {
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
      },
      {
        id: '13',
        status: 'Approved',
        statusCode: 'APPROVED',
        consultationDate: '2019-04-25T05:52:25.173Z',
        consultationTypes: 'Dental Care',
        patientId: '4',
        claimedAmount: 500,
        approvedAmount: 400,
        isCashlessClaim: false,
      },
      {
        id: '14',
        status: 'Rejected',
        statusCode: 'REJECTED',
        consultationDate: '2019-04-26T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '4',
        claimedAmount: 500,
        isCashlessClaim: false,
      },
    ],
    onItemClick: jest.fn(),
    members: {
      '3': 'willom',
      '4': 'brown',
    },
  };
  const setUp = (componentProps = props) => {
    const Component = withIntl(ClaimListItems);
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should call onItemClick callback on item click', () => {
    const { getByTestId } = setUp();

    const item = getByTestId('claim-item-12');
    fireEvent.click(item);

    expect(props.onItemClick).toHaveBeenCalledWith({
      id: '12',
      status: 'Pending',
      statusCode: 'PENDING',
      consultationDate: '2019-04-24T05:52:25.173Z',
      consultationTypes: 'General Medical Practitioner',
      patientId: '3',
      claimedAmount: 500,
      isCashlessClaim: false,
    });
  });
});
