import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import Typography from '../../uiComponents/Typography';

const CheckOutMethodRow = ({ icon, mt, label, amount }) => {
  return (
    <Box display="flex" justifyContent="space-between" mt={mt}>
      <Box display="flex">
        <Box display="flex" alignItems="center" pr={2}>
          {icon}
        </Box>
        <Typography type="style-5">{label}</Typography>
      </Box>
      <Typography type="style-5">{amount}</Typography>
    </Box>
  );
};

CheckOutMethodRow.propTypes = {
  icon: PropTypes.node.isRequired,
  mt: PropTypes.number,
  label: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

CheckOutMethodRow.defaultProps = {
  mt: 6,
};

export default CheckOutMethodRow;
