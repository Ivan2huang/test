import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ActiveClaims = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.4444 1L16.8889 3.44444V4.66667H7.11108V3.44444L9.55553 1H14.4444ZM18.7223 6.49989V3.44434H21.7778V22.9999H2.22229V3.44434H5.27785V6.49989H18.7223ZM5.88896 19.3332H7.72229V17.4999H5.88896V19.3332ZM5.88896 15.361H7.72229V13.5277H5.88896V15.361ZM5.88896 11.3888H7.72229V9.55545H5.88896V11.3888ZM9.55562 19.3332H18.1112V17.4999H9.55562V19.3332ZM9.55562 15.361H18.1112V13.5277H9.55562V15.361ZM9.55562 11.3888H18.1112V9.55545H9.55562V11.3888Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveClaims.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveClaims.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveClaims;
