import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import {
  withStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';

import Typography from './Typography';

const CURRENCY = 'HK$';
const PRECISION = 2;
const MAXLENGTH = 20;

const Styles = theme => ({
  typography: {
    marginRight: theme.spacingX(2),
  },
});

const NumberFormatCustom = ({ inputRef, onChange, ...rest }) => (
  <NumberFormat
    getInputRef={inputRef}
    allowNegative={false}
    decimalScale={PRECISION}
    onValueChange={values => {
      onChange(values.value);
    }}
    thousandSeparator
    {...rest}
  />
);

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

/* eslint-disable react/jsx-no-duplicate-props */
const CurrencyInput = ({
  classes,
  label,
  name,
  value,
  testId,
  helperText,
  onChange,
  error,
  onBlur,
}) => {
  const intl = useIntl();
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [label]);

  let helperIntl = helperText;

  if (helperText.id) {
    helperIntl = intl.formatMessage(
      {
        id: helperText.id,
        defaultMessage: helperText.defaultMessage,
      },
      helperText.values,
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
        onBlur={onBlur}
        inputComponent={NumberFormatCustom}
        startAdornment={
          <Typography className={classes.typography}>{CURRENCY}</Typography>
        }
        inputProps={{
          name,
          maxLength: MAXLENGTH,
          'aria-describedby': `helptext-${name}`,
        }}
      />
      <div aria-live="polite">
        {helperIntl && (
          <FormHelperText id={`helptext-${name}`}>{helperIntl}</FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

CurrencyInput.propTypes = {
  classes: PropTypes.exact({
    typography: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

CurrencyInput.defaultProps = {
  error: false,
};

export default withStyles(Styles)(CurrencyInput);
