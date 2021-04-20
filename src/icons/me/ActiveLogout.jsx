import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ResetPassword = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6932 4.0498V5.93021C16.8281 6.69223 19.1623 9.52372 19.1623 12.8896C19.1623 16.8394 15.9495 20.0523 11.9997 20.0523C8.05059 20.0523 4.83779 16.8394 4.83779 12.8896C4.83779 9.52372 7.17137 6.69289 10.3063 5.93021V4.0498C6.15119 4.84432 3 8.50626 3 12.8896C3 17.8521 7.03789 21.89 11.9997 21.89C16.9622 21.89 21.0001 17.8521 21.0001 12.8896C21.0001 8.50626 17.8489 4.84432 13.6932 4.0498Z"
      fill={colors.activatedIcon || colors.primary}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0001 11.3705C12.5604 11.3705 13.0162 10.8037 13.0162 10.107L13.0161 3.26344C13.0161 2.5668 12.5603 2 12.0001 2C11.4398 2 10.984 2.5668 10.984 3.26344V10.107C10.984 10.8037 11.4398 11.3705 12.0001 11.3705Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ResetPassword.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ResetPassword.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ResetPassword;
