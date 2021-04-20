import React from 'react';
import { render } from '@testing-library/react';

import ResetPasswordLinkExpired from '../../pages/reset-password/link-expired';

jest.mock('../../modules/login/reset-password', () => ({
  ResetPasswordLinkExpired: () => (
    <div>Reset Password Link expired Component</div>
  ),
}));

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Reset Password Link expired page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ResetPasswordLinkExpired />);
    expect(container).toMatchSnapshot();
  });
});
