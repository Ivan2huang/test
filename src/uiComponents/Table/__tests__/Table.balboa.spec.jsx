/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import Table from '../Table.balboa';
import withTheme from '../../../themes/withThemeProvider';

jest.mock(
  '../Table',
  () => ({
    customStyles: {
      borderTop,
      borderLeft,
      borderRight,
      borderBottom,
      headerTextType,
      headerBackground,
    },
  }) => (
    <table
      style={{
        borderTop,
        borderLeft,
        borderRight,
        borderBottom,
        headerBackground,
        headerTextType,
      }}
    />
  ),
);
jest.mock('../../../constants/config', () => jest.fn());

describe('Table component', () => {
  it('should match the snapshot', () => {
    const Component = withTheme(Table);
    const { container } = render(<Component />);

    expect(container).toMatchSnapshot();
  });
});
