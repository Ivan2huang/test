import React from 'react';
import { render } from '@testing-library/react';

import withTheme from '../withThemeProvider';

describe('WithThemeProvider', () => {
  it('should match snapshot', () => {
    const component = props => <div {...props}>Theme</div>;
    const Theme = withTheme(component);
    const { container } = render(<Theme theme="ocean" />);
    expect(container).toMatchSnapshot();
  });

  it('should get initial props', async () => {
    const component = props => <div {...props}>Theme</div>;
    component.getInitialProps = () => Promise.resolve({ test: 'test' });
    const Theme = withTheme(component);
    const actual = await Theme.getInitialProps({
      ctx: {},
    });

    expect(actual).toBeDefined();
    expect(actual.test).toEqual('test');
  });
});
