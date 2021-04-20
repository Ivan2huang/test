import React from 'react';
import { render } from '@testing-library/react';

import ForgotPasswordSuccess from '../../pages/forgot-password/success';

jest.mock('../../modules/login/forgot-password', () => ({
  ForgotPasswordSuccessContainer: () => (
    <div>Forgot Password Success Component</div>
  ),
}));

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Forgot Password Success Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ForgotPasswordSuccess />);
    expect(container).toMatchSnapshot();
  });
});
