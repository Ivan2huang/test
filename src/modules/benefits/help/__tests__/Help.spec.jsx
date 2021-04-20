/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import Help from '../Help';
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

jest.mock('../CompanyContactDetails', () => ({ companyContactDetails }) => (
  <div>
    CompanyDetails
    <span>{Object.keys(companyContactDetails)}</span>
  </div>
));

jest.mock('../FAQs', () => ({ faqs }) => (
  <div>
    FAQs
    {faqs.map(faq => (
      <span key={faq.name}>{faq.name}</span>
    ))}
  </div>
));

jest.mock('../../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'md'),
}));

describe('Help Component', () => {
  const props = {
    companyContactDetails: {
      email: 'test@dummy.com',
      phone: '+852 3070 5005',
      customerSupportHours:
        '09:00 AM - 05:30 PM Monday to Friday (except Hong Kong Public Holidays)',
    },
    faqs: [
      {
        name: 'Coverage',
      },
      {
        name: 'Claims Status',
      },
    ],
    loaded: true,
    isWalletsDisabled: false,
  };

  it('should match snapshot', () => {
    const Component = withIntl(withTheme(Help));
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
