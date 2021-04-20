/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';

import { Box, FormControlLabel, Checkbox, FormGroup } from '@material-ui/core';

import Typography from '../uiComponents/Typography';
import Grid from '../uiComponents/Grid';
import GridItem from '../uiComponents/GridItem';

const renderCheckboxGroup = ({
  items,
  displayProperty,
  valueProperty,
  errorMessage,
  input: { value: values, onChange },
  meta: { touched, invalid },
}) => {
  const [randomGroupId, setRandomId] = useState(null);
  const error = touched && invalid;

  const handleChange = event => {
    const { value: selectedValue, checked } = event.target;
    let newValues;
    if (checked) {
      newValues = (values || []).concat(selectedValue);
    } else {
      newValues = values.filter(value => value !== selectedValue);
    }
    onChange(newValues, selectedValue);
  };

  useEffect(() => {
    setRandomId(Math.random());
  }, []);

  return (
    <FormGroup>
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
        <Grid>
          {items.map(item => (
            <GridItem columns={{ xs: 12, md: 6 }} key={item[valueProperty]}>
              <FormControlLabel
                value={item[valueProperty]}
                control={
                  <Checkbox
                    color="primary"
                    checked={values.includes(item[valueProperty])}
                    value={item[valueProperty]}
                    onChange={handleChange}
                    inputProps={{
                      'aria-describedby': `error-${randomGroupId}`,
                    }}
                  />
                }
                label={
                  <Typography type="style-6">
                    {item[displayProperty]}
                  </Typography>
                }
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </FormGroup>
  );
};

renderCheckboxGroup.propTypes = {
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

export default renderCheckboxGroup;
