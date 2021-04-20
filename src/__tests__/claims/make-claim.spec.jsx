import React from 'react';
import { render } from '@testing-library/react';
import MakeClaimPage from '../../pages/claims/make-claim';

jest.mock('../../modules/claims/make-claim', () => ({
  MakeClaimContainer: () => <div>Make claim</div>,
}));

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

describe('Make claim Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<MakeClaimPage />);

    expect(container).toMatchSnapshot();
  });
});
