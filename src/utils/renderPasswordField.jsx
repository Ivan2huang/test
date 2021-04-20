/* eslint-disable react/jsx-wrap-multilines */
import React, { useRef, useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Images from '../constants/images';
import { formatMessage } from '../helpers/helpers';

const renderPasswordField = ({
  label,
  testId,
  helperText,
  errorMessage,
  onChange,
  input: { name, value, onChange: inputOnchange, ...rest },
  meta: { invalid, touched, error },
}) => {
  const intl = useIntl();
  const [showPassword, setPasswordDisplay] = React.useState(false);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [label]);

  const handleClickShowPassword = () => {
    setPasswordDisplay(!showPassword);
  };

  const isError = touched && invalid;
  let validationError = '';
  if (!errorMessage) {
    validationError =
      isError && (typeof error === 'string' ? error : undefined);
  }
  const helper = isError
    ? (validationError &&
        formatMessage(intl, validationError, validationError)) ||
      errorMessage
    : helperText;

  return (
    <FormControl
      fullWidth
      data-testid={testId}
      error={isError}
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
        type={showPassword ? 'text' : 'password'}
        onChange={onChange || inputOnchange}
        {...rest}
        inputProps={{ 'aria-describedby': `helptext-${name}` }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              data-testid="toggle-password-display-button"
              onClick={handleClickShowPassword}
            >
              {showPassword ? (
                <img
                  data-testid="display-password-img"
                  src={Images.EYE_ACTIVE}
                  alt=""
                />
              ) : (
                <img
                  data-testid="hide-password-img"
                  src={Images.EYE_INACTIVE}
                  alt=""
                />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <div aria-live="polite">
        {helper && (
          <FormHelperText id={`helptext-${name}`}>{helper}</FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

renderPasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({}).isRequired,
  type: PropTypes.string,
};

renderPasswordField.defaultProps = {
  helperText: undefined,
  errorMessage: undefined,
  onChange: undefined,
  type: 'text',
};

export default renderPasswordField;
