import React from 'react';
import { render } from '@testing-library/react';

import withIntl from '../../i18n/withIntlProvider';
import RenderTextField from '../renderTextField';

describe('render Text Field utils', () => {
  it('should match snapshot', () => {
    const Component = withIntl(RenderTextField);
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
    const Component = withIntl(RenderTextField);
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
    const Component = withIntl(RenderTextField);
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
    const Component = withIntl(RenderTextField);
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

  it('should match snapshot when error is a locale object', () => {
    const Component = withIntl(RenderTextField);
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
          error: {
            id: 'error.message.id',
            defaultMessage: 'Error message default',
          },
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
