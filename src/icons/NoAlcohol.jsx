import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const NoAlcohol = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 23 23">
    <rect
      y="21.2131"
      width="30"
      height="1.5"
      transform="rotate(-45 0 21.2131)"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.12132 20.2131H17V18.2131H12V13.3345L10 15.3345V18.2131H7.12132L5.12132 20.2131ZM10 13.2131V12.2131L2 4.21313V2.21313H20V3.21314L10 13.2131ZM4.5 4.21313L6.5 6.21313H15.5L17.5 4.21313H4.5Z"
      fill={color}
    />
  </SvgIcon>
);

NoAlcohol.defaultProps = {
  color: '#00847F',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

NoAlcohol.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default NoAlcohol;
