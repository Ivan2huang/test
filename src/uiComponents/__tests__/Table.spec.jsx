import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Table from '../Table';
import withTheme from '../../themes/withThemeProvider';

describe('Table component', () => {
  const props = {
    columnDefs: [
      {
        name: 'header 1',
        template: row => row.column1,
        alignContent: 'right',
        pivotColumn: true,
      },
      {
        name: 'header 2',
        template: row => <button type="button">{row.column2}</button>,
      },
    ],
    data: [
      {
        column1: 'dummy',
        column2: 'Edit',
      },
      {
        column1: 'dummy1',
        column2: 'Delete',
      },
      {
        column1: 'dummy1',
        column2: 'Delete',
      },
    ],
  };

  it('should match the snapshot', () => {
    const Component = withTheme(Table);

    const { container } = render(<Component {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with grouped elements', () => {
    const Component = withTheme(Table);

    const { container } = render(<Component {...props} groupBy="column1" />);

    expect(container).toMatchSnapshot();
  });

  it('should match the snapshot with hover', () => {
    const Component = withTheme(Table);

    const { container } = render(<Component {...props} hover />);
    const tableRow = container.querySelector('tbody tr');
    fireEvent.click(tableRow, {});

    expect(container).toMatchSnapshot();
  });

  it('should call the passed callback method onClick', () => {
    const expectedRowData = {
      column1: 'dummy',
      column2: 'Edit',
    };
    const Component = withTheme(Table);
    const dummyFunction = jest.fn();

    const { container } = render(
      <Component {...props} onRowClick={dummyFunction} />,
    );
    const tableRow = container.querySelector('tbody tr');
    fireEvent.click(tableRow, {});

    expect(dummyFunction).toHaveBeenCalledTimes(1);
    expect(dummyFunction).toHaveBeenCalledWith(expectedRowData);
  });
  it('should call the passed callback method on enter', () => {
    const expectedRowData = {
      column1: 'dummy',
      column2: 'Edit',
    };
    const Component = withTheme(Table);
    const dummyFunction = jest.fn();

    const { container } = render(
      <Component {...props} onRowClick={dummyFunction} />,
    );
    const tableRow = container.querySelector('tbody tr');
    fireEvent.keyPress(tableRow, { key: 'Enter', code: 13, charCode: 13 });

    expect(dummyFunction).toHaveBeenCalledTimes(1);
    expect(dummyFunction).toHaveBeenCalledWith(expectedRowData);
  });
});
