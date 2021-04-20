import React from 'react';
import { render } from '@testing-library/react';

import ScreenReader from '../ScreenReader';
import withTheme from '../../themes/withThemeProvider';

jest.mock('../Typography', () => props => (
  <div {...props}>Typography Component</div>
));

describe('Screen UI Component', () => {
  it('should match snapshot', () => {
    const Component = withTheme(ScreenReader);
    const { container } = render(
      <Component>
        <div>Text</div>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
});
