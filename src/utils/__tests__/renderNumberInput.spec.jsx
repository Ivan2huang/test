/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import RenderNumberInput from '../renderNumberInput';
import withTheme from '../../themes/withThemeProvider';

jest.mock('../../uiComponents/NumberInput', () => props => (
  <div>
    <span>NumberInput Component</span>
    <span>{mockPropsCapture(props)}</span>
  </div>
));

describe('render Number Input Field utils', () => {
  const props = {
    label: 'test-label',
    name: 'test',
    testId: 'test-id',
    helperText: 'optional',
    errorMessage: 'some error',
    endAdornment: 'some unit',
    maxLength: 5,
    input: {
      value: '1234',
      onChange: jest.fn(),
    },
    meta: {
      invalid: false,
      touched: false,
    },
  };

  const setUp = (componentProps = props) => {
    const Component = withTheme(RenderNumberInput);
    return render(<Component {...componentProps} />);
  };

  it('should match snapshot', () => {
    const { container } = setUp();

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error', () => {
    const newProps = {
      ...props,
      meta: {
        invalid: true,
        touched: true,
      },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });
});
