/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

import RenderCheckbox from '../renderCheckbox';

jest.mock('../../uiComponents/Typography', () => ({ children, ...rest }) => (
  <div {...rest}>
    {children}
    (Typography)
  </div>
));

describe('render Checkbox utils', () => {
  it('should match Snapshot', () => {
    const { container } = render(
      <RenderCheckbox
        label="test-label"
        name="test"
        value
        checked={false}
        testId="testID"
        helperText="helperText"
        input={{
          value: true,
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

  it('should match Snapshot when error', () => {
    const { container } = render(
      <RenderCheckbox
        label="test-label"
        name="test"
        value
        testId="testID"
        checked={false}
        helperText="helperText"
        input={{
          value: true,
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
});
