import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Add = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M21 13H13V21H11V13H3V11H11V3H13V11H21V13Z"
      fill={colors.icon || colors.grey2}
    />
  </SvgIcon>
);

Add.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Add.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Add;
