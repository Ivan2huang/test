import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ActiveMe = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M20.789 16.6972C20.547 16.0996 20.2048 15.5434 19.755 15.0814C18.6856 13.9802 17.3472 13.1467 15.7681 12.6346L12.0122 16.3904L8.25022 12.6272C6.66256 13.1393 5.31811 13.9753 4.24378 15.0814C3.794 15.5434 3.45178 16.0996 3.211 16.6972L1 22.1667H23L20.789 16.6972ZM12.0122 12.3889C15.0054 12.3889 16.2778 9.58022 16.2778 7.06122C16.2778 4.44567 15.0311 2 12.0122 2C8.99456 2 7.72222 4.42122 7.72222 7.06122C7.72222 9.65233 8.96889 12.3889 12.0122 12.3889Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveMe.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveMe.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveMe;
