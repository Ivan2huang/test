import React from 'react';
import * as PropTypes from 'prop-types';

import Dropdown from '../uiComponents/Dropdown';

const renderDropdown = ({
  label,
  items,
  displayProperty,
  valueProperty,
  testId,
  errorMessage,
  group,
  disabled,
  loading,
  onChange,
  input: { name, value, onChange: inputOnchange, ...rest },
  meta: { invalid, touched, error },
}) => {
  const isError = touched && invalid;
  let helperText = errorMessage;
  if (!helperText) {
    helperText = isError && typeof error === 'string' ? error : undefined;
  }

  return (
    <Dropdown
      name={name}
      label={label}
      items={items}
      displayProperty={displayProperty}
      valueProperty={valueProperty}
      value={value}
      testId={testId}
      errorMessage={helperText}
      group={group}
      disabled={disabled}
      loading={loading}
      onChange={onChange || inputOnchange}
      error={touched && invalid}
      {...rest}
    />
  );
};

renderDropdown.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  label: PropTypes.string,
  displayProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  testId: PropTypes.string,
  errorMessage: PropTypes.string,
  group: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({}).isRequired,
};

renderDropdown.defaultProps = {
  errorMessage: undefined,
  testId: '',
  group: false,
  disabled: false,
  loading: false,
  onChange: undefined,
  label: '',
};

export default renderDropdown;
