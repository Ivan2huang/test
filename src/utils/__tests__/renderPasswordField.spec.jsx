import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import RenderPasswordField from '../renderPasswordField';
import withIntl from '../../i18n/withIntlProvider';

describe('render Text Field utils', () => {
  const Component = withIntl(RenderPasswordField);

  it('should match snapshot', () => {
    const { container } = render(
      <Component
        label="test-label"
        name="test"
        value="test"
        testId="testID"
        helperText="helperText"
        input={{
          value: 'test',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: false,
          touched: false,
          error: false,
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error without error message', () => {
    const { container } = render(
      <Component
        label="test-label"
        name="test"
        value="test"
        testId="testID"
        helperText="helperText"
        input={{
          value: 'test',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: true,
          touched: true,
          error: true,
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error with error message', () => {
    const { container } = render(
      <Component
        label="test-label"
        name="test"
        value="test"
        testId="testID"
        helperText="helperText"
        errorMessage="error"
        input={{
          value: 'test',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: true,
          touched: true,
          error: true,
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error is a string', () => {
    const { container } = render(
      <Component
        label="test-label"
        name="test"
        value="test"
        testId="testID"
        helperText="helperText"
        input={{
          value: 'test',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: true,
          touched: true,
          error: 'Invalid value',
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when password should be displayed as text', () => {
    const { container, getByTestId } = render(
      <Component
        label="test-label"
        name="test"
        value="test"
        testId="testID"
        helperText="helperText"
        input={{
          value: 'test',
          onChange: jest.fn(),
        }}
        meta={{
          invalid: false,
          touched: false,
          error: '',
        }}
      />,
    );

    const passwordDisplayToggleButton = getByTestId(
      'toggle-password-display-button',
    );

    fireEvent.click(passwordDisplayToggleButton);

    expect(container).toMatchSnapshot();
  });
});
