/* eslint-disable no-undef,react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RenderCustomCheckboxGroup from '../renderCustomCheckboxGroup';

jest.mock(
  '../../../../uiComponents/Typography',
  () => ({ children, ...rest }) => (
    <div {...rest}>
      {children}
      (Typography)
    </div>
  ),
);

jest.mock('../../../../uiComponents/Grid', () => ({ children }) => (
  <div>
    <span>Grid Component</span>
    <div>{children}</div>
  </div>
));

jest.mock(
  '../../../../uiComponents/GridItem',
  () => ({ columns, children }) => (
    <div data-xs={columns.xs} data-sm={columns.sm} data-md={columns.md}>
      <span>GridItem Component</span>
      <div>{children}</div>
    </div>
  ),
);

describe('RenderCustomCheckboxGroup Util', () => {
  const props = {
    displayProperty: 'label',
    valueProperty: 'value',
    errorMessage: 'Some error',
    items: [
      { value: '1', label: 'test1' },
      { value: '2', label: 'test2' },
      { value: '3', label: 'test3', hasInversion: true },
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
    return render(<RenderCustomCheckboxGroup {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should call onChange callback for non inverse value', () => {
    const newProps = {
      ...props,
      input: {
        value: ['3'],
        onChange: jest.fn(),
      },
    };

    const { container } = setUp(newProps);
    const checkbox = container.querySelectorAll('input[type=checkbox]')[1];
    fireEvent.click(checkbox, {
      target: { value: '2' },
    });

    expect(newProps.input.onChange).toHaveBeenCalledWith(['2']);
  });

  it('should call onChange callback for inverse value', () => {
    const newProps = {
      ...props,
      input: {
        value: ['1', '2'],
        onChange: jest.fn(),
      },
    };

    const { container } = setUp(newProps);
    const checkbox = container.querySelectorAll('input[type=checkbox]')[2];
    fireEvent.click(checkbox, {
      target: { value: '3' },
    });

    expect(newProps.input.onChange).toHaveBeenCalledWith(['3']);
  });
});
