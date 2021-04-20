/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import CompanyContactDetails from '../CompanyContactDetails';
import withIntl from '../../../../i18n/withIntlProvider';
import withTheme from '../../../../themes/withThemeProvider';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, props }) => (
    <div {...props}>
      Typography Component
      {children}
    </div>
  ),
);

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'md'),
}));

describe('Company Contact Us Details Component', () => {
  const props = {
    companyContactDetails: {
      email: 'dummy@test.com',
      phones: [
        {
          location: 'Hongkong',
          number: '+852 3070 5005',
        },
        {
          location: 'Macau',
          number: '+853 0800 284',
        },
      ],
      customerSupportHours: [
        {
          location: 'Hongkong',
          hour:
            '09:00 AM - 05:30 PM \nMonday to Friday (except Hong Kong Public Holidays)',
        },
        {
          location: 'Macau',
          hour:
            '09:00 AM - 05:30 PM \nMonday to Friday (except Ma Cau Banking holidays)',
        },
      ],
      note: 'this is a note',
      technicalEmail: 'technicalEmail@test.com',
    },
  };

  const setUp = () => {
    const Component = withIntl(withTheme(CompanyContactDetails));
    return render(<Component {...props} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when no phone number provided', () => {
    props.companyContactDetails.phone = '';
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when no technical email provided', () => {
    props.companyContactDetails.technicalEmail = '';
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when no note provided', () => {
    props.companyContactDetails.note = '';
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when has no phone but has email', () => {
    props.companyContactDetails.phones = [];
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });
});
