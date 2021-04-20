import React from 'react';
import { render } from '@testing-library/react';

import Liveness from '../pages/liveness';

describe('Liveness Page', () => {
  it('should match snapshot', () => {
    const { container } = render(<Liveness />);
    expect(container).toMatchSnapshot();
  });
});
