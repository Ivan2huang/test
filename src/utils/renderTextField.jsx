import React, { useRef, useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';

const renderTextField = ({
  label,
  testId,
  helperText,
  errorMessage,
  onChange,
  type,
  input: { name, value, onChange: inputOnchange, ...rest },
  meta: { invalid, touched, error },
  disabled,
  maxLength,
}) => {
  const intl = useIntl();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [label]);

  const isError = touched && invalid;
  let validationError = '';
  if (!errorMessage && isError) {
    validationError = typeof error === 'string' ? error : '';
    if (error && error.id) {
      validationError = intl.formatMessage(
        {
          id: error.id,
          defaultMessage: error.defaultMessage,
        },
        error.values,
      );
    }
  }

  const helper = isError ? validationError || errorMessage : helperText;

  return (
    <FormControl
      fullWidth
      data-testid={testId}
      error={isError}
      disabled={disabled}
      variant="outlined"
    >
      <InputLabel ref={inputLabel} htmlFor={`input-${name}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={`input-${name}`}
        type={type}
        value={value}
        label={label}
        labelWidth={labelWidth}
        onChange={onChange || inputOnchange}
        inputProps={{ maxLength, 'aria-describedby': `helptext-${name}` }}
        {...rest}
      />
      <div aria-live="polite">
        {helper && (
          <FormHelperText id={`helptext-${name}`}>{helper}</FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

renderTextField.propTypes = {
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  helperText: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({}).isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

renderTextField.defaultProps = {
  helperText: undefined,
  errorMessage: undefined,
  onChange: undefined,
  maxLength: undefined,
  type: 'text',
  disabled: false,
};

export default renderTextField;
