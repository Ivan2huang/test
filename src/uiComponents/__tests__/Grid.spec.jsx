import React from 'react';
import { render } from '@testing-library/react';

import Grid from '../Grid';

jest.mock('../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'sm'),
}));

describe('Grid UI Component', () => {
  it('should match snapshot', () => {
    const { container } = render(<Grid>Grid Items</Grid>);

    expect(container).toMatchSnapshot();
  });
});
