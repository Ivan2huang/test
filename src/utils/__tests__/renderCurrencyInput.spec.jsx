import React from 'react';
import { render } from '@testing-library/react';

import RenderCurrencyInput from '../renderCurrencyInput';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';

describe('render Currency Input Field utils', () => {
  const props = {
    label: 'test-label',
    name: 'test',
    testId: 'testID',
    helperText: 'helperText',
    input: {
      value: '1234',
      onChange: jest.fn(),
      onBlur: jest.fn(),
    },
    meta: {
      invalid: false,
      touched: false,
    },
  };

  const setUp = (componentProps = props) => {
    const Component = withTheme(withIntl(RenderCurrencyInput));
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
        error: 'invalid value',
      },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot when error is boolean', () => {
    const newProps = {
      ...props,
      meta: {
        invalid: true,
        touched: true,
        error: true,
      },
    };

    const { container } = setUp(newProps);

    expect(container).toMatchSnapshot();
  });
});
