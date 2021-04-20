/* eslint-disable react/prop-types */

import React from 'react';
import { render } from '@testing-library/react';

import withLegalLayout from '../withLegalLayoutProvider';
import withTheme from '../../../themes/withThemeProvider';

jest.mock('../../../helpers/mui', () => ({
  useBreakpoint: jest.fn(() => 'xs'),
}));

jest.mock('../../loader', () => ({
  LoaderContainer: ({ children }) => (
    <div>
      <div>Loader Container</div>
      {children}
    </div>
  ),
}));

describe('LegalLayout Component', () => {
  it('should match snapshot', () => {
    const Component = props => <div {...props}>Layout Content</div>;
    const options = {
      backgroundImage: '/testUrl',
    };
    const LegalLayout = withTheme(withLegalLayout(Component, options));

    const { container } = render(<LegalLayout />);

    expect(container).toMatchSnapshot();
  });
});
