import React from 'react';
import { render } from '@testing-library/react';

import CardDetails from '../CardDetails';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/helpers', () => ({
  formatMessage: jest.fn((intl, id, defaultMessage) => defaultMessage),
}));

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

describe('CardDetails Component', () => {
  const props = {
    fullName: 'William Brown',
    membershipNumber: '123',
    coPayment: {
      GP: 10,
      GPText: 'HK$10',
      SP: 10,
      SPText: 'HK$10',
      PHY: 10,
      PHYText: 'HK$10',
    },
  };
  it('should match the snapshot', () => {
    const Component = withIntl(CardDetails);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when not render coPayment', () => {
    const Component = withIntl(CardDetails);
    const newProps = {
      ...props,
      coPayment: null,
    };
    const { container } = render(<Component {...newProps} />);

    expect(container).toMatchSnapshot();
  });
});
