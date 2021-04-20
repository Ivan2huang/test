import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Upload = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M15.8,12v3.8H2.2V12H1v5h16v-5H15.8z M8.4,13.849h1.2V3.297l4.4,4.4V6.001L9,1L4,6.001v1.697l4.4-4.4V13.849z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

Upload.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Upload.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Upload;
