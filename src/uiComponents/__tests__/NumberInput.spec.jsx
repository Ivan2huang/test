/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NumberInput from '../NumberInput';

jest.mock('../Typography', () => props => (
  <div>
    Typography Component
    <span>{mockPropsCapture(props)}</span>
  </div>
));

describe('NumberInput UI Component', () => {
  const props = {
    label: 'Input Number',
    name: 'inputNumber',
    value: '1234567890',
    testId: 'input-number',
    helperText: 'A number',
    maxLength: 5,
    error: false,
    onChange: jest.fn(),
  };

  const setUp = (componentProps = props) => {
    return render(<NumberInput {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with end adornment', () => {
    const newProps = {
      ...props,
      endAdornment: 'some unit',
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error', () => {
    const newProps = {
      ...props,
      error: true,
      helperText: 'some error',
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should allow only numbers', () => {
    const { getByTestId } = setUp();

    const input = getByTestId('input-number').querySelector('input');
    fireEvent.change(input, {
      target: {
        value: '1abc4%7',
      },
    });

    expect(input.value).toBe('147');
  });

  it('should not allow more than max length numbers', () => {
    const { getByTestId } = setUp();

    const input = getByTestId('input-number').querySelector('input');

    expect(input.maxLength).toBe(5);
  });

  it('should not allow decimal', () => {
    const { getByTestId } = setUp();

    const input = getByTestId('input-number').querySelector('input');
    fireEvent.change(input, {
      target: {
        value: '25.35',
      },
    });

    expect(input.value).toBe('25');
  });
});
