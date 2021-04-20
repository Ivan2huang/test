import React, { useRef, useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';

import Typography from './Typography';

const PRECISION = 0;

const NumberFormatCustom = ({ inputRef, onChange, ...rest }) => {
  return (
    <NumberFormat
      getInputRef={inputRef}
      allowNegative={false}
      onValueChange={values => {
        onChange(values.value);
      }}
      {...rest}
    />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

/* eslint-disable react/jsx-no-duplicate-props */
const NumberInput = ({
  label,
  name,
  value,
  testId,
  helperText,
  endAdornment,
  maxLength,
  error,
  decimalScale,
  onChange,
  ...rest
}) => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [label]);

  const extraInputProps = {};
  if (endAdornment) {
    extraInputProps.endAdornment = (
      <Box mr={4}>
        <Typography type="style-6">{endAdornment}</Typography>
      </Box>
    );
  }

  return (
    <FormControl
      error={error}
      fullWidth
      data-testid={testId}
      variant="outlined"
    >
      <InputLabel ref={inputLabel} htmlFor={`input-${name}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={`input-${name}`}
        value={value}
        label={label}
        labelWidth={labelWidth}
        onChange={onChange}
        inputComponent={NumberFormatCustom}
        inputProps={{
          maxLength,
          decimalScale,
          'aria-describedby': `helptext-${name}`,
        }}
        {...rest}
        {...extraInputProps}
      />
      <div aria-live="polite">
        {helperText && (
          <FormHelperText id={`helptext-${name}`}>{helperText}</FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  testId: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  endAdornment: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  decimalScale: PropTypes.number,
  error: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

NumberInput.defaultProps = {
  endAdornment: '',
  decimalScale: PRECISION,
  disabled: false,
};

export default NumberInput;
