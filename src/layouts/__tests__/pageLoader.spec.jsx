import React from 'react';
import { render } from '@testing-library/react';

import PageLoader from '../pageLoader';
import withTheme from '../../themes/withThemeProvider';

describe('Page Loader Component', () => {
  it('should match snapshot with loader', () => {
    const props = {
      loading: true,
    };

    const Component = withTheme(PageLoader);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
  it('should match snapshot without loader', () => {
    const props = {
      loading: false,
    };

    const Component = withTheme(PageLoader);
    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });
});
