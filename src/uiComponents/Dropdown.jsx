import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from '@material-ui/core';

import { ChevronDownIcon, CircularProgressIcon } from '../icons';

const Dropdown = ({
  items,
  name,
  label,
  value,
  displayProperty,
  valueProperty,
  testId,
  errorMessage,
  group,
  disabled,
  loading,
  error,
  onChange,
  onBlur,
  onFocus,
}) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, [label]);

  const identifier = `outlined-${testId}`;
  const renderMenuItems = (menuItems, suffix = identifier) =>
    menuItems.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <MenuItem key={`${suffix}-${index}`} value={item[valueProperty]}>
        {item[displayProperty]}
      </MenuItem>
    ));

  const renderItems = dropDownItems => {
    if (group) {
      let menuItems = [];

      Object.keys(dropDownItems).forEach(key => {
        menuItems.push(
          <MenuItem disabled key={key}>
            {key}
          </MenuItem>,
        );
        menuItems = menuItems.concat(
          renderMenuItems(dropDownItems[key], `${identifier}-${key}`),
        );
      });

      return menuItems;
    }

    return renderMenuItems(dropDownItems);
  };

  return (
    <FormControl fullWidth variant="outlined" disabled={disabled} error={error}>
      <InputLabel ref={inputLabel} htmlFor={identifier}>
        {label}
      </InputLabel>
      <Select
        IconComponent={loading ? CircularProgressIcon : ChevronDownIcon}
        fullWidth
        value={value}
        error={error}
        input={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <OutlinedInput
            name={testId}
            id={identifier}
            data-testid={testId}
            labelWidth={labelWidth}
          />
        }
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        inputProps={{
          'aria-describedby': `helptext-${name}`,
        }}
      >
        {renderItems(items)}
      </Select>
      <div aria-live="polite">
        {error && (
          <FormHelperText id={`helptext-${name}`} error>
            {errorMessage}
          </FormHelperText>
        )}
      </div>
    </FormControl>
  );
};

Dropdown.defaultProps = {
  onBlur: undefined,
};

Dropdown.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  displayProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  group: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

Dropdown.defaultProps = {
  errorMessage: undefined,
  group: false,
  disabled: false,
  loading: false,
  error: false,
  name: '',
  onFocus: () => {},
};

export default Dropdown;
