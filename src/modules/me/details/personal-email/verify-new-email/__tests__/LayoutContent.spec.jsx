/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import LayoutContent from '../LayoutContent';
import withTheme from '../../../../../../themes/withThemeProvider';

jest.mock(
  '../../../../../../uiComponents/GridItem',
  // eslint-disable-next-line react/prop-types
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

jest.mock(
  '../../../../../../uiComponents/Typography',
  // eslint-disable-next-line react/prop-types
  () => ({ children, ...rest }) => (
    <div>
      Typography component
      <span>{mockPropsCapture(rest)}</span>
      <span>{children}</span>
    </div>
  ),
);

describe('LayoutContent Component', () => {
  it('should match snapshot', () => {
    const props = {
      title: 'Title',
      description: 'Description',
      backgroundImage: 'test/BackgroundImage.svg',
    };
    const Component = withTheme(LayoutContent);
    const { container } = render(<Component {...props} />);
    expect(container).toMatchSnapshot();
  });
});
