import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const NonPanelDoc = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M0 0V8.04133V9.66267C0 17.236 5.07067 22 12 24C18.9307 22 24 15.6147 24 8.04133V0H0ZM22.4 8.04133C22.4 14.536 18.1453 20.3453 11.996 22.3293C7.91333 21.056 1.6 17.7733 1.6 9.66267V8.04133V1.6H22.4V8.04133Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

NonPanelDoc.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

NonPanelDoc.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default NonPanelDoc;
