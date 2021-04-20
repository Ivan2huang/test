import React from 'react';
import { render } from '@testing-library/react';

import ResetPassword from '../../pages/reset-password';

jest.mock('../../modules/login/reset-password', () => ({
  ResetPasswordContainer: () => <div>Reset Password Container Component</div>,
}));

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Reset Password Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ResetPassword />);
    expect(container).toMatchSnapshot();
  });
});
