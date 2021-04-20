import React from 'react';
import * as PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';
import { ICON_SIZE } from '../themes/theme';

const Tobacco = ({ width, height, color, ...rest }) => (
  <SvgIcon style={{ width, height }} {...rest} viewBox="0 0 18 18">
    <path
      d="M0 12.3529H13.5V15H0V12.3529ZM16.65 12.3529H18V15H16.65V12.3529ZM14.4 12.3529H15.75V15H14.4V12.3529ZM15.165 5.05588C15.723 4.51765 16.065 3.77647 16.065 2.95588C16.065 1.32353 14.715 0 13.05 0V1.32353C13.968 1.32353 14.715 2.05588 14.715 2.95588C14.715 3.85588 13.968 4.58824 13.05 4.58824V5.91176C15.066 5.91176 16.65 7.52647 16.65 9.50294V11.4706H18V9.49412C18 7.53529 16.848 5.84118 15.165 5.05588ZM12.627 7.23529H11.25C10.332 7.23529 9.585 6.37059 9.585 5.47059C9.585 4.57059 10.332 3.92647 11.25 3.92647V2.60294C9.585 2.60294 8.235 3.92647 8.235 5.55882C8.235 7.19118 9.585 8.51471 11.25 8.51471H12.627C13.572 8.51471 14.4 9.16765 14.4 10.3235V11.4706H15.75V10.0235C15.75 8.42647 14.31 7.23529 12.627 7.23529Z"
      fill={color}
    />
  </SvgIcon>
);

Tobacco.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

Tobacco.defaultProps = {
  color: '#E9A115',
  width: ICON_SIZE,
  height: ICON_SIZE,
};

export default Tobacco;
