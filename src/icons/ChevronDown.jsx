import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ChevronDown = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 4.1521L9 13.1498L0 4.1521V6.0601L9 15.0601L18 6.0601V4.1521Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="4"
      width="18"
      height="12"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 4.1521L9 13.1498L0 4.1521V6.0601L9 15.0601L18 6.0601V4.1521Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)" />
  </SvgIcon>
);

ChevronDown.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ChevronDown.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ChevronDown;
