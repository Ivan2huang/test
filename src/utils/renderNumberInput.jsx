import React from 'react';
import * as PropTypes from 'prop-types';

import NumberInput from '../uiComponents/NumberInput';

const renderTextField = ({
  label,
  name,
  testId,
  helperText,
  errorMessage,
  endAdornment,
  maxLength,
  decimalScale,
  onChange,
  input: { value, onChange: inputOnchange, ...rest },
  meta: { invalid, touched, error },
}) => {
  const isError = touched && invalid;
  let validationError = '';
  if (!errorMessage) {
    validationError =
      isError && (typeof error === 'string' ? error : undefined);
  }

  return (
    <NumberInput
      label={label}
      name={name}
      value={value}
      testId={testId}
      maxLength={maxLength}
      decimalScale={decimalScale}
      helperText={
        (isError && validationError) || (isError && errorMessage) || helperText
      }
      endAdornment={endAdornment}
      error={isError}
      onChange={onChange || inputOnchange}
      {...rest}
    />
  );
};

renderTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  testId: PropTypes.string,
  helperText: PropTypes.string,
  errorMessage: PropTypes.string,
  endAdornment: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  decimalScale: PropTypes.number,
  onChange: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({}).isRequired,
};

renderTextField.defaultProps = {
  name: '',
  testId: '',
  helperText: '',
  errorMessage: '',
  endAdornment: '',
  onChange: undefined,
  decimalScale: 0,
};

export default renderTextField;
