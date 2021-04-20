import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import PropTypes from 'prop-types';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ChevronUp = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 15.0601L9 6.06235L18 15.0601V13.1521L9 4.1521L0 13.1521V15.0601Z"
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
        d="M0 15.0601L9 6.06235L18 15.0601V13.1521L9 4.1521L0 13.1521V15.0601Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)" />
  </SvgIcon>
);

ChevronUp.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ChevronUp.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ChevronUp;
