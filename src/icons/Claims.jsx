import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Claims = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M10.7778 11.0222H16.889V9.55556H10.7778V11.0222ZM7.11118 11.0222H8.57785V9.55556H7.11118V11.0222ZM10.7778 14.6889H16.889V13.2222H10.7778V14.6889ZM7.11118 14.6889H8.57785V13.2222H7.11118V14.6889ZM10.7778 18.3556H16.889V16.8889H10.7778V18.3556ZM7.11118 18.3556H8.57785V16.8889H7.11118V18.3556ZM16.889 3.44444L14.4445 1H9.55562L7.11118 3.44444H2.22229V23H21.7778V3.44444H16.889ZM8.57785 4.05189L10.1631 2.46667H13.8371L15.4223 4.05189V5.64444H8.57785V4.05189ZM20.3112 21.5333H3.68896V4.91111H7.11118V7.11111H16.889V4.91111H20.3112V21.5333Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

Claims.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Claims.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Claims;
