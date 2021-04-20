/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import ResetPassword from '../../pages/on-boarding';

jest.mock('../../modules/login/reset-password', () => ({
  ResetPasswordContainer: ({ isFirstTimeUser }) => (
    <div>
      Reset Password Container Component for first time user
      {isFirstTimeUser}
    </div>
  ),
}));

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('On Boarding Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ResetPassword />);
    expect(container).toMatchSnapshot();
  });
});
