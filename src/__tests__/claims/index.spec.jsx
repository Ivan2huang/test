import React from 'react';
import { render } from '@testing-library/react';

import ClaimsPage from '../../pages/claims';

jest.mock('../../layouts/withLayoutProvider', () => Component => () => (
  <div>
    <header>Layout Header</header>
    <Component />
  </div>
));

jest.mock('../../modules/claims', () => ({
  ClaimsContainer: props => <div {...props}>Dummy Claim Container</div>,
}));

describe('Claims Index Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<ClaimsPage />);

    expect(container).toMatchSnapshot();
  });
});
