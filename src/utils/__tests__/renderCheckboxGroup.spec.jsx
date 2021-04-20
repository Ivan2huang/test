/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RenderCheckboxGroup from '../renderCheckboxGroup';

jest.mock('../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>
    {children}
    (Typography)
  </div>
));

jest.mock('../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock('../../uiComponents/GridItem', () => ({ columns, children }) => (
  <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
    <span>GridItem Component</span>
    <div>{children}</div>
  </div>
));

describe('RenderCheckboxGroup Util', () => {
  const props = {
    displayProperty: 'name',
    valueProperty: 'id',
    errorMessage: 'Some error',
    items: [
      { id: '1', name: 'test1' },
      { id: '2', name: 'test2' },
      { id: '3', name: 'test3' },
    ],
    input: {
      value: ['1'],
      onChange: jest.fn(),
    },
    meta: { invalid: false, touched: false },
  };

  const mockMath = Object.create(global.Math);
  mockMath.random = () => 0.5;
  global.Math = mockMath;

  const setUp = (componentProps = props) => {
    return render(<RenderCheckboxGroup {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error', () => {
    const newProps = {
      ...props,
      meta: {
        touched: true,
        invalid: true,
      },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when value is not set', () => {
    const newProps = {
      ...props,
      input: {
        value: '',
        onChange: jest.fn(),
      },
    };
    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should call onChange callback when value is not set', () => {
    const newProps = {
      ...props,
      input: {
        value: '',
        onChange: jest.fn(),
      },
    };

    const { container } = setUp(newProps);
    const checkbox = container.querySelectorAll('input[type=checkbox]')[1];
    fireEvent.click(checkbox, {
      target: { value: '2' },
    });

    expect(newProps.input.onChange).toHaveBeenCalledWith(['2'], '2');
  });

  it('should call onChange callback on checkbox checked', () => {
    const { container } = setUp();

    const checkbox = container.querySelectorAll('input[type=checkbox]')[1];
    fireEvent.click(checkbox, {
      target: { value: '2' },
    });

    expect(props.input.onChange).toHaveBeenCalledWith(['1', '2'], '2');
  });

  it('should call onChange callback on checkbox unchecked', () => {
    const { container } = setUp();

    const checkbox = container.querySelectorAll('input[type=checkbox]')[0];
    fireEvent.click(checkbox, {
      target: { value: '1' },
    });

    expect(props.input.onChange).toHaveBeenCalledWith([], '1');
  });
});
