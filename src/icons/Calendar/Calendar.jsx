import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';
import * as PropTypes from 'prop-types';
import colors from '../../themes/colors';
import { ICON_SIZE } from '../../themes/theme';

const Calendar = ({ width, height, ...rest }) => {
  return (
    <SvgIcon style={{ width, height }} {...rest}>
      <path
        d="M20 1.33333V0H18.4V1.33333H5.6V0H4V1.33333H0V24H18.9333L24 18.9333V1.33333H20ZM18.9333 21.7373V18.9333H21.7373L18.9333 21.7373ZM22.4 17.3333H17.3333V22.4H1.6V8H22.4V17.3333ZM22.4 6.4H1.6V2.93333H4V4.66667H5.6V2.93333H18.4V4.66667H20V2.93333H22.4V6.4ZM11.7333 13.372V20H13.3333V10.628L9.33733 12.8893L10.1253 14.2827L11.7333 13.372Z"
        fill={colors.icon || colors.grey2}
      />
    </SvgIcon>
  );
};

Calendar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

Calendar.defaultProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Calendar;
