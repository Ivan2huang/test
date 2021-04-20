import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const MyDetails = ({ width, height, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest}>
    <path
      d="M20 0H1.33333V5.33333H0V6.93333H1.33333V11.2H0V12.8H1.33333V17.0667H0V18.6667H1.33333V24H20C21.472 24 22.6667 22.8067 22.6667 21.3333V2.66667C22.6667 1.19333 21.472 0 20 0ZM21.0667 21.3333C21.0667 21.9213 20.588 22.4 20 22.4H2.93333V18.6667H4V17.0667H2.93333V12.8H4V11.2H2.93333V6.93333H4V5.33333H2.93333V1.6H20C20.588 1.6 21.0667 2.07867 21.0667 2.66667V21.3333ZM15.76 13.8987C15.2413 13.364 14.5933 12.96 13.8267 12.712L12.0053 14.5333L10.1813 12.708C9.412 12.956 8.76 13.3613 8.23867 13.8973C8.02133 14.1213 7.85467 14.3907 7.73733 14.6813L6.66667 17.3333H17.3333L16.2613 14.6813C16.144 14.392 15.9787 14.1227 15.76 13.8987ZM12.0053 11.6853C13.4573 11.6853 14.0733 10.324 14.0733 9.10267C14.0733 7.83467 13.468 6.648 12.0053 6.648C10.5427 6.648 9.92533 7.82267 9.92533 9.10267C9.92533 10.3587 10.5307 11.6853 12.0053 11.6853Z"
      fill={colors.icon || colors.mediumEmphasis}
    />
  </SvgIcon>
);

MyDetails.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

MyDetails.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default MyDetails;
