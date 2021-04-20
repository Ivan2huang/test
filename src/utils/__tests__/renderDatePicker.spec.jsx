import React from 'react';
import { render } from '@testing-library/react';

import RenderDatePicker from '../renderDatePicker';

jest.mock('../../uiComponents/DatePicker', () => props => (
  <div>
    <span>Date Picker</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('render Dropdown utils', () => {
  let props;

  beforeEach(() => {
    props = {
      label: 'test label',
      name: 'test-name',
      onChange: jest.fn(),
      testId: 'test-datepicker',
      helperText: 'DatePicker',
      errorMessage: 'Enter a valid date',
      input: {
        value: undefined,
        onChange: jest.fn(),
      },
      meta: {
        touched: true,
        invalid: false,
      },
    };
  });

  it('should match snapshot', () => {
    const { container } = render(<RenderDatePicker {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for error', () => {
    const newProps = {
      ...props,
      meta: {
        touched: true,
        invalid: true,
      },
    };

    const { container } = render(<RenderDatePicker {...newProps} />);
    expect(container).toMatchSnapshot();
  });
});
