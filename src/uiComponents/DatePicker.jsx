import React, { useEffect, useRef, useState } from 'react';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import zhLocale from 'date-fns/locale/zh-CN';
import enLocale from 'date-fns/locale/en-US';
import thLocale from 'date-fns/locale/th';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';

import { CalendarIcon } from '../icons';
import CONFIG from '../constants/config';
import { formatMessage } from '../helpers/helpers';

const localeMap = {
  'en-HK': enLocale,
  'zh-HK': zhLocale,
  'th-TH': thLocale,
};

const localeFormatterMap = {
  'en-HK': CONFIG.dateFormat,
  'zh-HK': CONFIG.dateCustomChineseFormat,
  'th-TH': CONFIG.dateCustomThaiFormat,
};

const DateTextField = ({
  label,
  name,
  value,
  error,
  testId,
  variant,
  disabled,
  fullWidth,
  helperText,
  InputProps,
  onChange,
}) => {
  const { endAdornment } = InputProps;
  const inputLabel = useRef(null);
  const inputWrapper = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    const input = inputWrapper.current.querySelector('input');
    const button = inputWrapper.current.querySelector('button');
    input.setAttribute('disabled', 'disabled');
    button.setAttribute('aria-describedby', `helptext-${name}`);
  }, []);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [label]);

  return (
    <FormControl
      fullWidth={fullWidth}
      data-testid={testId}
      error={error}
      disabled={disabled}
      variant={variant}
    >
      <InputLabel ref={inputLabel} htmlFor={`input-${name}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={`input-${name}`}
        ref={inputWrapper}
        value={value}
        label={label}
        name={name}
        labelWidth={labelWidth}
        onChange={onChange}
        aria-describedby={`helptext-${name}`}
        inputProps={{ 'aria-describedby': `helptext-${name}` }}
        endAdornment={endAdornment}
      />
      <div aria-live="polite">
        {helperText && (
          <FormHelperText id={`helptext-${name}`}>{helperText}</FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

DateTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  testId: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  InputProps: PropTypes.shape({}).isRequired,
  error: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
DateTextField.defaultProps = {
  helperText: null,
};

const DatePicker = ({
  intl,
  label,
  name,
  value,
  minDate,
  maxDate,
  testId,
  helperText,
  error,
  onChange,
  disabled,
}) => {
  const renderInput = props => {
    return <DateTextField {...props} />;
  };

  return (
    <span>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={localeMap[intl.locale] || enLocale}
      >
        <KeyboardDatePicker
          fullWidth
          format={localeFormatterMap[intl.locale] || CONFIG.dateFormat}
          inputVariant="outlined"
          error={error}
          minDate={minDate}
          maxDate={maxDate}
          keyboardIcon={<CalendarIcon />}
          testId={testId}
          label={label}
          name={name}
          value={value || null}
          helperText={helperText}
          onChange={onChange}
          disabled={disabled}
          TextFieldComponent={renderInput}
          okLabel={formatMessage(intl, 'datepicker.btn.Ok', 'OK')}
          cancelLabel={formatMessage(intl, 'datepicker.btn.Cancel', 'Cancel')}
        />
      </MuiPickersUtilsProvider>
    </span>
  );
};

DatePicker.propTypes = {
  intl: PropTypes.shape({}),
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  testId: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  intl: {},
  value: null,
  name: 'date-picker',
  minDate: null,
  maxDate: null,
  helperText: undefined,
  error: false,
  disabled: false,
};

export default injectIntl(DatePicker);
