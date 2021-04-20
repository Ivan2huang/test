import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';

import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const Pending = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z"
      fill="#FFBB33"
    />
    <path
      d="M9.00005 15.1998C9.66279 15.1998 10.2 14.6625 10.2 13.9998C10.2 13.3371 9.66279 12.7998 9.00005 12.7998C8.33731 12.7998 7.80005 13.3371 7.80005 13.9998C7.80005 14.6625 8.33731 15.1998 9.00005 15.1998Z"
      fill="black"
    />
    <path d="M9.9001 4.7998H8.1001V10.7998H9.9001V4.7998Z" fill={colors.icon} />
  </SvgIcon>
);

Pending.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Pending.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Pending;
