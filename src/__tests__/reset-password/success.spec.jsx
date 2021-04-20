import React from 'react';
import { render } from '@testing-library/react';

import ResetPasswordSuccess from '../../pages/reset-password/success';

jest.mock('../../modules/login/reset-password', () => ({
  ResetPasswordSuccess: () => <div>Reset Password Success Component</div>,
}));

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Reset Password Success Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ResetPasswordSuccess />);
    expect(container).toMatchSnapshot();
  });
});
