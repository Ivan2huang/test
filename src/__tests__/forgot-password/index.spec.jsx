import React from 'react';
import { render } from '@testing-library/react';

import ForgotPassword from '../../pages/forgot-password';

jest.mock('../../modules/login/forgot-password', () => ({
  ForgotPasswordContainer: () => <div>Forgot Password Container Component</div>,
}));

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Forgot Password Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ForgotPassword />);
    expect(container).toMatchSnapshot();
  });
});
