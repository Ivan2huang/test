import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const PanelDoc = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M0 0.666992V19.3337H24V0.666992H0ZM21.2693 2.26699L12 11.535L2.73067 2.26699H21.2693ZM1.6 17.7337V3.39766L12 13.7977L22.4 3.39766V17.7337H1.6Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

PanelDoc.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

PanelDoc.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default PanelDoc;
