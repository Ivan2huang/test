import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const CheckpointVisit = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.5333 22.52V16.8533L20 15.2133V24H0V2.54667H4.93333L7.49333 0H12.5867L15.0667 2.54667H20V8.26667L18.5333 9.77333V4.08H15.1333V6.4H4.94667V4.08H1.53333V12.6V22.52H18.5333ZM8.12 1.53333L6.53333 3.17333L6.46667 4.88H13.6V3.17333L12 1.53333H8.12ZM16.5332 14.0398L22.7332 7.83984L23.9999 9.11984L16.5332 16.5732L12.6399 12.6798L13.9066 11.4132L16.5332 14.0398ZM4.2666 13.7467V8.08008H9.9466V13.7467H4.2666ZM5.53327 12.4801H8.6666V9.33341H5.53327V12.4801ZM4.2666 15.0664V20.7331H9.9466V15.0664H4.2666ZM8.6666 19.4664H5.53327V16.3331H8.6666V19.4664Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

CheckpointVisit.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

CheckpointVisit.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default CheckpointVisit;
