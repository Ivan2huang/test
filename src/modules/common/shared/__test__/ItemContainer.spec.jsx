import React from 'react';

import { render } from '@testing-library/react';
import withTheme from '../../../../themes/withThemeProvider';
import ItemContainer from '../ItemContainer';

describe('Item Container Component', () => {
  it('should match snapshot', () => {
    const Component = withTheme(ItemContainer);

    const { container } = render(
      <Component itemLength={3} numberOfColumns={4}>
        <span>test</span>
        <span>test</span>
        <span>test</span>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });
});
