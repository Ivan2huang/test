import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ActiveMyBenefits = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M0 0V8.04133V9.66267C0 17.236 5.07067 22 12 24C18.9307 22 24 15.6147 24 8.04133V0H0ZM9.792 15.4773L5.37867 11.0667L6.79333 9.652L9.792 12.6493L17.208 5.23467L18.6227 6.64933L9.792 15.4773Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveMyBenefits.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveMyBenefits.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveMyBenefits;
