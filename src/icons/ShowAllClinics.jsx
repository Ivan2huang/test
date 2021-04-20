import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import colors from '../themes/colors';
import { ICON_SIZE } from '../themes/theme';

const ShowAllClinics = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 8.04133V0H24V8.04133C24 15.6147 18.9307 22 12 24C5.07067 22 0 17.236 0 9.66267V8.04133ZM11.996 22.3293C18.1453 20.3453 22.4 14.536 22.4 8.04133V1.6H1.6V8.04133V9.66267C1.6 17.7733 7.91333 21.056 11.996 22.3293ZM12.6667 4.66699V9.33301H17.3334V10.6663H12.6667V15.3337H11.3334V10.6663H6.66675V9.33301H11.3334V4.66699H12.6667Z"
      fill={colors.icon || colors.black}
    />
  </SvgIcon>
);

ShowAllClinics.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ShowAllClinics.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ShowAllClinics;
