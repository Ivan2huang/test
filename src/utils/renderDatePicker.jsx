import React from 'react';
import { PropTypes } from 'prop-types';
import DatePicker from '../uiComponents/DatePicker';

const renderDatePicker = ({
  label,
  testId,
  helperText,
  errorMessage,
  minDate,
  maxDate,
  input: { name, value, onChange: inputOnchange },
  meta: { invalid, touched },
  onChange,
  disabled,
}) => {
  const error = touched && invalid;
  return (
    <DatePicker
      name={name}
      label={label}
      testId={testId}
      value={value}
      helperText={(error && errorMessage) || helperText}
      minDate={minDate}
      maxDate={maxDate}
      error={error}
      onChange={onChange || inputOnchange}
      disabled={disabled}
    />
  );
};

renderDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  errorMessage: PropTypes.string.isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

renderDatePicker.defaultProps = {
  onChange: undefined,
  minDate: undefined,
  maxDate: undefined,
  helperText: undefined,
  disabled: false,
};

export default renderDatePicker;
