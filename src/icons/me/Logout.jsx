import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ResetPassword = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <rect
      opacity="0.01"
      x="1"
      y="1.8584"
      width="16.1416"
      height="16.1416"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.0708 1.8584C4.61392 1.8584 1 5.47232 1 9.9292C1 14.3861 4.61392 18 9.0708 18C13.5277 18 17.1416 14.3861 17.1416 9.9292C17.1416 5.47232 13.5277 1.8584 9.0708 1.8584ZM9.07081 16.9239C5.21387 16.9239 2.07612 13.7861 2.07612 9.9292C2.07612 6.07226 5.21387 2.93451 9.07081 2.93451C12.9278 2.93451 16.0655 6.07226 16.0655 9.9292C16.0655 13.7861 12.9278 16.9239 9.07081 16.9239Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
    <path
      d="M8.56641 0H9.57526V7.06195H8.56641V0Z"
      fill={colors.icon || colors.mediumEmphasis}
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
