import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';

import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const File = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M24.4 9H10.1666V31H28.8333V13.6444L24.4 9ZM26.8535 13.6444H24.4V11.0741L26.8535 13.6444ZM27.4333 29.5333H11.5666V10.4667H23V15.1111H27.4333V29.5333Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

File.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

File.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default File;
