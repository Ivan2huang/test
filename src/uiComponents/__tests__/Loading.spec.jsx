import React from 'react';
import { render } from '@testing-library/react';
import withTheme from '../../themes/withThemeProvider';
import Loading from '../Loading';

describe('Loading Component', () => {
  it('should match snapshot when message is present', () => {
    const Component = withTheme(Loading);
    const { container } = render(<Component message="test message" />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when there is no message', () => {
    const Component = withTheme(Loading);
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
