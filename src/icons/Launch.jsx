import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';

import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const Launch = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M16.65 16.65H1.35V1.35H9V0H0V18H18V9H16.65V16.65ZM10.6425 8.3115L16.65 2.304V7.713L18 6.363V0H11.6359L10.287 1.34887H15.6971L9.6885 7.3575L10.6425 8.3115Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

Launch.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Launch.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Launch;
