import React from 'react';
import { render } from '@testing-library/react';

import OnBoardingSuccess from '../../pages/on-boarding/success';

jest.mock('../../modules/login/on-boarding', () => ({
  OnBoardingSuccess: () => <div>Reset Password Success Component</div>,
}));

jest.mock('../../layouts/withLoginLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Reset Password Success Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<OnBoardingSuccess />);
    expect(container).toMatchSnapshot();
  });
});
