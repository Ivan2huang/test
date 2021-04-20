import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CurrencyInput from '../CurrencyInput';
import withTheme from '../../themes/withThemeProvider';
import withIntl from '../../i18n/withIntlProvider';

jest.mock('../Typography', () => props => (
  <div>
    <span>Typography</span>
    <span data-id="props">
      {Object.entries(props).map(([key, value]) => `${key} = ${value}`)}
    </span>
  </div>
));

describe('CurrencyInput UI Component', () => {
  const props = {
    label: 'Receipt Amount',
    name: 'receiptAmount',
    value: '100',
    testId: 'input-receipt-amount',
    helperText: 'Max receipt amount HK$ 800',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  let result;

  beforeEach(() => {
    const Component = withTheme(withIntl(CurrencyInput));
    result = render(<Component {...props} />);
  });

  afterEach(() => {
    props.onChange.mockReset();
    props.onBlur.mockReset();
  });

  it('should match snapshot', () => {
    expect(result.container).toMatchSnapshot();
  });

  it('should call on change callback', () => {
    const currencyInput = result
      .getByTestId('input-receipt-amount')
      .querySelector('input');

    fireEvent.change(currencyInput, { target: { value: '45' } });

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should call on blur callback', () => {
    const currencyInput = result
      .getByTestId('input-receipt-amount')
      .querySelector('input');

    fireEvent.blur(currencyInput);

    expect(props.onBlur).toHaveBeenCalled();
  });
});
