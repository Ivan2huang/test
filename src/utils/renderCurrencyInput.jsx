import React from 'react';
import * as PropTypes from 'prop-types';

import CurrencyInput from '../uiComponents/CurrencyInput';

const renderCurrencyInput = ({
  label,
  name,
  testId,
  helperText,
  onChange,
  input: { value, onChange: inputOnchange, ...rest },
  meta: { invalid, touched, error },
}) => {
  const isError = touched && invalid;
  let errorMessage = '';
  if (isError && error) {
    errorMessage = typeof error === 'string' || error.id ? error : undefined;
  }
  return (
    <CurrencyInput
      name={name}
      label={label}
      value={value}
      testId={testId}
      helperText={errorMessage || helperText}
      onChange={onChange || inputOnchange}
      error={isError}
      {...rest}
    />
  );
};

renderCurrencyInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  testId: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
};

renderCurrencyInput.defaultProps = {
  name: '',
  helperText: '',
  onChange: undefined,
};

export default renderCurrencyInput;
