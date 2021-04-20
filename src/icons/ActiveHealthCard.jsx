import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ActiveHealthCard = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M22.6667 8H1.33333C0.6 8 0 8.6 0 9.33333V12H24V9.33333C24 8.6 23.4 8 22.6667 8ZM0 22.6667C0 23.4 0.6 24 1.33333 24H22.6667C23.4 24 24 23.4 24 22.6667V14H0V22.6667ZM17.3333 16H21.3333V18H17.3333V16ZM19.404 1.25067C19.0907 0.473333 18.3373 0 17.5453 0C17.2973 0 17.0453 0.0466667 16.8013 0.145333L2.308 6H21.324L19.404 1.25067Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveHealthCard.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveHealthCard.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveHealthCard;
