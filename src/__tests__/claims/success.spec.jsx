/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import SuccessPage from '../../pages/claims/success';

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../../modules/claims/make-claim', () => ({
  MakeClaimSuccess: ({ children }) => (
    <div>
      <header>Success Component</header>
      {children}
    </div>
  ),
}));

describe('Make claim Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<SuccessPage />);

    expect(container).toMatchSnapshot();
  });
});
