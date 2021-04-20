import React from 'react';
import { render } from '@testing-library/react';

import withIntl from '../../../i18n/withIntlProvider';
import ApprovedRejectedClaims from '../ApprovedRejectedClaims';

jest.mock('../ClaimList', () => props => (
  <div {...props}>ClaimsList component</div>
));

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

describe('ApprovedRejectedClaims Component', () => {
  const props = {
    claims: [
      {
        status: 'Approved',
        consultationDate: '2019-04-24T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '3',
        claimedAmount: 500,
        approvedAmount: 400,
      },
      {
        status: 'Rejected',
        consultationDate: '2019-01-14T05:52:25.173Z',
        consultationTypes: 'Dental',
        patientId: '4',
        claimedAmount: 1000,
        approvedAmount: 0,
      },
    ],
    members: {
      '3': 'willom',
      '4': 'brown',
    },
  };

  it('should match snapshot', () => {
    const Component = withIntl(ApprovedRejectedClaims);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with no claims', () => {
    const Component = withIntl(ApprovedRejectedClaims);
    const { container } = render(
      <Component claims={[]} members={props.members} />,
    );

    expect(container).toMatchSnapshot();
  });
});
