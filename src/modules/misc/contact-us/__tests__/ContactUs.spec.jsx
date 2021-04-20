import React from 'react';

import { render } from '@testing-library/react';
import 'jest-dom/extend-expect';

import ContactUs from '../ContactUs';
import withTheme from '../../../../themes/withThemeProvider';
import withIntl from '../../../../i18n/withIntlProvider';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

jest.mock(
  '../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ props }) => <div {...props}>Typography Component</div>,
);

describe('ContactUs Component', () => {
  const props = {
    getContactInfo: jest.fn(),
    contactInfo: {},
  };
  const Component = withTheme(withIntl(ContactUs));

  it('should match the snapshot when there is no contact info', () => {
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot when there is contact info', () => {
    props.contactInfo = {
      email: 'mail@test.com',
      phone: '1232334422',
      customerSupportHour: 'customerSupportHour',
    };

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
