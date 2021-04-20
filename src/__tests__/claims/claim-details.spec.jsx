import React from 'react';
import { render } from '@testing-library/react';
import ClaimDetailsContainer from '../../pages/claims/claim-details';

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../../authentication/withAuthProvider', () => Component => () => (
  <div>
    <header>WithAuth HOC</header>
    <Component />
  </div>
));

jest.mock('../../modules/claims/claim-details', () => ({
  ClaimDetailsContainer: () => <div>Claim Details Container</div>,
}));

describe('ClaimDetails component', () => {
  it('should match the snapshot', () => {
    const { container } = render(<ClaimDetailsContainer />);

    expect(container).toMatchSnapshot();
  });
});
