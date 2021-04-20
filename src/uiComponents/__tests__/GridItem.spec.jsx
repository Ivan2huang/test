import React from 'react';
import { render } from '@testing-library/react';

import GridItem from '../GridItem';
import { useBreakpoint } from '../../helpers/mui';

jest.mock('../../helpers/mui', () => ({
  useBreakpoint: jest.fn(),
}));

describe('GridItem UI Component', () => {
  const props = {
    offset: {
      sm: 1,
      md: 2,
    },
    columns: {
      sm: 6,
      md: 4,
    },
  };

  it('should match snapshot for xs breakpoint', () => {
    useBreakpoint.mockReturnValue('xs');
    const { container } = render(<GridItem {...props}>Grid Item (xs)</GridItem>);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for sm breakpoint', () => {
    useBreakpoint.mockReturnValue('sm');
    const { container } = render(<GridItem {...props}>Grid Item (sm)</GridItem>);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for md breakpoint', () => {
    useBreakpoint.mockReturnValue('md');
    const { container } = render(<GridItem {...props}>Grid Item (md)</GridItem>);

    expect(container).toMatchSnapshot();
  });
});
