/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';

import { Box, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

import Typography from '../uiComponents/Typography';

const renderRadioGroup = ({
  input,
  items,
  displayProperty,
  valueProperty,
  errorMessage,
  meta: { invalid, touched },
}) => {
  const [randomGroupId, setRandomId] = useState(null);
  const error = invalid && touched;

  useEffect(() => {
    setRandomId(Math.random());
  }, []);

  return (
    <>
      <div aria-live="polite">
        {error && (
          <Box mt={4}>
            <Typography
              id={`error-${randomGroupId}`}
              type="style-5"
              color="error"
            >
              {errorMessage}
            </Typography>
          </Box>
        )}
      </div>
      <Box mt={8}>
        <RadioGroup {...input}>
          {items.map(item => (
            <FormControlLabel
              key={item[valueProperty]}
              value={item[valueProperty]}
              control={
                <Radio
                  color="primary"
                  inputProps={{
                    'aria-describedby': `error-${randomGroupId}`,
                  }}
                />
              }
              label={
                <Typography type="style-6">{item[displayProperty]}</Typography>
              }
            />
          ))}
        </RadioGroup>
      </Box>
    </>
  );
};

renderRadioGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  displayProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
};

export default renderRadioGroup;
