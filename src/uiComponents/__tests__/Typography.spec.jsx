import React from 'react';
import { render } from '@testing-library/react';
import Typography, { getStyles } from '../Typography';

import withTheme from '../../themes/withThemeProvider';
import Theme from '../../themes/theme';

describe('Typography UI Component', () => {
  it('should match snapshot for default props', () => {
    const Component = withTheme(Typography);

    const { container } = render(<Component>Typography</Component>);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for custom props', () => {
    const Component = withTheme(Typography);

    const { container } = render(
      <Component type="style-1" color="error" fontWeight="semiBold">
        Typography
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for custom props for responsiveness', () => {
    const Component = withTheme(Typography);

    const { container } = render(
      <Component
        type={{
          xs: 'style-8',
          sm: 'style-7',
          md: 'style-6',
        }}
        color="error"
        fontWeight="semiBold"
      >
        Typography
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
});

describe('Typography UI Component Functionality', () => {
  it('should provide the style when no screen size is define', () => {
    const props = {
      type: 'style-1',
      color: 'error',
      fontWeight: 'semiBold',
      textDecoration: 'underline',
      theme: Theme,
    };

    const actual = getStyles(props);

    expect(actual).toMatchSnapshot();
  });

  it('should provide the style when screen size is define', () => {
    const props = {
      type: {
        xs: 'style-8',
        sm: 'style-7',
        md: 'style-6',
      },
      color: 'error',
      fontWeight: 'semiBold',
      theme: Theme,
    };

    const actual = getStyles(props);

    expect(actual).toMatchSnapshot();
  });
});
