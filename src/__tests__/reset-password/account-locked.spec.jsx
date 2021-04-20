import React from 'react';
import { render } from '@testing-library/react';

import AccountLocked from '../../pages/reset-password/account-locked';

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../../modules/login/reset-password', () => ({
  AccountLocked: () => <div>Account Locked Component</div>,
}));

describe('Account Locked page', () => {
  it('should match snapshot', () => {
    const { container } = render(<AccountLocked />);
    expect(container).toMatchSnapshot();
  });
});
