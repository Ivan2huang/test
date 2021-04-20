import React from 'react';
import { render } from '@testing-library/react';

import Privacy from '../../pages/legal/privacy';

jest.mock('../../modules/legal/privacy', () => ({
  Privacy: () => <div>Privacy Component</div>,
}));
jest.mock(
  '../../modules/legal/withLegalLayoutProvider',
  () => Component => () => (
    <div>
      <header>Layout Header</header>
      <Component />
    </div>
  ),
);

describe('Privacy Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<Privacy />);
    expect(container).toMatchSnapshot();
  });
});
