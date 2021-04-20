import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const HealthCard = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M22 8H2C0.9 8 0 8.9 0 10V22C0 23.1 0.9 24 2 24H22C23.1 24 24 23.1 24 22V10C24 8.9 23.1 8 22 8ZM22.4 22C22.4 22.2173 22.2173 22.4 22 22.4H2C1.78267 22.4 1.6 22.2173 1.6 22V13.6H22.4V22ZM22.4 12H1.6V10C1.6 9.78267 1.78267 9.6 2 9.6H22C22.2173 9.6 22.4 9.78267 22.4 10V12ZM20 16H16V17.6H20V16ZM17.4 1.628C17.4467 1.60933 17.496 1.6 17.5453 1.6C17.6827 1.6 17.852 1.67733 17.9213 1.84933L19.76 6.4H21.4853L19.404 1.25067C19.0907 0.473333 18.3373 0 17.5453 0C17.2973 0 17.0453 0.0466667 16.8013 0.145333L1.31733 6.4H5.58933L17.4 1.628Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

HealthCard.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

HealthCard.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default HealthCard;
