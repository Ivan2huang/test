import React from 'react';
import { render } from '@testing-library/react';

import ButtonGroup, { getStyles } from '../ButtonGroup';
import withTheme from '../../themes/withThemeProvider';

describe('ButtonGroup UI Component', () => {
  it('should match snapshot', () => {
    const Component = withTheme(ButtonGroup);

    const { container } = render(
      <Component>
        <div>button 1</div>
        <div>button 2</div>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });

  describe('GetStyles', () => {
    const props = {
      theme: {
        spacingX: factor => `${4 * factor}px`,
        breakpoints: {
          up: jest.fn(breakpoint => breakpoint),
        },
      },
    };
    it('should match snapshot', () => {
      const actual = getStyles(props);

      expect(actual).toMatchSnapshot();
    });

    it('should match snapshot with inverse', () => {
      const actual = getStyles({ ...props, inverse: true });

      expect(actual).toMatchSnapshot();
    });
  });
});
