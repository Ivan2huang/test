import React from 'react';
import { render } from '@testing-library/react';

import RenderDropdown from '../renderDropdown';

describe('render Dropdown utils', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'test label',
      name: 'test-name',
      items: [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
        { id: 3, name: 'test3' },
      ],
      displayProperty: 'name',
      valueProperty: 'id',
      value: 1,
      onChange: jest.fn(),
      testId: 'test-dropdown',
      loading: false,
    };
  });

  it('should match Snapshot with error', () => {
    const { container } = render(
      <RenderDropdown
        {...props}
        errorMessage="Invalid value"
        input={{
          value: '1',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: true,
          touched: true,
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match Snapshot', () => {
    props.onChange = undefined;
    const { container } = render(
      <RenderDropdown
        {...props}
        input={{
          value: '1',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: false,
          touched: false,
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with loading', () => {
    const { container } = render(
      <RenderDropdown
        {...props}
        input={{
          value: '1',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: false,
          touched: false,
        }}
        loading
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
