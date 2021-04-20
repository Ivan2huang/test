import React from 'react';
import { render } from '@testing-library/react';

import Switch from '../Switch';
import withTheme from '../../themes/withThemeProvider';

describe('Switch UI Component', () => {
  const props = {
    checked: false,
    onChange: jest.fn(),
  };

  it('should match the snapshot', () => {
    const Component = withTheme(Switch);

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
