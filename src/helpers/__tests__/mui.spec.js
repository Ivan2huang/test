import { useMediaQuery } from '@material-ui/core';

import { useBreakpoint } from '../mui';

jest.mock('@material-ui/core', () => ({
  useTheme: () => ({
    breakpoints: {
      keys: ['xs', 'sm', 'md'],
      up: jest.fn(key => key === 'sm'),
    },
  }),
  useMediaQuery: jest.fn(value => value),
}));

describe('Mui Helper', () => {
  it('should get current breakpoint', () => {
    const actual = useBreakpoint();

    expect(actual).toBe('sm');
  });

  it('should get default xs as current breakpoint', () => {
    useMediaQuery.mockReturnValue(false);

    const actual = useBreakpoint();

    expect(actual).toBe('xs');
  });
});
