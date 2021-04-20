import React from 'react';
import * as PropTypes from 'prop-types';

import { Checkbox, FormControlLabel } from '@material-ui/core';

import Typography from '../uiComponents/Typography';

const renderCheckbox = ({
  label,
  testId,
  onChange,
  input: { value, onChange: inputOnchange, ...rest },
  meta: { invalid, touched },
}) => {
  return (
    <FormControlLabel
      control={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Checkbox
          value={value}
          checked={!!value}
          color="primary"
          data-testid={testId}
          onChange={onChange || inputOnchange}
          error={(touched && invalid).toString()}
          {...rest}
        />
      }
      label={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Typography fontWeight="normal" color="mediumEmphasis">
          {label}
        </Typography>
      }
    />
  );
};

renderCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({}).isRequired,
};

renderCheckbox.defaultProps = {
  onChange: undefined,
};

export default renderCheckbox;
