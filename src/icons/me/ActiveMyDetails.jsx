import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ActiveMyDetails = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M20 0H1.33333V5.33333H0V6.93333H1.33333V11.2H0V12.8H1.33333V17.0667H0V18.6667H1.33333V24H20C21.472 24 22.6667 22.8053 22.6667 21.3333V2.66667C22.6667 1.19467 21.472 0 20 0ZM12.0053 6.38133C13.4693 6.38133 14.0733 7.56667 14.0733 8.836C14.0733 10.0573 13.456 11.4187 12.0053 11.4187C10.5307 11.4187 9.92533 10.092 9.92533 8.836C9.92533 7.556 10.5427 6.38133 12.0053 6.38133ZM6.66667 17.3333L7.73867 14.6813C7.856 14.392 8.02133 14.1227 8.24 13.8973C8.76133 13.3613 9.412 12.956 10.1827 12.708L12.0067 14.532L13.828 12.7107C14.5933 12.9587 15.2427 13.3627 15.7613 13.8973C15.9787 14.1213 16.1453 14.3907 16.2627 14.6813L17.3333 17.3333H6.66667Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ActiveMyDetails.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ActiveMyDetails.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ActiveMyDetails;
