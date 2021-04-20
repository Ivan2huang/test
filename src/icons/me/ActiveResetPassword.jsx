import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const ResetPassword = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M2.93333 1.6H21.0667V3.73333H22.6667V0H1.33333V3.73333H2.93333V1.6ZM11.996 22.328C9.768 21.6253 6.80667 20.244 4.88533 17.6H2.98667C4.832 20.7347 8.07733 22.868 12 24C15.5427 22.9773 18.5333 20.6613 20.4387 17.6H18.496C16.9013 19.7707 14.6533 21.4573 11.996 22.328ZM22 5.33333H2C0.9 5.33333 0 6.23333 0 7.33333V14C0 15.1 0.9 16 2 16H22C23.1 16 24 15.1 24 14V7.33333C24 6.23333 23.1 5.33333 22 5.33333ZM22.4 14C22.4 14.2173 22.2173 14.4 22 14.4H2C1.78267 14.4 1.6 14.2173 1.6 14V7.33333C1.6 7.116 1.78267 6.93333 2 6.93333H22C22.2173 6.93333 22.4 7.116 22.4 7.33333V14ZM16 12H20V10.4H16V12ZM5.73333 8.93333C4.776 8.93333 4 9.70933 4 10.6667C4 11.624 4.776 12.4 5.73333 12.4C6.69067 12.4 7.46667 11.624 7.46667 10.6667C7.46667 9.70933 6.69067 8.93333 5.73333 8.93333ZM12 8.93333C11.0427 8.93333 10.2667 9.70933 10.2667 10.6667C10.2667 11.624 11.0427 12.4 12 12.4C12.9573 12.4 13.7333 11.624 13.7333 10.6667C13.7333 9.70933 12.9573 8.93333 12 8.93333Z"
      fill={colors.activatedIcon || colors.primary}
    />
  </SvgIcon>
);

ResetPassword.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

ResetPassword.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default ResetPassword;
