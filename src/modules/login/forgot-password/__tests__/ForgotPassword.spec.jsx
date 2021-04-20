import React from 'react';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

import withIntl from '../../../../i18n/withIntlProvider';
import ForgotPassword from '../ForgotPassword';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../ForgotPasswordHeader', () => props => (
  <div {...props}>Header Component</div>
));

jest.mock('../ForgotPasswordForm', () => props => (
  <div>
    <span>Forgot Password Form Component</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('Forgot Password Component', () => {
  const props = {
    forgotPassword: jest.fn(),
  };

  it('should match snapshot', () => {
    useRouter.mockImplementation(() => ({
      query: '',
    }));
    const Component = withIntl(ForgotPassword);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    useRouter.mockImplementation(() => ({
      query: {
        lang: 'zh-HK',
      },
    }));
    const Component = withIntl(ForgotPassword);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
