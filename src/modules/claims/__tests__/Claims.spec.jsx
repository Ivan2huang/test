import React from 'react';
import { render } from '@testing-library/react';

import withRedux from '../../../redux/withReduxProvider';
import withIntl from '../../../i18n/withIntlProvider';
import withTheme from '../../../themes/withThemeProvider';
import Claims from '../Claims';
import NoClaims from '../NoClaims';
import ClaimsHeader from '../ClaimsHeader';

jest.mock('../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
  isEmpty: obj =>
    Object.entries(obj).length === 0 && obj.constructor === Object,
  formatMessage: jest.fn(),
  sentenceCase: jest.fn(),
}));

jest.mock('../NoClaims', () => props => (
  <div>
    <span>No Claims</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

jest.mock('../ClaimsHeader', () => props => (
  <div {...props}>Claims Header Component</div>
));

jest.mock('../PendingClaims', () => props => (
  <div {...props}>Pending Claims component</div>
));

jest.mock('../ApprovedRejectedClaims', () => props => (
  <div {...props}>Approved and Rejected Claims component</div>
));

jest.mock('../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
  isEmpty: jest.fn(
    obj => Object.entries(obj).length === 0 && obj.constructor === Object,
  ),
  sentenceCase: jest.fn().mockReturnValue('key'),
}));

describe('Claims Component', () => {
  let Component;
  const props = {
    pendingClaims: [],
    approvedRejectedClaims: [],
    getClaims: jest.fn(),
    filterClaims: jest.fn(),
    getMemberProfile: jest.fn(),
    membersMap: {
      '3': 'test name',
    },
    components: {
      NoClaims,
      ClaimsHeader,
    },
    setFilteredClaims: jest.fn(),
    appliedFilters: {},
  };

  beforeEach(() => {
    Component = withRedux(withIntl(withTheme(Claims)));
  });

  afterEach(() => {
    props.pendingClaims = [];
    props.approvedRejectedClaims = [];
    props.appliedFilters = {};
  });

  it('should match the snapshot on empty claims', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot on empty claims when filtered', () => {
    props.appliedFilters = { statuses: { APPROVED: true } };
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with pending, approved, rejected claims and memberMaps', () => {
    props.pendingClaims = [
      {
        status: 'Pending Verification',
        consultationDate: '2019-04-24T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '3',
        claimedAmount: 500,
        approvedAmount: 400,
      },
    ];
    props.approvedRejectedClaims = [
      {
        status: 'Approved',
        consultationDate: '2019-04-24T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '3',
        claimedAmount: 500,
        approvedAmount: 400,
      },
    ];

    props.membersMap = { '1': 'Test' };

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when pending claims in not present', () => {
    props.pendingClaims = null;
    props.approvedRejectedClaims = [
      {
        status: 'Approved',
        consultationDate: '2019-04-24T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '3',
        claimedAmount: 500,
        approvedAmount: 400,
      },
    ];

    props.pendingClaims = [];

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when approved and rejected claims in not present', () => {
    props.pendingClaims = [
      {
        status: 'Pending Verification',
        consultationDate: '2019-04-24T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '3',
        claimedAmount: 500,
        approvedAmount: 400,
      },
    ];
    props.approvedRejectedClaims = null;

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when member Map in not present', () => {
    props.pendingClaims = [
      {
        status: 'Pending Verification',
        consultationDate: '2019-04-24T05:52:25.173Z',
        consultationTypes: 'General Medical Practitioner',
        patientId: '3',
        claimedAmount: 500,
        approvedAmount: 400,
      },
    ];
    props.approvedRejectedClaims = null;

    props.membersMap = null;

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
